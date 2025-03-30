import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '../../services/apiUser';
import toast from 'react-hot-toast';

export function useChangeUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateuser,
    isPending,
    error,
  } = useMutation({
    mutationFn: userData => {
      console.log(userData);
      return updateUser(userData);
    },
    onSuccess: () => {
      toast.success('Updated your data successfully');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: error => {
      console.log(error);
      console.log('There was an error updating user details');
      toast.error(error.response.data.message);
    },
  });

  return {
    updateuser,
    isPending,
    error,
  };
}
