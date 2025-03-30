import { useForm } from 'react-hook-form';
import useApartment from '../features/apartments/useApartment';
import ApartmentForm from './ApartmentForm';
import { useState } from 'react';

function AddApartmentForm({ onCloseModal }) {
  /**React map logic */
  const [position, setPosition] = useState([1.2921, 36.8219]);

  /**Here we are creating a new apartment */
  const { newApartment, isPending } = useApartment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleMapClick(e) {
    const { lat, lng } = e.latlng;
    const fixedLat = Number.parseFloat(lat).toFixed(6);
    const fixedLng = Number.parseFloat(lng).toFixed(6);

    setPosition([fixedLat, fixedLng]);
  }

  /**Our own function that we shall call on submit */
  function onSubmit(data) {
    const finalData = { ...data, coordinates: position };

    newApartment(finalData, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  return (
    <div>
      <ApartmentForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isPending={isPending}
        register={register}
        errors={errors}
        onCloseModal={onCloseModal}
        handleMapClick={handleMapClick}
        position={position}
      />
    </div>
  );
}

export default AddApartmentForm;
