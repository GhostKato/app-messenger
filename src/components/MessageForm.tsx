import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from './Button';
import { BsFillSendFill } from "react-icons/bs";

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
              <Form className="flex justify-between items-center gap-2 p-2">
              <Field className='resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-black break-words bg-sending w-full h-[85px] xl:h-[92px] p-3 text-sm md:text-base xl:text-lg rounded-[20px] border-2 border: border-border hover:border-interaction shadow-custom-inset focus:border-interaction transition duration-300 ease-in-out' name="message" type="text" label="New message" as="textarea"/>                          
              <Button
                type="submit"
               disabled={isSubmitting}
               variant="sendMessage"
              >
                <BsFillSendFill className='text-interaction group-hover:text-white w-[40px] h-[40px] xl:w-[60px]  xl:h-[60px]'/>
              </Button>
            </Form>
          )}
        </Formik>
     
  );
};

export default MessageForm;
