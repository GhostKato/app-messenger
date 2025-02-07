import * as Yup from 'yup';

const sendResetEmailSchema = Yup.object({
  
  email: Yup.string()    
      .required('This field is required!')
      .email('Invalid email address!')
      .min(11, 'Email: min 11 characters!')
      .max(35, 'Email: max 35 characters!'),      
});
  
export default sendResetEmailSchema