import axios, { AxiosInstance } from "axios";
import Cookies from 'js-cookie';

type Token = string;

export const messagesApi: AxiosInstance = axios.create({
     // baseURL: "http://localhost:3000",
  baseURL: "https://server-messenger.onrender.com",
  withCredentials: true,
});

export const setToken = (token: Token): void => {  
   Cookies.set('accessToken', token, { expires: 7, secure: true, sameSite: 'Strict' });
  messagesApi.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
};

export const clearToken = (): void => { 
  Cookies.remove('accessToken');
  messagesApi.defaults.headers.common['Authorization'] = '';
};

export const getToken = (): Token | undefined => {
  return Cookies.get('accessToken') as Token | undefined; 
};
