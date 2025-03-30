import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useOneUser } from '../features/users/useGetUser';
import MaintenanceForm from './MaintenanceForm';
import { useAddMaintenance } from '../features/maintenances/useNewMaintenance';

function AddMaintenanceForm({ onCloseModal, currentUser }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const tenantId = currentUser?._id;

  const { isLoading, user, isError, error } = useOneUser(tenantId);

  const { newmaintenance, isPending, x } = useAddMaintenance();

  function onSubmit(data) {
    const finalData = { ...data, id: tenantId };
    newmaintenance(finalData, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  if (!currentUser?.unit) {
    return (
      <p>
        You do not have any
        <span className="bg-red-50 p-2 font-bold text-red-600">
          assigned unit
        </span>
        , Please contact your admin/caretaker first.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-6 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">
          Submit a Maintenance Request
        </h2>

        <MaintenanceForm
          onCloseModal={onCloseModal}
          register={register}
          reset={reset}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          user={user}
        />
      </div>
    </div>
  );
}

export default AddMaintenanceForm;
