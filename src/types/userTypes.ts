export type UserType = {
  name: string | null;
  email: string | null;
  photo: string | null;
  _id: string | null;
};

export type UserFormType = {
  name?: string; 
  email?: string;
  password?: string;
  photo?: File | string | null; 
}

export type UserFormDataType = {
  name?: string;
  email?: string;
  password?: string;
  photo?: File | null;
};

export type UpdateUserType = {
  id: string;
  body: UserFormDataType;
}


