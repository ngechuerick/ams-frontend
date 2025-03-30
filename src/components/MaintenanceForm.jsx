import Button from '../ui/Button';

function MaintenanceForm({
  register,
  reset,
  handleSubmit,
  errors,
  onSubmit,
  user,
  maintenanceItem,
  onCloseModal,
  isPending,
}) {
  console.log(maintenanceItem);
  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="tenant"
          className="block text-sm font-medium text-gray-700"
        >
          Tenant Name
        </label>
        <input
          type="text"
          id="tenant"
          name="tenant"
          defaultValue={`${maintenanceItem ? maintenanceItem?.tenant : `${user?.firstName}  ${user?.lastName}`}`}
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          {...register('tenant')}
        />
      </div>

      <div>
        <label
          htmlFor="room"
          className="block text-sm font-medium text-gray-700"
        >
          Room Number
        </label>
        <input
          type="text"
          id="room"
          name="room"
          required
          defaultValue={user?.unit?.unitNum || maintenanceItem?.room}
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          {...register('room')}
        />
      </div>

      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-gray-700"
        >
          Upload Image
        </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100"
          {...register('image')}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows="3"
          defaultValue={maintenanceItem?.description}
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          {...register('description')}
        />
      </div>

      {maintenanceItem && (
        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={maintenanceItem.status}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register('status')}
          >
            <option value="new">New</option>
            <option value="fixing">Fixing</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>
      )}

      <div className="mt-4 flex justify-end space-x-2">
        <Button
          btnText={'Cancel'}
          type={'cancelBtn'}
          onClick={() => onCloseModal()}
        />

        <Button isPending={isPending} btnText={'Submit'} type={'saveBtn'} />
      </div>
    </form>
  );
}

export default MaintenanceForm;
