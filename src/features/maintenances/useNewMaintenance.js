import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMaintenance } from '../../services/apiMaintenance';
import toast from 'react-hot-toast';

export function useAddMaintenance() {
  const queryClient = useQueryClient();

  const {
    mutate: newmaintenance,
    isPending,
    error,
  } = useMutation({
    mutationFn: data => createMaintenance(data),
    onSuccess: () => {
      toast.success('successfully created a maintenance');
      queryClient.invalidateQueries({ queryKey: ['maintenances'] });
    },
    onError: err => {
      console.log(err.response.data.error.message);
      console.log(err);
    },
  });

  return { newmaintenance, isPending, error };
}
