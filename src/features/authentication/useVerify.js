import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { verifyCode } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useVerifyCode() {
  const navigate = useNavigate();

  const {
    mutate: verify,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: codeData => verifyCode(codeData),
    onSuccess: response => {
      toast.success('Successfull Validation');
      console.log(response);
      navigate('/resetpassword', { replace: true });
    },
    onError: err => {
      if (err.code === 'ERR_NETWORK') {
        toast.error(err.message);
      }
      toast.error(err.response.data.message);
    },
  });

  return { verify, isPending, isSuccess, error };
}
