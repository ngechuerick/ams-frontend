import { useNavigate, useParams } from 'react-router-dom';
import { useMaintenance } from '../../features/maintenances/useGetMaintenance';
import UpdateMaintenance from '../../features/maintenances/UpdateMaintenance';
import Button from '../../ui/Button';

function MaintenanceOverview() {
  // Get maintenance ID from URL
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, maintenance, isError, error } = useMaintenance(id);

  console.log(maintenance);
  return (
    <div>
      <div className="mx-auto rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/maintenance')}
            className="rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600"
          >
            Back to maintenances
          </button>
          <h1 className="text-3xl font-bold text-indigo-600">
            Maintenance Overview
          </h1>
          <div></div>
        </div>

        <img
          src={`http://localhost:8000/public/img/maintenance/${maintenance?.photo}`}
          alt={`${maintenance?.name} - ${maintenance?.maintenanceType}`}
          className="mb-6 h-64 w-full rounded-lg object-cover"
        />

        <div className="space-y-12">
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Room</h2>
              <p className="text-gray-700">{maintenance?.room}</p>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Tenant</h2>
              <p className="text-gray-700">{maintenance?.tenant}</p>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Initiated at
              </h2>
              <p className="text-gray-700">{`${new Date(maintenance?.date).toLocaleDateString()}`}</p>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold text-gray-800">Status</h2>
              <p className="text-gray-700">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    maintenance?.status === 'new'
                      ? 'bg-red-200 text-red-800'
                      : maintenance?.status === 'fixing'
                        ? 'bg-yellow-200 text-yellow-800'
                        : 'bg-green-200 text-green-800'
                  }`}
                >
                  {maintenance?.status}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Description:
            </h2>
            <p className="leading-relaxed text-gray-700">
              {maintenance?.description}
            </p>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <UpdateMaintenance maintenanceItem={maintenance} />
            <Button
              //   isPending={isPending}
              btnText={'Delete'}
              type={'deleteBtn'}
              //   onClick={() => deleteApart(maintenance.maintenanceNum)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MaintenanceOverview;
