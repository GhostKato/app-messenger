import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FieldInput from './FieldInput';
import Button from './Button';

const LoginForm: React.FC = () => {
  
  const validationSchema = Yup.object({   
    email: Yup.string()
      .email('Incorrect e-mail format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password required'),
  });

  return (
    <div className="">
      <div className="">        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log('Форма надіслана:', values);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
              <Form className="flex justify-center items-center flex-col w-full gap-5">
              <FieldInput name="email" type="email" label="Email" />                           
              <FieldInput name="password" type="password" label="Password" />
              <Button
                type="submit"
                disabled={isSubmitting}                
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
