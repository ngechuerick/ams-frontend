import { useQuery } from '@tanstack/react-query';
import { getMaintenance } from '../../services/apiMaintenance';

export function useMaintenance(maintenanceId) {
  const {
    isLoading,
    data: maintenance,
    isError,
    error,
  } = useQuery({
    queryKey: ['maintenances', maintenanceId],
    queryFn: ({ queryKey }) => {
      const [, maintNum] = queryKey;
      return getMaintenance(maintNum);
    },
  });

  return { isLoading, maintenance, isError, error };
}
