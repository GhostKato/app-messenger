import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from './Button';
import { FaCheck } from "react-icons/fa";
import messagesSchema from '@/validation/messagesSchema';
import { updateMessages } from '@/redux/messages/operations';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/modal/slice';

type MessageUpdateProps = {  
  messageId: string;
  message: string;
};

type MessageType = {
  message: string; 
};

const MessageUpdateForm: React.FC<MessageUpdateProps> = ({ messageId, message }) => {
  const dispatch = useDispatch<AppDispatch>();    

  const initialValues: MessageType = {
    message: message,  
  };

  const handleSendMessageClick = (values: MessageType, { resetForm }: { resetForm: () => void }) => {
    
    dispatch(updateMessages({ messageId, message: values.message }));    
    dispatch(toggleModal({ modalId: messageId, modalType: 'messageUpdate' }));
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
            className='resize-none overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-black break-words bg-black w-full h-[85px] xl:h-[92px] p-3 text-sm md:text-base xl:text-lg rounded-[20px] border-2 border: border-border hover:border-interaction shadow-custom-inset focus:border-interaction transition duration-300 ease-in-out'
            name="message"
            type="text"
            label="New message"
            as="textarea"            
          />                           

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="messageUpdateForm"
          >
            <FaCheck className='text-interaction group-hover:text-white w-[40px] h-[40px] xl:w-[60px]  xl:h-[60px]' />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default MessageUpdateForm;
