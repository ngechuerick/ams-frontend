import { useForm } from 'react-hook-form';
import { useUpdateMaintenance } from '../features/maintenances/useEditMaintenance';
import MaintenanceForm from './MaintenanceForm';

function EditMaintenanceForm({ onCloseModal, maintenanceItem }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { updatedmaintenance, isPending, error } = useUpdateMaintenance();

  console.log(maintenanceItem);
  function onSubmit(data) {
    const finalData = { ...data, maintenanceId: maintenanceItem._id };

    updatedmaintenance(finalData, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  return (
    <div>
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          Update Status of the Maintenance Request
        </h2>

        <MaintenanceForm
          onCloseModal={onCloseModal}
          register={register}
          reset={reset}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          isPending={isPending}
          maintenanceItem={maintenanceItem}
        />
      </div>
    </div>
  );
}

export default EditMaintenanceForm;
