import React, { useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const customId = 'custom-toast-id';

function Admin() {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (!user?.isAdmin) {
      toast.error('You are not authorized to view the Admin page.', {
        toastId: customId,
      });
      router.push('/');
    }
  }, []);

  return (
    <div>
      <h1 className='text-2xl text-bold'>Admin</h1>
    </div>
  );
}

export default Admin;
