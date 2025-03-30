import { useState } from 'react';
import { useAllMaintenances } from '../../features/maintenances/useAllMaintenances';
import LoaderMini from '../../ui/LoaderMini';
import { useUser } from '../../features/authentication/useUser';
import AddMaintenance from '../../features/maintenances/AddMaintenance';

import MaintenanceTable from '../../components/MaintenanceTable';
import Breadcrumb from '../../components/BreadCrumps';

function Maintenance() {
  const { currentUser } = useUser();

  const { allmaintenances, isLoading, error, isError } = useAllMaintenances();

  /**We need to display difrent views for diffrent users */

  if (isLoading) return <LoaderMini />;

  if (allmaintenances.length === 0)
    return (
      <div>
        <p>There no maintenance requests from tenants!</p>
      </div>
    );

  return (
    <div>
      <Breadcrumb />
      <h2 className="mb-4 block text-xl font-semibold">Maintenance Requests</h2>

      {currentUser?.role === 'tenant' && (
        <AddMaintenance currentUser={currentUser} />
      )}

      <div className="mt-8 overflow-x-auto rounded-lg bg-white shadow-md">
        <MaintenanceTable />
      </div>
    </div>
  );
}

export default Maintenance;
