import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../../services/apiUser';
import toast from 'react-hot-toast';

export function useNewUser() {
  const queryClient = useQueryClient();

  const { mutate: newUser, isPending } = useMutation({
    mutationFn: userData => createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      console.log('new user successfully created');
    },
    onError: error => {
      toast.error(error.response.data.message);
    },
  });

  return { newUser, isPending };
}
