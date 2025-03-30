import { useQuery } from '@tanstack/react-query';
import { getUnit } from '../../services/apiUnits';

export function useOneUnit(unitId) {
  const {
    isLoading,
    data: unit,
    isError,
    error,
  } = useQuery({
    queryKey: ['apartment', unitId],
    queryFn: ({ queryKey }) => {
      const [, unitId] = queryKey;
      return getUnit(unitId);
    },
  });

  return { isLoading, unit, isError, error };
}
