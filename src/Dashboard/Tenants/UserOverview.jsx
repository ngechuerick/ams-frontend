import { Link, useParams } from 'react-router-dom';
import { useOneUser } from '../../features/users/useGetUser';
import { formatDateStr, monthNames } from '../../utils/dateLocaleConverter';
import UpdateMaintenance from '../../features/maintenances/UpdateMaintenance';
import { UserCircleIcon } from '@heroicons/react/16/solid';
import { useRemoveUser } from '../../features/users/useDeleteUser';
import LoaderMini from '../../ui/LoaderMini';

function UserOverview() {
  const { id } = useParams();
  const { isLoading, user, isError, error } = useOneUser(id);

  const { deleteuser, isPending } = useRemoveUser();

  if (isLoading) return <LoaderMini />;

  console.log(user);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto">
        {/* Header */}
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          Tenant Overview
        </h1>

        <div className="mb-6 flex justify-between">
          <Link
            to="/settings"
            className="rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600"
          >
            &larr; Users
          </Link>

          <button
            onClick={() => {
              const unitId = user.unit ? user.unit._id : '';
              const tenantId = user._id;

              const obj = { tenantId, unitId };

              return deleteuser(obj);
            }}
            className="rounded bg-red-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-red-600"
          >
            Delete tenant
          </button>
        </div>

        {/* Tenant Profile Card */}
        <div className="mb-6 flex flex-col items-center space-y-4 rounded-lg bg-white p-6 shadow-lg md:flex-row md:items-start md:space-x-6 md:space-y-0">
          {user.photo ? (
            <img
              src={`http://localhost:8000/public/img/users/${user?.photo}`}
              alt={`${user?.firstName} ${user.lastName}`}
              className="h-32 w-32 rounded-full border-4 border-indigo-500 object-cover"
            />
          ) : (
            <UserCircleIcon className="h-35 w-35 fill-black" />
          )}

          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              {`${user?.firstName} ${user?.lastName}`}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">{user?.phoneNumber}</p>
            <p
              className={`inline-block font-semibold text-gray-600 ${user?.active ? 'rounded bg-green-500 p-1 text-white' : 'bg-red-500 p-1 text-white'}`}
            >
              {user?.active ? 'active' : 'inactive'}
            </p>
            <p className="text-gray-600">
              Joined &nbsp;
              <span className="font-bold">
                {/* {formatDateStr(user?.createdAt) || ''} */}
              </span>
            </p>
          </div>
        </div>

        {/* Payments Section */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Payment History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3">Month</th>
                  <th className="p-3">Amount (KES)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date Paid</th>
                </tr>
              </thead>
              <tbody>
                {user?.payments?.map(payment => (
                  <tr
                    key={payment._id}
                    className="border-b transition-colors duration-200 hover:bg-gray-50"
                  >
                    <td className="p-3">{`${monthNames[new Date(payment.createdAt).getUTCMonth()]}`}</td>
                    <td className="p-3">{payment?.amountPaid}</td>
                    <td className="p-3">
                      <span
                        className={`rounded px-2 py-1 text-sm ${
                          user?.paidRent
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {user?.paidRent ? 'Paid' : 'updaid'}
                      </span>
                    </td>
                    <td className="p-3">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Maintenance Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="border-b p-4">Image</th>
                  <th className="border-b p-4">Tenant</th>
                  <th className="border-b p-4">Room</th>
                  <th className="border-b p-4">Date</th>
                  <th className="border-b p-4">Description</th>
                  <th className="border-b p-4">Status</th>
                  <th className="border-b p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {user?.maintenances?.map(request => (
                  <tr key={request._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <img
                        src={`http://localhost:8000/public/img/maintenance/${request.photo}`}
                        alt="Maintenance"
                        className="h-10 w-10 rounded object-cover"
                      />
                    </td>
                    <td className="p-4">{request.tenant}</td>
                    <td className="p-4">{request.room}</td>
                    <td className="p-4">{request.date.split('T')[0]}</td>
                    <td className="p-4">{request.description}</td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          request.status === 'new'
                            ? 'bg-red-200 text-red-800'
                            : request.status === 'fixing'
                              ? 'bg-yellow-200 text-yellow-800'
                              : 'bg-green-200 text-green-800'
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="flex space-x-2 p-4">
                      <UpdateMaintenance maintenanceItem={request} />

                      <button className="rounded bg-gray-600 px-3 py-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOverview;
