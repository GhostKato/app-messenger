import * as Yup from 'yup';

const messagesSchema = Yup.object({
  
  message: Yup.string()
    .required('This field is required!')
    .min(3, 'Message: min 3 characters!')
    .max(300, 'Message: max 300 characters!'),  
});

export default messagesSchema;