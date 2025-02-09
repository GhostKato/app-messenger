import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from './Button';
import { BsFillSendFill } from "react-icons/bs";
import messagesSchema from '@/validation/messagesSchema';
import { addMessages } from '@/redux/messages/operations';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';

type MessageType = {
  message: string;}

const MessageSendForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  
  const toId = Array.isArray(id) ? id[0] : id;

  const initialValues: MessageType = {
    message: '',      
  };

  const handleSendMessageClick = (values: MessageType, { resetForm }: { resetForm: () => void }) => {    
    if (!toId) {
      console.error("toId is required");
      return;
    }
    const messageData = {
      toId, 
      message: values.message
    };
    dispatch(addMessages(messageData));  
    resetForm();  
  };   

  return (          
    <Formik
      initialValues={initialValues}
      validationSchema={messagesSchema}
      onSubmit={handleSendMessageClick}  
    >
      {({ isSubmitting }) => (
        <Form className="flex justify-between items-center gap-2 p-2">
          <Field
            className='resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-black break-words bg-sending w-full h-[85px] xl:h-[92px] p-3 text-sm md:text-base xl:text-lg rounded-[20px] border-2 border: border-border hover:border-interaction shadow-custom-inset focus:border-interaction transition duration-300 ease-in-out'
            name="message"
            type="text"
            label="New message"
            as="textarea"
          />                           
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="messageSendForm"
          >
            <BsFillSendFill className='text-interaction group-hover:text-white w-[40px] h-[40px] xl:w-[60px]  xl:h-[60px]' />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MessageSendForm;
