import React, { useState, useEffect, useRef } from 'react';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCVContext } from '../hooks/useCVContext';

function CvPageView() {
  const [loading, setLoading] = useState(false);
  const { cvs, dispatch } = useCVContext();

  const cvShouldRun = useRef(true);

  const API_URL = '/api/cvs';

  useEffect(() => {
    if (cvShouldRun.current) {
      cvShouldRun.current = false;
      const getAllCVs = async () => {
        setLoading(true);
        const response = await axios.get(API_URL);

        dispatch({ type: 'GET_CVS', payload: response.data });
        setLoading(false);

        if (!response.data) {
          toast.error(response.message);

          return;
        }
      };
      getAllCVs();
    }
  }, []);

  const handleDelete = async (id) => {
    // ajax request to delete mongodb record
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log(response.data);
      if (response.data.success) {
        dispatch({ type: 'DELETE_CV', payload: id });
        toast.success('CV deleted successfully');
      } else {
        toast.error('Something Went Afoul');
      }
      return response.data;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {cvs ? (
        <div className=' p-3 absolute -z-10 w-full'>
          <div className='flex flex-row justify-center items-center w-full mx-auto'>
            <h1 className='text-2xl text-gray-500 font-bold mb-4'>
              Resume List View
            </h1>
          </div>
          <div className='overflow-x-auto relative'>
            <table className='text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='py-3 px-6'>
                    Name
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Email
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Phone
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    CV
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Address
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    City
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    State
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Zip / Postal Code
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    D.O.B.
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    US Eligible
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Applicant Comments
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cvs.map((cv) => (
                  <tr
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                    key={cv._id}
                  >
                    <td className='py-4 px-6'>
                      {cv.firstName} {cv.lastName}
                    </td>
                    <td className='py-4 px-6'>{cv.email}</td>
                    <td className='py-4 px-6'>{cv.phone}</td>
                    <td className='py-4 px-6'>
                      {cv.fileUrl ? (
                        <a
                          className='text-gray-400 underline hover:text-white hover:font-bold transition-all duration-300'
                          href={`${cv.fileUrl}`}
                          target='_blank'
                          rel='noreferrer'
                        >
                          CV Link
                        </a>
                      ) : (
                        'No CV Uploaded'
                      )}
                    </td>
                    <td className='py-4 px-6'>
                      {cv.address ? cv.address : 'None Listed'}
                    </td>
                    <td className='py-4 px-6'>
                      {cv.city ? cv.city : 'None Listed'}
                    </td>
                    <td className='py-4 px-6'>
                      {cv.state ? cv.state : 'None Listed'}
                    </td>
                    <td className='py-4 px-6'>
                      {cv.zip ? cv.zip : 'None Listed'}
                    </td>
                    <td className='py-4 px-6'>
                      {cv.dob ? cv.dob : 'None Listed'}
                    </td>
                    <td className='py-4 px-6'>
                      {cv.usEligible ? cv.usEligible : 'None Listed'}
                    </td>
                    <td className='py-4 px-6'>
                      {cv.description ? cv.description : 'None Listed'}
                    </td>
                    <td className='py-4 px-6'>
                      <button
                        className='btn bg-red-600 px-3 py-1 rounded-lg text-white hover:bg-red-700 hover:scale-95'
                        onClick={() => handleDelete(cv._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          <h1>No CVS Yes. Keep Checking back</h1>
        </>
      )}
    </>
  );
}

export default CvPageView;
