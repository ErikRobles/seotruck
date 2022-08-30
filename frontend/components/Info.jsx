import React from 'react';
import Image from 'next/image';
import Truck1 from '../assets/truck1.jpg';

function Info({ infoheading, infomessage }) {
  return (
    <div className='flex flex-col items-center mx-auto p-6 mb-[30px] mt-[-175px] relative z-[2]'>
      <div className='flex flex-col items-center bg-white rounded-lg  shadow-md md:flex-row md:max-w-[900px]'>
        <Image
          className='object-cover w-full h-96 rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
          src={Truck1}
          alt=''
          width={1500}
          height={1500}
        />
        <div className='flex flex-col justify-between p-4 leading-normal'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>
            {infoheading}
          </h5>
          <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
            {infomessage}
          </p>
          <button className='px-8 py-2 border rounded-lg mb-3 mt-3 hover:bg-gray-600 hover:text-white shadow-md'>
            Find out more.
          </button>
        </div>
      </div>
    </div>
  );
}

export default Info;
