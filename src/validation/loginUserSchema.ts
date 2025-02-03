import * as Yup from 'yup';

const loginUserSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .min(11, 'Email must be more than 11 characters!')
    .max(35, 'Email must be less than 30 characters')
    .required('This field is required!'),

  password: Yup.string()
    .required('This field is required!')
    .min(5, 'Password must be more than 3 characters!')
    .max(20, 'Password must be less than 20 characters!'),
});

export default loginUserSchema;