import { Link } from 'react-router-dom';

import {
  ArrowLeftStartOnRectangleIcon,
  BellIcon,
  BuildingOffice2Icon,
  Cog8ToothIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  ListBulletIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/16/solid';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import NavLinkItem from '../ui/NavLinkItem';
import { useLogout } from '../features/authentication/useLogout';
import { useUser } from '../features/authentication/useUser';

function SideNav({ isOpen }) {
  const { logout } = useLogout();
  const { currentUser } = useUser();

  return (
    <aside
      className={`sidenav flex flex-col bg-boxdark-2 transition-all duration-300 max-md:fixed max-md:top-0 max-md:h-full md:relative md:z-999 md:w-72.5 ${isOpen ? 'z-999 w-72.5' : '-z-50 w-0'}`}
    >
      <div className="px-4.5 py-5.5 max-md:flex max-md:justify-between">
        <Link to="/">
          {/* {isOpen ? (
            <img src={logo1} alt="Logo" />
          ) : (
            <img src={logo2} alt="Logo" />
          )} */}
          <p className="text-center text-3xl">AMS</p>
        </Link>

        <button className="max-md:block md:hidden">X</button>
      </div>

      <div className="no-scrollbar ease-linearpx-6 mt-4.5 overflow-y-auto duration-300">
        <nav className="mt-4.5 flex flex-col gap-6">
          <div className="no-scrollbar flex flex-col gap-4.5 overflow-x-hidden">
            <h3 className="px-4 text-xs font-semibold uppercase">Menu</h3>
            <ul className="no-scrollbar flex flex-col gap-4.5 px-2 text-grey-1">
              <NavLinkItem linkTo="/">
                <span>
                  <ListBulletIcon className="h-5.5 w-5.5" />
                </span>
                <span>Dashboard</span>
              </NavLinkItem>

              {currentUser?.role === 'admin' && (
                <>
                  <NavLinkItem linkTo="/apartment">
                    <span>
                      <BuildingOffice2Icon className="h-5.5 w-5.5" />
                    </span>
                    <span>Apartments</span>
                  </NavLinkItem>

                  <NavLinkItem linkTo="/units">
                    <span>
                      <BuildingOffice2Icon className="h-5.5 w-5.5" />
                    </span>
                    <span>Units</span>
                  </NavLinkItem>

                  <NavLinkItem linkTo="/tenants">
                    <span>
                      <UserGroupIcon className="h-5.5 w-5.5" />
                    </span>
                    <span>Tenants</span>
                  </NavLinkItem>

                  <NavLinkItem linkTo="/reports">
                    <span>
                      <DocumentDuplicateIcon className="h-5.5 w-5.5" />
                    </span>
                    <span>Reports</span>
                  </NavLinkItem>

                  <NavLinkItem linkTo="/communication">
                    <span>
                      <BellIcon className="h-5.5 w-5.5" />
                    </span>
                    <span>Communication</span>
                  </NavLinkItem>
                </>
              )}

              <NavLinkItem linkTo="/payments">
                <span>
                  <CurrencyDollarIcon className="h-5.5 w-5.5" />
                </span>
                <span>Payments</span>
              </NavLinkItem>
              <NavLinkItem linkTo="/maintenance">
                <span>
                  <WrenchScrewdriverIcon className="h-5.5 w-5.5" />
                </span>
                <span>Maintenance</span>
              </NavLinkItem>

              {/* <NavLinkItem linkTo="/notifications">
                <span>
                  <BellIcon className="h-5.5 w-5.5" />
                </span>
                <span>Notifications</span>
              </NavLinkItem> */}
            </ul>
          </div>

          <div className="flex flex-col gap-4.5 overflow-x-hidden">
            <h3 className="px-4 text-xs font-semibold uppercase">Others</h3>
            <ul className="flex flex-col gap-4.5 px-2">
              {currentUser?.role === 'admin' && (
                <>
                  <NavLinkItem linkTo="/settings">
                    <span>
                      <Cog8ToothIcon className="h-5.5 w-5.5" />
                    </span>
                    <span>Accounts/users</span>
                  </NavLinkItem>

                  {/* <NavLinkItem linkTo="/adjustments">
                    <span>
                      <AdjustmentsVerticalIcon className="h-5.5 w-5.5" />
                    </span>
                    <span>Adjustments</span>
                  </NavLinkItem> */}
                </>
              )}

              <NavLinkItem linkTo="/profile">
                <span>
                  <UserCircleIcon className="h-5.5 w-5.5" />
                </span>
                <span>Profile</span>
              </NavLinkItem>
            </ul>
          </div>
        </nav>
      </div>

      <div className="mt-auto px-8 py-4.5">
        <button onClick={logout}>
          <p className="flex items-center space-x-6 overflow-hidden">
            <span>
              <ArrowLeftStartOnRectangleIcon className="h-5.5 w-5.5" />
            </span>
            <span>Log out</span>
          </p>
        </button>
      </div>
    </aside>
  );
}

export default SideNav;
