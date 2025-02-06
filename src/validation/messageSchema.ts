import * as Yup from 'yup';

const addMessageSchema = Yup.object({
  message: Yup.string()
    .required('This field is required!')
    .min(3, 'Message must be more than 3 characters!')
    .max(300, 'Message must be less than 300 characters!'),  
});

export default addMessageSchema;