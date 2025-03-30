import { NavLink } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import { formatDateStr } from '../utils/dateLocaleConverter';

function DashboardTenant() {
  const { currentUser, isLoading, error } = useUser();

  console.log(currentUser.maintenances[0]);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">
        Tenant Dashboard
      </h1>

      <div className="px-3 py-4">
        <h2 className="mb-4 text-lg font-medium">
          Welcome back{' '}
          <span className="text-blue-900">
            {currentUser.firstName} {currentUser.lastName}
          </span>
        </h2>

        {currentUser.unit === null || currentUser.unit === undefined ? (
          <p>You have not yet been assigned a unit, Contact admin.</p>
        ) : (
          <div>
            <ul className="space-y-2">
              <li className="font-semibold">
                Confirm your apartment allocation details.
              </li>
              <li>
                <p>
                  <span className="font-bold">Apartment :</span>
                  {currentUser.unit.apartmentUnit}
                </p>
              </li>
              <li>
                <p>
                  <span className="font-bold">Unit Number :</span>
                  {currentUser.unit.unitNum}
                </p>
              </li>
              <li>
                <span className="font-bold">Floor : </span>
                {currentUser.unit.floor}
              </li>

              <li>
                <span className="font-bold">Joined at: </span>
                {formatDateStr(currentUser.createdAt)}
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-lg font-medium text-gray-700">
            Rent Status
          </h2>
          <p className="text-2xl font-bold text-green-600">Paid</p>
          <p className="text-gray-500">Due: March 31, 2025</p>
          <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700">
            View Payment Details
          </button>
        </div>

        {/* Maintenance Requests Card */}
        <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-lg font-medium text-gray-700">
            Maintenance Requests
          </h2>
          <p className="text-2xl font-bold text-yellow-600">
            {`${currentUser.maintenances.length}`.padStart(3, '0')}
          </p>
          <p className="text-gray-500">
            Last Request: {formatDateStr(currentUser.maintenances[0].date)}
          </p>

          <NavLink
            to="/maintenance"
            className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700"
          >
            New Request
          </NavLink>
        </div>

        {/* <div className="rounded-lg bg-white p-4 shadow-md">
          <h2 className="mb-2 text-lg font-medium text-gray-700">
            Announcements
          </h2>
          <p className="text-gray-600">
            Pool maintenance scheduled for March 15, 2025.
          </p>
          <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition duration-300 hover:bg-blue-700">
            View All
          </button>
        </div> */}
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <button className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition duration-300 hover:bg-gray-300">
            Pay Rent
          </button>
          <button className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition duration-300 hover:bg-gray-300">
            Contact Support
          </button>
          <button className="rounded-lg bg-gray-200 px-4 py-2 text-gray-800 transition duration-300 hover:bg-gray-300">
            View Lease
          </button>
        </div>
      </div>
    </div>
  );
}

export default DashboardTenant;
