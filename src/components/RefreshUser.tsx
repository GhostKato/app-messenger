'use client';

import { refreshUser } from '@/redux/auth/operations';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const RefreshUser = () => { 
    
const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);
    
  return null; 
};

export default RefreshUser;
