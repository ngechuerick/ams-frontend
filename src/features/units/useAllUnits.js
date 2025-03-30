import { useQuery } from '@tanstack/react-query';
import { getAllUnits } from '../../services/apiUnits';

export function useAllUnits(paramsItems = '') {
  const {
    data: allunits,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['units', paramsItems],
    queryFn: async ({ queryKey }) => {
      const [, paramsItem] = queryKey;
      const units = await getAllUnits(paramsItem);

      if (!units) {
        throw new Error('No units found');
      }

      return units;
    },
  });

  return { allunits, isLoading, isError, error };
}
