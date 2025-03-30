import { useMutation } from '@tanstack/react-query';
import { updatePassword } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export function useNewPassword() {
  const {
    mutate: changepassword,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateData => updatePassword(updateData),
    onSuccess: () => {
      console.log('Successfully changed your password');
      toast.success('Successfully changed your password');
    },
    onError: err => {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    },
  });

  return { changepassword, isPending, error };
}
