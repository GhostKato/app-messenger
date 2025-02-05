export type User = {
  name: string | null;
  email: string | null;
  photo: string | null;
  _id: string | null;
};

export type UserFormValues = {
  name?: string; 
  email?: string;
  password?: string;
  photo?: File | string | null; 
}

export type UserFormDataBody = {
  name: string;
  email: string;
  password?: string;
  photo?: File | null;
};

export type UpdateUserParams = {
  id: string;
  body: UserFormDataBody;
}


