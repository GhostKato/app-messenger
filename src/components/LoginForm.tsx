import React from 'react';
import { Formik, Form } from 'formik';
import FieldInput from './FieldInput';
import Button from './Button';
import loginUserSchema from '../validation/loginUserSchema';

const LoginForm: React.FC = () => {   

  return (
    <div className="">
      <div className="">        
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginUserSchema}
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
