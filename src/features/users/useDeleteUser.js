import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../services/apiUser';

export function useRemoveUser() {
  const queryClient = useQueryClient();

  const { mutate: deleteuser, isPending } = useMutation({
    mutationFn: delData => deleteUser(delData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      console.log('successfully deleted user!');
    },
    onError: err => {
      console.log('There was an error deleting user!', err);
    },
  });

  return { deleteuser, isPending };
}
