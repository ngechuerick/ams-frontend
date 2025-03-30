import { useQuery } from '@tanstack/react-query';
import { getAllPayments } from '../../services/apiPayment';

export function useAllPayments() {
  const {
    data: allpayments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const payments = await getAllPayments();

      if (!payments) {
        throw new Error('No units found');
      }

      return payments;
    },
  });

  return { allpayments, isLoading, isError, error };
}
