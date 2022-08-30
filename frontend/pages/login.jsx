import React, { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import Spinner from '../components/Spinner';
import { useLogin } from '../hooks/useLogin';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, loading, error } = useLogin();
  const { email, password } = formData;

  const router = useRouter();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const API_URL = 'http://localhost:5000/api/users/login';

  const submitLogin = async (e) => {
    e.preventDefault();
    login(formData);
    // if (error) {
    //   toast.error(error);
    // }

    // try {
    //   const response = await axios.post(API_URL, formData);
    //   if (response.data) {
    //     await localStorage.setItem('user', JSON.stringify(response.data));
    //     // setUser(response.data);
    //     toast.success('User Successfully Logged In');
    //   } else {
    //     console.log('Something went wrong.');
    //   }
    //   return response.data;
    // } catch (error) {
    //   if (
    //     error.response &&
    //     error.response.data &&
    //     error.response.data.message
    //   ) {
    //     toast.error(error.response.data.message);
    //   }
    // router.push('/');
    // }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <section className='flex flex-col items-center justify-between'>
        <div className='flex flex-row items-center mt-3'>
          <h1 className='text-2xl text-gray-800 font-bold'>
            <FaSignInAlt />
          </h1>
          <h3 className='text-2xl text-gray-800 font-bold'>&nbsp; Login</h3>
        </div>
        <p className='text-lg text-gray-700 font-bold mt-3'>
          Log in to your account
        </p>
      </section>
      <section className='container mx-auto'>
        <form
          className='bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-4'
          onSubmit={submitLogin}
        >
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

          <div>
            <button className='w-full text-center shadow-lg rounded-lg px-4 py-2 bg-gray-600 text-gray-100 hover:bg-gray-700 duration-300'>
              Login
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
