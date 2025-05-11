import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { AppLoader } from '../../../components/AppLoader';
import { useVerifyEmail } from '../../../hooks/useAuth';
import { Routes } from '../../../router/routes/routes';
import Success from '../Success';

export function EmailVerification() {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const onError = useCallback(() => {
    toast.error('Invalid token');
    setTimeout(() => navigate(Routes.home), 2000);
  }, [navigate]);

  const onSuccess = useCallback(() => {
    setShowSuccess(true);
  }, [setShowSuccess]);

  const { mutate, isSuccess } = useVerifyEmail(onSuccess, onError);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      onError();
    } else if (!isSuccess) {
      mutate({ token });
    }
  }, [navigate, mutate, onError, isSuccess]);

  if (!showSuccess) {
    return <AppLoader />;
  }

  return <Success />;
}
