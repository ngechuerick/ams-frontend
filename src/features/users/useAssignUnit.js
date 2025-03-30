import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setUnitTenant } from '../../services/apiUser';

export function useAssignUnit() {
  const queryClient = useQueryClient();

  const { mutate: assignTenantUnit, isPending } = useMutation({
    mutationFn: setUnitData => setUnitTenant(setUnitData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      console.log('Tenant unit was added successfully');
    },
    onError: error => {
      console.log('There was an error', error);
    },
  });

  return { assignTenantUnit, isPending };
}
