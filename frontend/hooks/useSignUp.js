import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const router = useRouter();

  const { dispatch } = useAuthContext();

  const API_URL = '/api/users';

  const signup = async (formData) => {
    setLoading(true);
    setError(null);
    const response = await axios.post(API_URL, formData);
    console.log(response);
    toast.success('User Successfully Registered');

    if (!response.data) {
      setError(response.message);
      toast.error(response.message);
      setLoading(false);
      return;
    }
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    // Update the auth context
    dispatch({ type: 'LOGIN', payload: response.data });
    setLoading(false);
    router.push('/');
  };
  return { signup, loading, error };
};
