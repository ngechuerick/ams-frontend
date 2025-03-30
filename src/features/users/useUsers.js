import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '../../services/apiUser';

export function useUsers(paramsItem = '') {
  const {
    data: allusers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users', paramsItem],
    queryFn: ({ queryKey }) => {
      const [, paramsItem] = queryKey;

      return getAllUsers(paramsItem);
    },
  });
  return { allusers, isLoading, error, isError };
}
