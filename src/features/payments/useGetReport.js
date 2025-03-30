import { useMutation } from '@tanstack/react-query';
import { getReport } from '../../services/apiPayment';

export function useGetAllReports() {
  const {
    mutate: reportdata,
    isPending,
    error,
  } = useMutation({
    mutationFn: reportType => {
      return getReport(reportType);
    },
    onSuccess: () => {
      console.log('generated');
    },
    onError: () => {
      console.log('there was an error generating this');
    },
  });

  return { reportdata, isPending, error };
}
