import { useState } from 'react';
import Modal from '../../components/Modal';
import AddMaintenanceForm from '../../components/AddMaintenanceForm';

function AddMaintenance({ currentUser }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpenModal(c => !c)}
        className="rounded-full bg-green-200 px-4 py-2"
      >
        New Maintenance
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <AddMaintenanceForm
            currentUser={currentUser}
            onCloseModal={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddMaintenance;
