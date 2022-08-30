import React, { useState } from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Navbar from './Navbar';

import Link from 'next/link';

export default function Header() {
  return (
    <header className='mb-[110px]'>
      <Navbar />
    </header>
  );
}
