'use client';
import React, { useState } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import FieldInput from './FieldInput';
import Button from './Button';
import FileInput from './FileInput';
import Image from 'next/image';
import updateUserSchema from '../validation/updateUserSchema';
import { UserFormType, UpdateUserType } from "@/types/userTypes";
import { updateUser } from '@/redux/auth/operations';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { selectUser } from '@/redux/auth/selectors';
import { BASE_PHOTO_URL } from '../constants/сonstants';
import { toggleModal } from '@/redux/modal/slice';

const UserUpdateForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);
  
  const defaultPreview = user?.photo || BASE_PHOTO_URL;
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(defaultPreview);
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const initialValues: UserFormType = {
    name: user.name || '',
    email: user.email || '',
    password: '', 
    photo: null, 
  };

  const handleSubmit = async (
    values: UserFormType,
    actions: FormikHelpers<UserFormType>
  ) => {
    try {
      const newUser = {
        name: values.name,
        password: values.password,
        email: values.email,
        photo: values.photo,
      };
      
      await dispatch(updateUser({ id: user._id, body: newUser } as UpdateUserType));
      dispatch(toggleModal({ contactId: null, modalType: 'userUpdate' }));
      actions.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={updateUserSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form className="flex justify-center items-center flex-col w-full gap-5">
          <FileInput
            setFieldValue={setFieldValue}
            setPreview={setPreview}
            name="photo" 
          />
          
          {preview && (
            <div>
              <Image
                alt="Preview image"
                src={typeof preview === 'string' ? preview : BASE_PHOTO_URL}  
                className="w-[240px] h-[240px] md:w-[320px] md:h-[320px] object-cover rounded-[20px]"
                width={320}
                height={320}
              />
            </div>
          )}
          
          <FieldInput name="email" type="email" label="Email" />
          <FieldInput name="name" type="text" label="Name" />
          <FieldInput name="password" type="password" label="Password" />
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UserUpdateForm;
