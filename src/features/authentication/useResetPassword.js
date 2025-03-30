import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../services/apiAuth';

export function useResetPassword() {
  const navigate = useNavigate();

  const {
    mutate: updatepassword,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: passwordData => resetPassword(passwordData),
    onSuccess: response => {
      toast.success('Successfully Updated your password.');
      console.log(response);
      navigate('/login', { replace: true });
    },
    onError: err => {
      if (err.code === 'ERR_NETWORK') {
        toast.error(err.message);
      }
      toast.error(err.response.data.message);
    },
  });

  return { updatepassword, isPending, isSuccess, error };
}
