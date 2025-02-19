import axios, { AxiosInstance } from "axios";
import { BACKEND_DOMAIN } from '@/constants/сonstants';

type Token = string;

export const messagesApi: AxiosInstance = axios.create({
  baseURL: BACKEND_DOMAIN, 
});

export const setToken = (token: Token | undefined): void => {
  if (token) {
    messagesApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;    
    localStorage.setItem('accessToken', token);
  } else {
    messagesApi.defaults.headers.common['Authorization'] = '';
    localStorage.removeItem('accessToken');
  }
};


export const clearToken = (): void => {
  messagesApi.defaults.headers.common['Authorization'] = '';
  localStorage.removeItem('accessToken');
};


export const getToken = (): Token | null => {    
  return localStorage.getItem('accessToken');
};




