'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refresh } from '@/redux/auth/operations';
import { AppDispatch } from '@/redux/store';

const Refresh: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(refresh());
  }, [dispatch]);

  return null;
};

export default Refresh;
