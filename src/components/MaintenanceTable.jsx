import { NavLink } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import UpdateMaintenance from '../features/maintenances/UpdateMaintenance';
import { useAllMaintenances } from '../features/maintenances/useAllMaintenances';

function MaintenanceTable() {
  const { currentUser } = useUser();
  const { allmaintenances, isLoading, error, isError } = useAllMaintenances();
  return (
    <div>
      <table className="w-full text-left">
        <thead className="bg-slate-300">
          <tr>
            <th className="border-b p-4">Image</th>
            <th className="border-b p-4">Tenant</th>
            <th className="border-b p-4">Room</th>
            <th className="border-b p-4">Date</th>
            <th className="border-b p-4">Description</th>
            <th className="border-b p-4">Status</th>
            {currentUser?.role === 'tenant' ? (
              ''
            ) : (
              <th className="border-b p-4">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {currentUser?.role === 'tenant'
            ? currentUser?.maintenances?.map(item => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {item.photo ? (
                      <img
                        src={`http://localhost:8000/public/img/maintenance/${item.photo}`}
                        alt="Maintenance"
                        className="h-10 w-10 rounded object-cover"
                      />
                    ) : (
                      <div className="h-5"></div>
                    )}
                  </td>
                  <td className="p-4">{item.tenant}</td>
                  <td className="p-4">{item.room}</td>
                  <td className="p-4">{item.date.split('T')[0]}</td>

                  <td className="p-4">{item.description}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.status === 'new'
                          ? 'bg-red-200 text-red-800'
                          : item.status === 'fixing'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  {currentUser?.role === 'tenant' ? (
                    ''
                  ) : (
                    <td className="flex space-x-2 p-4">
                      <UpdateMaintenance maintenanceItem={item} />

                      <button className="rounded bg-gray-600 px-3 py-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                        View
                      </button>
                    </td>
                  )}
                </tr>
              ))
            : allmaintenances?.map(item => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {item.photo ? (
                      <img
                        src={`http://localhost:8000/public/img/maintenance/${item.photo}`}
                        alt="Maintenance"
                        className="h-10 w-10 rounded object-cover"
                      />
                    ) : (
                      <div className="h-5"></div>
                    )}
                  </td>
                  <td className="p-4">{item.tenant}</td>
                  <td className="p-4">{item.room}</td>
                  <td className="p-4">{item.date.split('T')[0]}</td>

                  <td className="p-4">{item.description}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.status === 'new'
                          ? 'bg-red-200 text-red-800'
                          : item.status === 'fixing'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-green-200 text-green-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  {currentUser?.role === 'tenant' ? (
                    ''
                  ) : (
                    <td className="flex space-x-2 p-4">
                      <UpdateMaintenance maintenanceItem={item} />

                      <NavLink
                        to={`/maintenance/${item._id}`}
                        className="rounded bg-indigo-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-indigo-600"
                      >
                        View
                      </NavLink>

                      {/* <button className="rounded bg-gray-600 px-3 py-1 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
                        View
                      </button> */}
                    </td>
                  )}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default MaintenanceTable;
