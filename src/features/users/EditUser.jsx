import { useState } from 'react';
import Modal from '../../components/Modal';
import EditUserForm from '../../components/EditUserForm';

function EditUser({ user }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpenModal(c => !c)}
        className="rounded bg-yellow-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-red-600"
      >
        Edit
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <EditUserForm
            user={user}
            onCloseModal={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default EditUser;
