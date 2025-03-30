import { useForm } from 'react-hook-form';
import useGetApartment from '../features/apartments/useGetApartment';
import useEditApartment from '../features/apartments/useEditApartment';

import ApartmentForm from './ApartmentForm';
import { useState } from 'react';

function EditApartmentForm({ onCloseModal, apartId }) {
  /**Default leaflet location */
  const [position, setPosition] = useState([1.2921, 36.8219]);

  /**Getting an apartment data for the apartment being edited*/
  const { data: apartment, isLoading } = useGetApartment(apartId);

  const { editApartment, isPending } = useEditApartment();

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
    // const finalData = [apartId, data];
    const finalData = { ...data, coordinates: position };
    const outputData = [apartId, finalData];

    editApartment(outputData, {
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
        isLoading={isLoading}
        register={register}
        errors={errors}
        apartment={apartment}
        position={position}
        onCloseModal={onCloseModal}
        handleMapClick={handleMapClick}
      />
    </div>
  );
}

export default EditApartmentForm;
