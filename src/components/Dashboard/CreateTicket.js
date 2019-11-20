import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function CreateTicket({ values, errors, touched, status }) {
  const [newticket, setNewTicket] = useState([]);

  useEffect(() => {
    status && setNewTicket(newticket => [...newticket, status]);
  }, [status]);

  return (
    <div className="ticket-container">
      <Form>
        <Field type="text" name="name" placeholder="name" />
        {touched.name && errors.name && <p className="errors">{errors.name}</p>}
        <Field type="text" name="subject" placeholder="subject" />
        {touched.subject && errors.subject && (
          <p className="errors">{errors.subject}</p>
        )}
        <Field
          as="textarea"
          type="text"
          name="description"
          placeholder="description"
        />
        <button>Submit!</button>
      </Form>
    </div>
  );
}
const FormikCreateTicket = withFormik({
  mapPropsToValues({ name, subject, description }) {
    return {
      name: name || "",
      subject: subject || "",
      description: description || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    subject: Yup.string().required(),
    description: Yup.string().required()
  }),
  handleSubmit(values, { setStatus }) {
    axios
      .post("https://ddq.herokuapp.com/api/auth/createticket", values)
      .then(res => {
        setStatus(res.data);
        console.log(res);
      })
      .catch(err => console.log(err.response));
  }
})(CreateTicket);
export default FormikCreateTicket;