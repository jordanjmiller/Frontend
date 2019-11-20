import React, {useState} from 'react'
import styled from 'styled-components';
import {axiosWithAuth} from '../../utils/axiosWithAuth';

const Div = styled.div `
width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Form = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;

    .input {
        max-width: 300px;
    }
`
const Video = styled.iframe `
  min-width: 500px;
  min-height: 300px;
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
    const [video, setVideo] = useInput(null);
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
        
        try{
        const ticket = await axiosWithAuth().post('https://ddq.herokuapp.com/api/tickets', ticketDetails);
    
        if(images){
          const urls  = await axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/${ticket.data.id}/pictures/open`, imagesData);
          console.log(urls);
        }

        if(video){
          const videoData = new FormData();
          videoData.append('video', video);
          const url  = await axiosWithAuth().post(`https://ddq.herokuapp.com/api/tickets/${ticket.data.id}/video/open`, videoData);
          console.log(url);  
        }
  
        }catch(err){
          console.log(err);
        }
    }

    return (
        <Div>
            <h1>This is CreateTicket.js</h1>
            <Form onSubmit={handleSubmit}>
                <input className='input' placeholder='Category' onChange={e => handleCategory(e.target.value)} type='text' required/>
                <input className='input' placeholder='Title' onChange={e => handleTitle(e.target.value)} type='text' required/>
                <textarea className='input' placeholder='Description' onChange={e => handleDescription(e.target.value)} required/>
                <label>Images: <input className='input' type='file' onChange={e => setImages(e.target.files)} multiple/></label>
                <label>Video: <input className='input' type='file' onChange={e => setVideo(e.target.files[0])}/></label>
                <button className='input' type='submit'>Submit</button>
            </Form>
            <Video src="https://res.cloudinary.com/duoz4fpzs/video/upload/v1574258901/afs1lzqi3sejtbo8p5ka.mp4"></Video>
        </Div>
    )
}
// const FormikCreateTicket = withFormik({
//   mapPropsToValues({ name, subject, description }) {
//     return {
//       name: name || "",
//       subject: subject || "",
//       description: description || ""
//     };
//   },
//   validationSchema: Yup.object().shape({
//     name: Yup.string().required(),
//     subject: Yup.string().required(),
//     description: Yup.string().required()
//   }),
//   handleSubmit(values, { setStatus }) {
//     axios
//       .post("https://ddq.herokuapp.com/api/auth/createticket", values)
//       .then(res => {
//         setStatus(res.data);
//         console.log(res);
//       })
//       .catch(err => console.log(err.response));
//   }
// })(CreateTicket);
// export default FormikCreateTicket;


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
