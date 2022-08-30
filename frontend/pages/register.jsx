import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Spinner from '../components/Spinner';
import { useSignUp } from '../hooks/useSignUp';
import { useAuthContext } from '../hooks/useAuthContext';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { user } = useAuthContext();

  const { name, email, password, password2 } = formData;

  const { signup, error, loading } = useSignUp();

  const router = useRouter();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const customId = 'custom-toast-id';

  useEffect(() => {
    if (!user || user.isAdmin === false) {
      toast.error('You are not authorized to access this page', {
        toastId: customId,
      });
      router.push('/');
    }
  }, []);

  const API_URL = 'http://localhost:5000/api/users';

  const submitRegistration = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      await signup(formData);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {!user || user.isAdmin === false ? (
        <h1>Unauthorized</h1>
      ) : (
        <>
          <section className='flex flex-col items-center justify-between'>
            <div className='flex flex-row items-center mt-3'>
              <h1 className='text-2xl text-gray-800 font-bold'>
                <FaUser />
              </h1>
              <h3 className='text-2xl text-gray-800 font-bold'>
                &nbsp; Register
              </h3>
            </div>
            <p className='text-lg text-gray-700 font-bold mt-3'>
              Register User
            </p>
          </section>
          <section className='container mx-auto'>
            <form
              className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-4'
              onSubmit={submitRegistration}
            >
              <div>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='name'
                >
                  Username
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline'
                  id='name'
                  type='text'
                  placeholder='Username'
                  onChange={onChange}
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  placeholder='Email'
                  onChange={onChange}
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='password'
                  className='block text-gray-700 text-sm font-bold mb-2'
                >
                  Password
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  placeholder='******************'
                  onChange={onChange}
                  required
                />
              </div>
              <div className='mb-4'>
                <label
                  className='block text-gray-700 text-sm font-bold mb-2'
                  htmlFor='password2'
                >
                  Confirm Password
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline'
                  id='password2'
                  type='password'
                  placeholder='******************'
                  onChange={onChange}
                  required
                />
              </div>
              <div>
                <button className='w-full text-center shadow-lg rounded-lg px-4 py-2 bg-gray-600 text-gray-100 hover:bg-gray-700 duration-300'>
                  Register User
                </button>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
}

export default Register;
