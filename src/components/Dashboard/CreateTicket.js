import React, {useState} from 'react'
import styled from 'styled-components';
import {axiosWithAuth} from '../../utils/axiosWithAuth';

const Form = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;

    .input {
        max-width: 300px;
    }
`
//custom hook
const useInput = initialState => {
    const [value, setValue] = useState(initialState);

    const handleChange = updatedValue => {
        setValue(updatedValue);
    }

    return [value, setValue, handleChange];
}

export default function CreateTicket() {
    const [images, setImages] = useInput([]);
    const [category, setCategory, handleCategory] = useInput('');
    const [title, setTitle, handleTitle] = useInput('');
    const [description, setDescription, handleDescription] = useInput('');

    const handleSubmit = async e => {
        e.preventDefault();
        const imagesData = new FormData();
        const ticketDetails = {category, title, description};

        if(images.length){
            for(let i = 1; i <= images.length; i++) {
                imagesData.append('image' + i, images[i-1]);
            }
        }
        
        const ticket = await axiosWithAuth().post('https://ddq.herokuapp.com/api/tickets', ticketDetails);
        // console.log(ticket);
        const imagess  = await axiosWithAuth().post(`http://ddq.herokuapp.com/api/tickets/${ticket.data.id}/pictures`, imagesData, {open: true});

    }

    return (
        <div>
            <h1>This is CreateTicket.js</h1>
            <Form onSubmit={handleSubmit}>
                <input className='input' placeholder='Category' onChange={e => handleCategory(e.target.value)} type='text' required/>
                <input className='input' placeholder='Title' onChange={e => handleTitle(e.target.value)} type='text' required/>
                <textarea className='input' placeholder='Description' onChange={e => handleDescription(e.target.value)} required/>
                <label>Images: <input className='input' type='file' onChange={e => setImages(e.target.files)} multiple/></label>
                <button className='input' type='submit'>Submit</button>
            </Form>
        </div>
    )
}
















































                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
                          //||||||||||||||
            //v v v v v v v George was here v v v v v v v v v v
       // v v v v v v v v v v v v v v v v v v v v v v v v v v v v v v 
            // v v v v v v vGeorge was here v v v v v v v v v v
                   //   v v v v v v v v v v v v v v v v 
                       //  v George was here v v v v
                             //v v v v v v 
                                // v v 


// Formik does not currently support file input :(  :hotdog: :dog2:

// function CreateTicket({ values, errors, touched, status }) {
//   const [newticket, setNewTicket] = useState([]);
//   // const [images, setImages] = useState([]);

//   useEffect(() => {
//     status && setNewTicket(newticket => [...newticket, status]);
//   }, [status]);

//   return (
//     <div className="ticket-container">
//       <Form>
//         <Field type="text" name="category" placeholder="name" />
//         {touched.name && errors.name && <p className="errors">{errors.name}</p>}
//         <Field type="text" name="title" placeholder="subject" />
//         {touched.subject && errors.subject && (
//           <p className="errors">{errors.subject}</p>
//         )}
//         <Field
//           as="textarea"
//           type="text"
//           name="description"
//           placeholder="description"
//         />
//         <label>Images: <Field type='file' name='images' multiple /></label>
//         <button type='submit'>Submit!</button>
//       </Form>
//     </div>
//   );
// }
// const FormikCreateTicket = withFormik({
//   mapPropsToValues({ category, title, description, images }) {
//     return {
//       name: category || "",
//       subject: title || "",
//       description: description || "",
//       images: images || new Array()
//     };
//   },
//   validationSchema: Yup.object().shape({
//     name: Yup.string().required(),
//     subject: Yup.string().required(),
//      subject: Yup.string().required()
//   }),
//   handleSubmit(values, { setStatus }) {
//     const {category, title, description, images} = values;
//     const ImageData = new FormData();
    
//     if(images.length){
//       for(let i = 1; i <= images.length; i++){
//         ImageData.append('image' + i, images[i-1]);
//       }
//     }
//     console.log(category, title, description, images)
    
//     // axiosWithAuth().post(`http://ddq.herokuapp.com/api/tickets/${id}/pictures`)


//     // values is our object with all our data on it
//     // axios
//     //   .post("https://reqres.in/api/users/", values)
//     //   .then(res => {
//     //     setStatus(res.data);
//     //     // console.log(res);
//     //   })
//     //   .catch(err => console.log(err.response));
//   }
// })(CreateTicket);
// export default FormikCreateTicket;
// // console.log("This is the HOC", FormikCreateTicket);
