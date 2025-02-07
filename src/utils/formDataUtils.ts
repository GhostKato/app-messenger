import { UserFormDataType } from "@/types/userTypes";

export function createFormData(body: UserFormDataType): FormData {
  const formData = new FormData();

  if (body.name) {
    formData.append('name', body.name);
  }

  if (body.email) {
    formData.append('email', body.email);
  }

  if (body.password) {
    formData.append('password', body.password);
  }

  if (body.photo) {
    formData.append('photo', body.photo);
  }

  return formData;
}




