import { useMutation } from '@tanstack/react-query';
import { confirmPayment } from '../../services/apiPayment';

export function useConfirmPaid() {
  const { mutate: confirmPay, isPending } = useMutation({
    mutationFn: confirmPayment,
    onSuccess: response => {
      console.log(response);
    },
    onError: err => {
      console.log(err);
    },
  });

  return { confirmPay, isPending };
}
