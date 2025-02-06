import { UserFormDataType } from "@/types/userTypes";

export const createUserFormData = (body: UserFormDataType): FormData => {
  const formData = new FormData();  
  
  formData.append('name', body.name);
  formData.append('email', body.email);   

  if (body.password) {
    formData.append('password', body.password);
  }
       
  if (body.photo) {
    formData.append('photo', body.photo);
  }
  
  return formData;
};