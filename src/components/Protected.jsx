import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useUser} from '../features/authentication/useUser';



function Protected({ children }) {
  const navigate = useNavigate();
  const { currentUser, isLoading } = useUser();

  useEffect(
    function () {
      if (!currentUser && !isLoading) {
        console.log('loggin you out!');
        navigate('/login');
      }
    },
    [isLoading, currentUser, navigate],
  );

  if (isLoading)
    return (
      <div className="flex h-dvh w-full items-center justify-center bg-slate-900 text-white">
        <p className="animate-pulse">Loading...</p>
      </div>
    );

  if (currentUser) {
    return children;
  }
}

export default Protected;
