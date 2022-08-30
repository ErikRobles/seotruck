import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { HiDocument } from 'react-icons/hi';
import {
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaLock,
} from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Spinner from './Spinner';
import { useLogOut } from '../hooks/useLogOut';
import { useAuthContext } from '../hooks/useAuthContext';
import Image from 'next/image';
import Logo from '../assets/AQP.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { logout, loading } = useLogOut();
  const { user } = useAuthContext();

  const onLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    // <nav className='bg-gray-800 w-[100%] h-[110px] fixed top-0 left-0 text-white shadow-lg shadow-black/30 text-xl p-3'>
    <nav className='z-10 bg-gradient-to-br from-[#00388d] via-[#592057] to-[#d2000a] w-[100%] h-[110px] fixed top-0 left-0 text-white shadow-lg shadow-black/30 text-xl p-3'>
      <div className='flex flex-row gap-x-4 items-center justify-between h-full pt-2'>
        <Link href='/'>
          <a>
            <Image src={Logo} width='150px' height='100px' alt='logo' />
          </a>
        </Link>
        <ul className='hidden md:flex'>
          <li className='mr-4'>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          {user ? (
            <>
              <li className='mr-4'>
                <button onClick={onLogout}>
                  <span>Logout</span>
                </button>
              </li>
              {user?.isAdmin && (
                <li className='mr-4'>
                  <Link href='/admin'>
                    <a>Admin</a>
                  </Link>
                </li>
              )}

              <li className='mr-4'>
                <Link href='/register'>
                  <a>Register</a>
                </Link>
              </li>
              <li className='mr-4'>
                <Link href='/cvpageview'>
                  <a>CVs</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className='mr-4'>
                <Link href='/login'>
                  <a>Login</a>
                </Link>
              </li>
            </>
          )}
        </ul>
        {isOpen ? (
          <AiOutlineCloseCircle
            onClick={() => setIsOpen(!isOpen)}
            className='cursor-pointer w-8 hover:opacity-80 text-white ml-auto md:hidden text-3xl'
          />
        ) : (
          <GiHamburgerMenu
            className='cursor-pointer w-8 hover:opacity-80 transition-all ml-auto md:hidden text-2xl'
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
      <ul
        className={`flex flex-col absolute w-[40%] h-[100vh] bg-[#04388ce8] top-[110px] space-y-5 p-4 znav ${
          isOpen ? 'left-0' : 'left-[-101%]'
        } transition-all duration-500 ease-in-out`}
      >
        <li
          className='cursor-pointer hover:bg-white hover:text-gray-900 w-[100%] ml-auto p-2 rounded-lg transition-all'
          onClick={() => setIsOpen(!isOpen)}
        >
          <Link href='/'>
            <a>
              <FaHome className='inline' /> Home
            </a>
          </Link>
        </li>
        {user?.isAdmin && (
          <>
            <li
              className='cursor-pointer hover:bg-white hover:text-gray-900 w-[100%] ml-auto p-2 rounded-lg transition-all'
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link href='/register'>
                <a>
                  <FaUser className='inline' /> Register
                </a>
              </Link>
            </li>

            <li
              className='cursor-pointer hover:bg-white hover:text-gray-900 w-[100%] ml-auto p-2 rounded-lg transition-all'
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link href='/admin'>
                <a>
                  <FaLock className='inline' /> Admin
                </a>
              </Link>
            </li>
            <li
              className='cursor-pointer hover:bg-white hover:text-gray-900 w-[100%] ml-auto p-2 rounded-lg transition-all'
              onClick={() => setIsOpen(!isOpen)}
            >
              <Link href='/cvpageview'>
                <a>
                  <HiDocument className='inline' /> CVs
                </a>
              </Link>
            </li>
          </>
        )}
        {user ? (
          <li
            className='cursor-pointer hover:bg-white hover:text-gray-900 w-[100%] ml-auto p-2 rounded-lg transition-all'
            onClick={() => setIsOpen(!isOpen)}
          >
            <button onClick={onLogout}>
              <span>
                <FaSignOutAlt className='inline' /> Logout
              </span>
            </button>
          </li>
        ) : (
          <li
            className='cursor-pointer hover:bg-white hover:text-gray-900 w-[100%] ml-auto p-2 rounded-lg transition-all'
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link href='/login'>
              <a>
                <FaSignInAlt className='inline' /> Login
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
