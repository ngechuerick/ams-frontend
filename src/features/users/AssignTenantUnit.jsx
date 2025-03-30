import { useState } from 'react';
import Modal from '../../components/Modal';
import TenantUnit from '../../components/TenantUnit';

function AssignTenantUnit({ tenantId, tenantName }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpenModal(c => !c)}
        className="rounded bg-green-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-red-600"
      >
        Unit
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <TenantUnit
            tenantId={tenantId}
            tenantName={tenantName}
            onCloseModal={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AssignTenantUnit;
