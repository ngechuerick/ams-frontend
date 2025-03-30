import { useQuery } from '@tanstack/react-query';
import { getAllMaintenances } from '../../services/apiMaintenance';

export function useAllMaintenances() {
  const {
    data: allmaintenances,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['maintenances'],
    queryFn: getAllMaintenances,
  });
  return { allmaintenances, isLoading, error, isError };
}
