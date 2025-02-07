import * as Yup from 'yup';

const loginUserSchema = Yup.object({
  
  email: Yup.string()
    .required('This field is required!')
    .email('Invalid email format!')
    .min(11, 'Email: min 11 characters!')
    .max(35, 'Email: max 35 characters!'),    

  password: Yup.string()
    .required('This field is required!')
    .min(5, 'Password: min 5 characters!')
    .max(20, 'Password: max 20 characters!'),
});

export default loginUserSchema;