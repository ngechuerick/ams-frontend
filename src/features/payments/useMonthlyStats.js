import { useQuery } from '@tanstack/react-query';
import { getMonthlyStats } from '../../services/apiPayment';

function useMonthlyPaymentStats() {
  const {
    data: monthlystats,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['payments'],
    queryFn: getMonthlyStats,
  });

  return { monthlystats, isLoading, isError, error };
}

export default useMonthlyPaymentStats;
