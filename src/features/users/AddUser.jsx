import { useState } from 'react';
import Modal from '../../components/Modal';
import UserForm from '../../components/UserForm';

function AddUser({ type }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpenModal(c => !c)}
        className="rounded-full bg-green-200 px-4 py-2"
      >
        Add {type}
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <UserForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddUser;
