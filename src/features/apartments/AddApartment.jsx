import { useState } from 'react';
import Modal from '../../components/Modal';
import ApartmentForm from '../../components/AddApartmentForm';
import ApartmentFormt from '../../components/ApartmentForm';
import AddApartmentForm from '../../components/AddApartmentForm';

function AddApartment({ styles, type }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpenModal(c => !c)}
        className={`${styles ? styles : 'rounded-full bg-green-200 px-4 py-2'}`}
      >
        {type}
      </button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <AddApartmentForm onCloseModal={() => setIsOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}

export default AddApartment;
