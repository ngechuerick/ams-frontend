import { useQuery } from '@tanstack/react-query';

import { getOneUser } from '../../services/apiUser';

export function useOneUser(userId) {
  const {
    isLoading,
    data: user,
    isError,
    error,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: ({ queryKey }) => {
      const [, userId] = queryKey;
      return getOneUser(userId);
    },
  });

  return { isLoading, user, isError, error };
}
