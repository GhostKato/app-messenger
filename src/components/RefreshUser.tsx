'use client';

import { refresh } from '@/redux/auth/operations';
import { AppDispatch } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const refresh = () => { 
    
const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);
    
  return null; 
};

export default refresh;
