import React, { useState, useEffect } from 'react';
import { useUsers } from '../../features/users/useUsers';
import { useForm } from 'react-hook-form';
import { useSendCommunication } from '../../features/communication/useSendCommunication';
import CommunicationForm from '../../components/CommunicationForm';
import Breadcrumb from '../../components/BreadCrumps';
import LoaderMini from '../../ui/LoaderMini';

function Communication() {
  const [selectedTenants, setSelectedTenants] = useState([]);
  const [sendToAll, setSendToAll] = useState(false);
  const [method, setMethod] = useState('email');

  const { allusers, isLoading } = useUsers({ role: 'tenant', active: 'true' });

  const handleTenantToggle = tenantId => {
    if (sendToAll) return;
    setSelectedTenants(prev =>
      prev.includes(tenantId)
        ? prev.filter(id => id !== tenantId)
        : [...prev, tenantId],
    );
  };

  if (isLoading) return <LoaderMini />;

  const tenantsWithunits = allusers?.filter(
    user => user.unit !== undefined && user.unit !== null,
  );

  return (
    <div className="min-h-screen p-6">
      <Breadcrumb />

      <h1 className="mb-6 text-3xl font-bold text-gray-800">
        Send Communication to tenants
      </h1>

      <CommunicationForm
        allusers={tenantsWithunits}
        handleTenantToggle={handleTenantToggle}
        sendToAll={sendToAll}
        setSendToAll={setSendToAll}
        selectedTenants={selectedTenants}
        setSelectedTenants={setSelectedTenants}
        method={method}
        setMethod={setMethod}
      />
    </div>
  );
}

export default Communication;
