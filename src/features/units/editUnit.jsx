import { useState } from 'react';
import Modal from '../../components/Modal';
import UnitForm from '../../components/UnitForm';
import EditUnitForm from '../../components/EditUnitForm';

function EditUnit({ unitData }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpenModal(c => !c)}
        className="rounded bg-yellow-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-red-600"
      >
        Edit Unit
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <EditUnitForm
            unitData={unitData}
            onCloseModal={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default EditUnit;
