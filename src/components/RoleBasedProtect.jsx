import { Outlet } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';

function RoleBasedProtect({ children }) {
  const { currentUser } = useUser();

  if (currentUser.role === 'admin')
    return (
      <>
        {children}
        <Outlet />
      </>
    );
}

export default RoleBasedProtect;
