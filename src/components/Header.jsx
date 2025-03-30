import { Link } from 'react-router-dom';
import {
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
  HomeIcon,
  SunIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import { useUser } from '../features/authentication/useUser';
import DropdownUser from './DropDownUser';

function Header({ onToggleSideBar, isOpen }) {
  const { currentUser } = useUser();

  return (
    <header className="sticky top-0 z-999 border-b bg-white py-3 shadow-default">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-8">
          <button onClick={onToggleSideBar} className="max-md:block md:hidden">
            {isOpen ? (
              <XMarkIcon className="h-6 w-6 fill-black" />
            ) : (
              <Bars3Icon className="h-6 w-6 fill-black" />
            )}
          </button>
          <Link to="/">
            <HomeIcon className="h-6 w-6 fill-black" />
          </Link>
        </div>

        <div className="flex items-center gap-8">
          <button className="bg-gray relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white">
            <SunIcon className="h-5 w-5 fill-black" />
          </button>

          {/* <div className="flex items-center gap-4 px-6">
            <p className="flex flex-col text-right text-bgalt">
              <span className="text-sm font-bold">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
              <span className="text-xs">{currentUser?.role}</span>
            </p>
            <div className="h-10 w-10">
              {currentUser.photo ? (
                <div className="h-10 w-10">
                  <img
                    src={`http://localhost:8000/public/img/users/${currentUser.photo}`}
                    alt="User1"
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              ) : (
                <UserCircleIcon className="h-10 w-10 fill-black" />
              )}
            </div>
          
          </div> */}

          <DropdownUser currentUser={currentUser} />
        </div>
      </div>
    </header>
  );
}

export default Header;
