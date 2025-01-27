import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FieldInput from './FieldInput';
import Button from './Button';

const MessageForm: React.FC = () => {
  
  const validationSchema = Yup.object({   
    message: Yup.string()
          .min(3, 'Must be at least 3 characters')
          .required("Username required"),
  });

  return (          
        <Formik
          initialValues={{ message: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log('Форма надіслана:', values);
            resetForm();
          }}
        >
          {({ isSubmitting }) => (
              <Form className="flex justify-center items-center w-full space-x-2">
              <FieldInput className='bg-sending' name="message" type="text" label="New message" as="textarea"/>                          
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

export default MessageForm;
