import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import FieldInput from './FieldInput';
import Button from './Button';
import loginUserSchema from '../validation/loginUserSchema';
import { useDispatch} from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useRouter } from 'next/navigation';
import { logIn } from '../redux/auth/operations';
import { UserFormType } from "@/types/userTypes";


const LoginForm: React.FC = () => {  
  
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();  

  const initialValues: UserFormType = {   
    email: '',
    password: '',
  };

  const handleSubmit = async (
      values: UserFormType,
      actions: FormikHelpers<UserFormType>
    ) => {
      try {
        await dispatch(logIn(values));
        actions.resetForm();
         router.push('/');
      } catch (error) {
        console.error(error);
      }
    };     

  return (               
        <Formik
          initialValues={initialValues}
          validationSchema={loginUserSchema}
         onSubmit={handleSubmit}
        >
          {({ isSubmitting, dirty}) => (
              <Form className="flex justify-center items-center flex-col w-full gap-5">
              <FieldInput name="email" type="email" label="Email" />                           
              <FieldInput name="password" type="password" label="Password" />
              <Button
                type="submit"
                disabled={isSubmitting || !dirty}                
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </Button>
            </Form>
          )}
        </Formik>     
  );
};

export default LoginForm;
