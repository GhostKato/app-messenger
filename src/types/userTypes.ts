export type UserFormDataBody = {
  name: string;
  email: string;
  password?: string;
  photo?: File | null;
};


export type User = {
  name: string | null;
  email: string | null;
  photo: string | null;
  id: string | null;
};