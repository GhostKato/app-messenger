import React from 'react';
import { Formik, Form, Field } from 'formik';
import Button from './Button';
import { FaCheck } from "react-icons/fa";
import messagesSchema from '@/validation/messagesSchema';
import { deleteMessages, updateMessages } from '@/redux/messages/operations';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/modal/slice';
import { MdDelete } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";

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
  
  const handleCloseUpdateClick = () => {    
    dispatch(toggleModal({ modalId: messageId, modalType: 'messageUpdate' })); 
  };

  const handleDeleteClick = () => {    
    dispatch(deleteMessages({ id: messageId }));
    dispatch(toggleModal({ modalId: messageId, modalType: 'messageUpdate' }));
  };

  return (          
    <Formik
      initialValues={initialValues}
      validationSchema={messagesSchema}
      onSubmit={handleSendMessageClick}  
    >
      {({ isSubmitting }) => (
        <div className='relative'>
          <div className='absolute top-[-40px] left-[10px] md:top-[-47px] xl:top-[-55px] flex justify-center items-center gap-2'>
            <Button variant="menuMessage" onClick={handleCloseUpdateClick}><IoCloseOutline className='text-interaction group-hover:text-white w-[20px] h-[20px] md:w-[30px]  md:h-[30px]  xl:w-[40px]  xl:h-[40px]'/></Button>
            <Button variant="menuMessage" onClick={handleDeleteClick}><MdDelete className='text-interaction group-hover:text-white w-[20px] h-[20px] md:w-[30px]  md:h-[30px]  xl:w-[40px]  xl:h-[40px]'/></Button>
          </div>
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
        </div>
      )}
    </Formik>
  );
};

export default MessageUpdateForm;
