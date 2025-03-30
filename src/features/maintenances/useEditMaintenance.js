import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMaintenance } from '../../services/apiMaintenance';

export function useUpdateMaintenance() {
  const queryClient = useQueryClient();

  const {
    mutate: updatedmaintenance,
    isPending,
    error,
  } = useMutation({
    mutationFn: updateData => updateMaintenance(updateData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenances'] });
      console.log('Updated maintenance Successfully');
    },
    onError: () => {
      console.log('There was an error updating maintenance');
    },
  });

  return { updatedmaintenance, isPending, error };
}
