import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/apiAuth';

export function useForgotPassword() {
  const navigate = useNavigate();

  const {
    mutate: resetpass,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: emailData => forgotPassword(emailData),
    onSuccess: response => {
      toast.success('Check your email for code!');
      console.log(response);
      navigate('/verify', { replace: true });
    },
    onError: err => {
      if (err.code === 'ERR_NETWORK') {
        toast.error(err.message);
      }
      toast.error(err.response.data.message);
    },
  });

  return { resetpass, isPending, isSuccess, error };
}
