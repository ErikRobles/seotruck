import React from 'react';
import CVForm from './CVForm';

function Promo({ promoheading, promomessage }) {
  return (
    <div className='w-full h-screen mb-[30px] bg-white pb-[60px] pt-[5px] px-2 flex flex-col justify-evenly'>
      <div className='mt-4 md:text-center'>
        <h1 className='text-2xl font-bold text-gray-600 uppercase'>
          {promoheading}
        </h1>
        <h2 className='text-gray-600 text-lg'>{promomessage}</h2>
      </div>
      <div className='mx-auto max-w-[1240px] w-[90%] relative cancun-img bg-center bg-cover h-[700px]'>
        <div className='absolute  max-w-[300px] max-h-[400px] right-[-20px] bottom-[-75px] lg:right-[-40px] xl:right-[-75px] bg-gray-200 p-6 rounded-lg  mb-4'>
          <div className='flex flex-col justify-evenly space-y-4'>
            <h3 className='text-2xl'>Card Header</h3>
            <h2 clasName='text-xl'>Card SubHeading</h2>
            <p className='text-base'>
              Card Text Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Deleniti quam quia incidunt pariatur? Atque saepe numquam
              accusantium unde harum. Iste, qui fugiat!
            </p>
            <button className='px-8 py-2 border rounded-lg bg-[#00388d] text-white mb-3 mt-3 hover:bg-[#cb010d]  shadow-md'>
              Find out more.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Promo;
