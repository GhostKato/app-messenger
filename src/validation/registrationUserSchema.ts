import * as Yup from 'yup';

const registrationUserSchema = Yup.object({

   email: Yup.string()
    .email('Invalid email format!')
    .required('This field is required!')
    .min(11, 'Email: min 11 characters!')
    .max(35, 'Email: max 35 characters!'),    
  
  name: Yup.string()
    .required('This field is required!')
    .min(3, 'Name: min 3 characters!')
    .max(20, 'Name: max 20 characters!'), 

  password: Yup.string()
    .required('This field is required!')
    .min(5, 'Password: min 5 characters!')
    .max(20, 'Password: max 20 characters!'), 
});

export default registrationUserSchema;