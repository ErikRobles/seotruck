import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

export const useSubmitCV = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const router = useRouter();

  // const { dispatch } = useCVContext();

  const API_URL = 'http://localhost:5000/api/cvs';

  const submitcv = async (formData) => {
    setLoading(true);
    setError(null);
    const form = new FormData();
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    form.append('cvfile', formData.cvfile);
    form.append('fileUrl', formData.fileUrl);
    form.append('address', formData.address);
    form.append('city', formData.city);
    form.append('state', formData.state);
    form.append('zip', formData.zip);
    form.append('usEligible', formData.usEligible);
    form.append('dob', formData.dob);
    form.append('description', formData.description);

    const response = await axios.post(API_URL, form);
    if (!response.data) {
      setError(response.message);
      toast.error(response.message);
      setLoading(false);
      return;
    }
    toast.success('Resume Successfully Submitted');
    setLoading(false);
    router.push('/');
  };
  return { submitcv, loading, error };
};
