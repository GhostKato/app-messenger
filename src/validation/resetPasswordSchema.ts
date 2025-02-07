import * as Yup from 'yup';

const resetPasswordSchema = Yup.object({
  
    newPassword: Yup.string()
      .required('Password is required')
      .min(5, 'Password: min 5 characters!')
      .max(20, 'Password: max 20 characters!'),
});
  
export default resetPasswordSchema