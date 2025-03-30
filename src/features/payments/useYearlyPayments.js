import { useQuery } from '@tanstack/react-query';
import { getYearlyStats } from '../../services/apiPayment';

function useYearlyPaymentStats() {
  const {
    data: yearlypayments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['paymentsyear'],
    queryFn: getYearlyStats,
  });

  return { yearlypayments, isLoading, isError, error };
}

export default useYearlyPaymentStats;
