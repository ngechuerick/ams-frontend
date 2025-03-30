import { useState } from 'react';
import Modal from '../../components/Modal';
import EditMaintenanceForm from '../../components/EditMaintenanceForm';

function UpdateMaintenance({ maintenanceItem }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpenModal(c => !c)}
        className="rounded bg-yellow-500 px-3 py-2 text-sm text-white transition duration-300 hover:bg-yellow-600"
      >
        Update
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <EditMaintenanceForm
            maintenanceItem={maintenanceItem}
            onCloseModal={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default UpdateMaintenance;
