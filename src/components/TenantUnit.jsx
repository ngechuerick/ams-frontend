import { useForm } from 'react-hook-form';
import { useAssignUnit } from '../features/users/useAssignUnit';
import { useAllUnits } from '../features/units/useAllUnits';

function TenantUnit({ onCloseModal, tenantId, tenantName }) {
  const { handleSubmit, reset, register } = useForm();
  /**We need to fetch only vacant units from which we can assign a tenant to */
  /**FIXME TO BE IMPLEMENTED USING FILTERS WHERE ONLY VACANT UNITS SHOULD BE DISPLAYED */
  const { allunits, isLoading } = useAllUnits({ vacant: true });

  console.log(allunits);

  const { assignTenantUnit, isPending } = useAssignUnit();

  function onSubmit(data) {
    assignTenantUnit(data, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  console.log();

  return (
    <div>
      <form
        id="assignTenantForm"
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="unitId"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Unit
          </label>
          <select
            id="unitId"
            name="unitId"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('unitId')}
          >
            <option value="">Select a Unit</option>
            {allunits?.map(unit => (
              <option key={unit._id} value={unit._id}>
                {unit.number} (Floor {unit.floor}, {unit.unitType})
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="tenantName"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Tenant Name
          </label>
          <input
            type="text"
            id="tenantName"
            name="tenantName"
            defaultValue={tenantName}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="tenantid"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Tenant Id
          </label>
          <input
            type="text"
            id="tenantid"
            name="tenantid"
            defaultValue={tenantId}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('tenantId')}
          />
        </div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Payment
          </label>
          <div className="mt-1 md:w-2/3">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                id="paidRent"
                name="paidRent"
                className="form-checkbox h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                {...register('paidRent')}
              />
              <span className="ml-2 text-gray-700">Paid</span>
            </label>
            <p className="mt-1 text-sm text-gray-500">
              Unchecked = Not paid rent/deposit, Checked = Paid rent/deposit
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => onCloseModal()}
            className="rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-indigo-500 px-4 py-2 text-white transition duration-300 hover:bg-indigo-600"
          >
            Assign Tenant
          </button>
        </div>
      </form>
    </div>
  );
}

export default TenantUnit;
