import React from 'react';

function Hero({ heading, message }) {
  return (
    // <div></div>
    <div className='flex items-center justify-center h-screen bg-fixed mb-12 bg-center bg-cover custom-img'>
      {/* Overlay */}
      <div className='absolute top-[110px] left-0 right-0 bottom-[-110px] bg-black/80 z-[2]' />
      <div className='p-5 text-white z-[2] lg:ml-[-10rem] mt-[-10rem]'>
        <h2 className='text-4xl mb-3 md:text-5xl font-bold'>{heading}</h2>
        <p className='py-5 text-xl mb-3'>{message}</p>
        <button className='px-8 py-2 border rounded-lg mb-3'>
          Find out more.
        </button>
      </div>
    </div>
  );
}

export default Hero;
