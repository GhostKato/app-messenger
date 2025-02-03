import * as Yup from 'yup';

const addContactSchema = Yup.object({
  message: Yup.string()
    .required('This field is required!')
    .min(3, 'Message must be more than 3 characters!')
    .max(50, 'Message must be less than 50 characters!'),  
});

export default addContactSchema;