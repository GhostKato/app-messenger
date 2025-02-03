import React from 'react';
import { Formik, Form } from 'formik';
import FieldInput from './FieldInput';
import Button from './Button';
import registrationUserSchema from '../validation/registrationUserSchema';

const RegistrationForm: React.FC = () => {   

  return (               
        <Formik
          initialValues={{ email: '', username: '', password: '' }}
          validationSchema={registrationUserSchema}
          onSubmit={(values, { resetForm }) => {
            console.log('Форма надіслана:', values);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
              <Form className="flex justify-center items-center flex-col w-full gap-5">
              <FieldInput name="email" type="email" label="Email" />
              <FieldInput name="username" type="text" label="Name" />             
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
     );
};

export default RegistrationForm;
