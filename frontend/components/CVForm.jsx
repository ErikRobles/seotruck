import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import { useSubmitCV } from '../hooks/useSubmitCV';

function CVForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cvfile: '',
    address: '',
    usEligible: '',
    city: '',
    state: '',
    zip: '',
    dob: '',
    description: '',
  });
  const [blockOneOpen, setBlockOneOpen] = useState(false);
  const [havecv, setHaveCv] = useState(false);
  const [haveNoCv, setHaveNoCv] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [buttonText, setButtonText] = useState('Click Here To Start');

  const { submitcv, error, loading } = useSubmitCV();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      cvfile: e.target.files[0],
    }));
  };

  const openButton = () => {
    setButtonClicked(!buttonClicked);
  };

  const cvSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.firstName === '' ||
      formData.lastName === '' ||
      formData.email === '' ||
      formData.phone === ''
    ) {
      toast.error('All Fields are required');
    } else {
      await submitcv(formData);
    }
    console.log(formData);
    setButtonClicked(!buttonClicked);
    setButtonText('Thank You! Create Another?');
  };

  const handleCVChange = () => {
    setHaveCv(!havecv);
    setHaveNoCv(false);
  };

  const handleNoCVChange = () => {
    setHaveNoCv(!haveNoCv);
    setHaveCv(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className='mb-[30px]'>
        <div className='flex flex-col items-center justify-center'>
          <button
            className='mb-[30px] btn btn-primary bg-gradient-to-br from-[#00388d] via-[#592057] to-[#d2000a] hover:bg-gradient-to-bl from-[#00388d] via-[#592057] to-[#d2000a] text-white rounded-lg px-4 py-2 uppercase shadow-lg'
            onClick={openButton}
          >
            {buttonText}
          </button>
        </div>
        {buttonClicked && (
          <>
            <div className='container mx-auto'>
              <div className='max-w-xl p-5 mx-auto my-3 bg-white rounded-md shadow-sm'>
                <div className='text-center'>
                  <h1 className='my-3 text-3xl font-semibold text-gray-700'>
                    Enter your Information
                  </h1>
                  <p className='text-gray-400'>
                    Fill up the form below to send us your info.
                  </p>
                </div>
                <div>
                  <form onSubmit={cvSubmit} encType='multipart/form-data'>
                    <div className='mb-6'>
                      <label
                        htmlFor='firstName'
                        className='block mb-2 text-sm text-gray-600'
                      >
                        First Name
                      </label>
                      <input
                        type='text'
                        name='firstName'
                        placeholder='John'
                        onChange={onChange}
                        required
                        className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
                      />
                    </div>
                    <div className='mb-6'>
                      <label
                        htmlFor='lastName'
                        className='block mb-2 text-sm text-gray-600'
                      >
                        Last Name
                      </label>
                      <input
                        type='text'
                        name='lastName'
                        placeholder='Doe'
                        required
                        onChange={onChange}
                        className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
                      />
                    </div>
                    <div className='mb-6'>
                      <label
                        htmlFor='email'
                        className='block mb-2 text-sm text-gray-600'
                      >
                        Email Address
                      </label>
                      <input
                        type='email'
                        name='email'
                        placeholder='you@email.com'
                        required
                        onChange={onChange}
                        className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
                      />
                    </div>
                    <div className='mb-6'>
                      <label htmlFor='phone' className='text-sm text-gray-600'>
                        Phone Number
                      </label>
                      <input
                        type='text'
                        name='phone'
                        onChange={onChange}
                        placeholder='123-1234-567'
                        required
                        className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
                      />
                    </div>

                    <div className='mb-6 flex flex-row justify-evenly align-center'>
                      {blockOneOpen && (
                        <button
                          type='button'
                          className='btn btn-primary bg-[#d2000a] hover:bg-[#4f46e5] text-white py-2 px-4 rounded-md shadow-lg'
                          onClick={() => setBlockOneOpen(!blockOneOpen)}
                        >
                          Back
                        </button>
                      )}

                      <button
                        type='button'
                        className='btn btn-primary bg-[#00388d] hover:bg-[#4f46e5] text-white py-2 px-4 rounded-md disabled:opacity-25 shadow-lg'
                        onClick={() => setBlockOneOpen(!blockOneOpen)}
                      >
                        Next
                      </button>
                    </div>
                    {blockOneOpen && (
                      <>
                        <div className='flex items-center w-full mb-4'>
                          <input
                            id='default-radio-1'
                            type='radio'
                            value='have-cv'
                            name='answer'
                            onChange={handleCVChange}
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          />
                          <label
                            htmlFor='default-radio-1'
                            className='ml-2 text-sm text-gray-500'
                          >
                            Upload my own Resume
                          </label>
                        </div>
                        <div className='flex items-center'>
                          <input
                            id='default-radio-2'
                            type='radio'
                            value='fill-form'
                            name='answer'
                            onChange={handleNoCVChange}
                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                          />
                          <label
                            htmlFor='default-radio-2'
                            className='ml-2 text-sm text-gray-500'
                          >
                            Continue With the Form
                          </label>
                        </div>
                      </>
                    )}
                    {blockOneOpen && havecv && (
                      <>
                        <label
                          className='block mb-6 mt-6 text-sm font-medium text-gray-900 dark:text-gray-300'
                          htmlFor='file_input'
                        >
                          Upload Resume
                        </label>
                        <input
                          className='block w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-white focus:outline-none dark:bg-[#00388d] dark:border-gray-600 dark:placeholder-white'
                          id='cvfile'
                          type='file'
                          filename='cvfile'
                          name='cvfile'
                          onChange={onFileChange}
                          accept='.doc,.docx,.pdf,.odf'
                        />

                        <div className='mb-6 mt-6'>
                          <button
                            type='submit'
                            className='w-full px-2 py-4 text-white bg-[#00388d] rounded-md  focus:bg-indigo-600 focus:outline-none'
                          >
                            Send Resume
                          </button>
                        </div>
                      </>
                    )}
                    {haveNoCv && (
                      <>
                        <div className='mb-6 mt-6'>
                          <label
                            htmlFor='usEligible'
                            className='block mb-2 text-sm text-gray-600'
                          >
                            Eligible to work in the US?
                          </label>
                          <select
                            id='usEligible'
                            name='usEligible'
                            className='border border-gray-300 text-gray-500 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                            onChange={onChange}
                            value='yes'
                          >
                            <option value='yes'>Yes</option>
                            <option value='no'>No</option>
                          </select>
                        </div>

                        <div className='mb-6'>
                          <label
                            htmlFor='address'
                            className='block mb-2 text-sm text-gray-600'
                          >
                            Address
                          </label>
                          <input
                            type='text'
                            name='address'
                            placeholder='123 Cottage Ln SW'
                            onChange={onChange}
                            className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
                          />
                        </div>

                        <div className='mb-6'>
                          <label
                            htmlFor='city'
                            className='block mb-2 text-sm text-gray-600'
                          >
                            City
                          </label>
                          <input
                            type='text'
                            name='city'
                            placeholder='Seattle'
                            onChange={onChange}
                            className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
                          />
                        </div>

                        <div className='mb-6'>
                          <label
                            htmlFor='state'
                            className='block mb-2 text-sm text-gray-600'
                          >
                            State
                          </label>
                          <select
                            id='state'
                            className='border border-gray-300 text-gray-400 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                          >
                            <option disabled>Choose a State</option>
                            <option value='AL'>Alabama</option>
                            <option value='AK'>Alaska</option>
                            <option value='AZ'>Arizona</option>
                            <option value='AR'>Arkansas</option>
                            <option value='CA'>California</option>
                            <option value='CO'>Colorado</option>
                            <option value='CT'>Connecticut</option>
                            <option value='DE'>Delaware</option>
                            <option value='DC'>District Of Columbia</option>
                            <option value='FL'>Florida</option>
                            <option value='GA'>Georgia</option>
                            <option value='HI'>Hawaii</option>
                            <option value='ID'>Idaho</option>
                            <option value='IL'>Illinois</option>
                            <option value='IN'>Indiana</option>
                            <option value='IA'>Iowa</option>
                            <option value='KS'>Kansas</option>
                            <option value='KY'>Kentucky</option>
                            <option value='LA'>Louisiana</option>
                            <option value='ME'>Maine</option>
                            <option value='MD'>Maryland</option>
                            <option value='MA'>Massachusetts</option>
                            <option value='MI'>Michigan</option>
                            <option value='MN'>Minnesota</option>
                            <option value='MS'>Mississippi</option>
                            <option value='MO'>Missouri</option>
                            <option value='MT'>Montana</option>
                            <option value='NE'>Nebraska</option>
                            <option value='NV'>Nevada</option>
                            <option value='NH'>New Hampshire</option>
                            <option value='NJ'>New Jersey</option>
                            <option value='NM'>New Mexico</option>
                            <option value='NY'>New York</option>
                            <option value='NC'>North Carolina</option>
                            <option value='ND'>North Dakota</option>
                            <option value='OH'>Ohio</option>
                            <option value='OK'>Oklahoma</option>
                            <option value='OR'>Oregon</option>
                            <option value='PA'>Pennsylvania</option>
                            <option value='RI'>Rhode Island</option>
                            <option value='SC'>South Carolina</option>
                            <option value='SD'>South Dakota</option>
                            <option value='TN'>Tennessee</option>
                            <option value='TX'>Texas</option>
                            <option value='UT'>Utah</option>
                            <option value='VT'>Vermont</option>
                            <option value='VA'>Virginia</option>
                            <option value='WA'>Washington</option>
                            <option value='WV'>West Virginia</option>
                            <option value='WI'>Wisconsin</option>
                            <option value='WY'>Wyoming</option>
                          </select>
                        </div>

                        <div className='mb-6'>
                          <label
                            htmlFor='zip'
                            className='block mb-2 text-sm text-gray-600'
                          >
                            Zip / Postal Code
                          </label>
                          <input
                            type='text'
                            name='zip'
                            placeholder='98102'
                            onChange={onChange}
                            className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
                          />
                        </div>

                        <div className='mb-6'>
                          <label
                            htmlFor='dob'
                            className='block mb-2 text-sm text-gray-600'
                          >
                            Date of Birth
                          </label>
                          <input
                            datepicker='true'
                            type='date'
                            name='dob'
                            className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5'
                            placeholder='Select date'
                            onChange={onChange}
                          />
                        </div>

                        <div className='mb-6'>
                          <label
                            htmlFor='message'
                            className='block mb-2 text-sm text-gray-600'
                          >
                            Tell us a little bit about yourself
                          </label>

                          <textarea
                            rows='5'
                            name='message'
                            placeholder='Your Message'
                            className='w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md  focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
                            required
                            onChange={onChange}
                          ></textarea>
                        </div>
                        <div className='mb-6'>
                          <button
                            type='submit'
                            className='w-full px-2 py-4 text-white bg-[#00388d] rounded-md  focus:bg-indigo-600 focus:outline-none'
                          >
                            Send Resume
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CVForm;
