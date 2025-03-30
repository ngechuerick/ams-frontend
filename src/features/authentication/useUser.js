import { useQuery } from '@tanstack/react-query';

import { getUser } from '../../services/apiAuth';

export function useUser() {
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const currentUser = await getUser();
      if (!currentUser) {
        throw new Error('User data is undefined');
      }

      return currentUser;
    },
    // retry: false,
    // staleTime: 0,
    // cacheTime: 24 * 60 * 60 * 1000,
    onError: err => {
      console.error('useQuery onError:', err.message);
    },
  });

  return { currentUser, isLoading, error };
}
