import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const router = useRouter();

  const { dispatch } = useAuthContext();

  const API_URL = '/api/users/login';

  const login = async (formData) => {
    setLoading(true);
    setError(null);
    const response = await axios.post(API_URL, formData);
    localStorage.setItem('user', JSON.stringify(response.data));
    toast.success('User Successfully Logged In');

    if (!response.ok) {
      setError(response.message);
      toast.error(error);
    }
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    // Update the auth context
    dispatch({ type: 'LOGIN', payload: response.data });
    setLoading(false);
    router.push('/');
  };
  return { login, loading, error };
};
