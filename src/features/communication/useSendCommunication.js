import { useMutation } from '@tanstack/react-query';
import { sendCommunication } from '../../services/apiUser';
import toast from 'react-hot-toast';

export function useSendCommunication() {
  const {
    mutate: sendcommunication,
    isPending,
    error,
  } = useMutation({
    mutationFn: commData => sendCommunication(commData),
    onSuccess: () => {
      toast.success('Successfully sent communication');
    },
    onError: err => {
      console.log(err);
    },
  });

  return { sendcommunication, isPending, error };
}
