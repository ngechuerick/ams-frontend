import { useState } from 'react';
import EditUnitForm from '../../components/EditUnitForm';
import AddUser from '../../features/users/AddUser';
import AssignTenantUnit from '../../features/users/AssignTenantUnit';
import EditUser from '../../features/users/EditUser';
import { useRemoveUser } from '../../features/users/useDeleteUser';
import { useUsers } from '../../features/users/useUsers';
import LoaderMini from '../../ui/LoaderMini';
import { NavLink } from 'react-router-dom';
import Breadcrumb from '../../components/BreadCrumps';

function Tenants() {
  const [deletingId, setDeletingId] = useState(null);

  const { allusers, isLoading } = useUsers({ role: 'tenant', active: 'true' });
  const { deleteuser, isPending } = useRemoveUser();

  if (isLoading) return <LoaderMini />;

  if (!allusers) return <p>There are no users.</p>;
  return (
    <div>
      <Breadcrumb />
      <div className="mb-4 flex gap-4 py-2">
        <AddUser type={'Tenant'} />
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <thead className="bg-gray-50">
              <tr>
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
                  Apartment
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Unit
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Paid Rent
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
              {allusers.map(tenant => (
                <tr
                  key={tenant._id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.firstName}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.email}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.phoneNumber}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.unit?.apartmentUnit}
                  </td>
                  <td className="border-b px-4 py-4 text-gray-700">
                    {tenant.unit?.unitNum}
                  </td>
                  <td className="border-b px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        tenant.paidRent
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tenant.paidRent ? 'Paid' : 'unpaid'}
                    </span>
                  </td>
                  <td className="border-b px-4 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        tenant.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {tenant.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="border-b px-4 py-4">
                    <div className="flex space-x-2">
                      <AssignTenantUnit
                        tenantId={tenant._id}
                        tenantName={`${tenant.firstName} ${tenant.lastName}`}
                      />

                      <NavLink
                        to={`/users/${tenant._id}`}
                        className="rounded bg-indigo-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-indigo-600"
                      >
                        View
                      </NavLink>

                      <EditUser tenantId={tenant._id} />
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

export default Tenants;
