import { useAuthContext } from './useAuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const useLogOut = () => {
  const { dispatch } = useAuthContext();
  const [loading, setLoading] = useState(null);

  const logout = () => {
    setLoading(true);
    // remove user from storage
    localStorage.removeItem('user');
    toast.success('User Successfully Logged Out');
    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    setLoading(false);
  };

  return { logout, loading };
};
