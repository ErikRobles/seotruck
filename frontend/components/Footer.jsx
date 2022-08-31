import React from 'react';

// create data object full year
const date = new Date();

function Footer() {
  // create full year date object
  const year = date.getFullYear();
  return (
    <footer className='p-8 mt-4 text-center  bg-white bg-gradient-to-br from-[#00388d] via-[#592057] to-[#d2000a] shadow  md:p-6'>
      <span className='text-sm text-white sm:text-center'>
        © {year}{' '}
        <a href='https://aqp.com/' className='hover:underline'>
          AQP Trucking™
        </a>
        &nbsp; All Rights Reserved.
      </span>
    </footer>
  );
}

export default Footer;
