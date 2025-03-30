import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUnit } from '../../services/apiUnits';
import toast from 'react-hot-toast';

export function useUpdateUnit() {
  const queryClient = useQueryClient();
  const {
    mutate: updateunit,
    isPending,
    error,
  } = useMutation({
    mutationFn: unitData => {
      console.log(unitData);
      return updateUnit(unitData);
    },
    onSuccess: () => {
      toast.success('Updated your data successfully');
      queryClient.invalidateQueries({ queryKey: ['units'] });
    },
    onError: error => {
      console.log(error);
      console.log('There was an error updating user details');
    },
  });

  return {
    updateunit,
    isPending,
    error,
  };
}
