import { useMutation } from '@tanstack/react-query';
import { payRent } from '../../services/apiPayment';
import toast from 'react-hot-toast';

export function usePayrent() {
  const { mutate: payrent, isPending } = useMutation({
    mutationFn: paymentData => payRent(paymentData),
    onSuccess: response => {
      console.log(response);
      console.log('Rent paid', response.data.data);
      if (response.status === 400) {
        throw new Error(response.data.message);
      }
      toast.success(`${response.data.data}`);
    },
    onError: err => {
      console.log(err);
      toast.error(err.data.data);
    },
  });

  return { payrent, isPending };
}
