import AddUser from '../../features/users/AddUser';

import { NavLink } from 'react-router-dom';
import { useRemoveUser } from '../../features/users/useDeleteUser';
import { useUsers } from '../../features/users/useUsers';
import LoaderMini from '../../ui/LoaderMini';
import EditUser from '../../features/users/EditUser';

function Settings() {
  /**Fetching all users */
  const { allusers, isLoading } = useUsers();

  /**Deleting a user */
  const { deleteuser, isPending } = useRemoveUser();

  if (isLoading) return <LoaderMini />;

  if (!allusers) return <p>There are no users.</p>;
  return (
    <div>
      <h2 className="mb-4.5 block text-xl font-semibold">
        All System Users Overview
      </h2>
      <div className="mb-4 flex gap-4 py-2">
        <AddUser type={'User'} />
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Photo
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Tenant Name
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Phone Number
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>

                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Active Status
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allusers.map(user => (
                <tr
                  key={user._id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.photo ? (
                      <img
                        src={`http://localhost:8000/public/img/users/${user.photo}`}
                        alt={`${user.firstName} `}
                        className="h-16 w-16 rounded object-cover"
                      />
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.firstName}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.email}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.phoneNumber}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {user.role}
                  </td>

                  <td className="border-b px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="border-b px-4 py-4">
                    <div className="flex space-x-2">
                      <NavLink
                        to={`/users/${user._id}`}
                        className="rounded bg-indigo-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-indigo-600"
                      >
                        View
                      </NavLink>

                      <EditUser user={user} />

                      <button
                        onClick={() => deleteuser({ tenantId: user._id })}
                        type="button"
                        className="rounded bg-red-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Settings;
