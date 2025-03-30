import { useForm } from 'react-hook-form';

import Button from '../ui/Button';
import { useChangeUser } from '../features/users/useUpdateUser';

const roles = ['manager', 'admin', 'tenant', 'caretaker'];

function EditUserForm({ onCloseModal, user }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { updateuser, isPending, error } = useChangeUser();

  function onSubmit(data) {
    const finalData = { ...data, userId: user._id };
    updateuser(finalData, {
      onSuccess: () => {
        onCloseModal();
      },
    });
  }

  return (
    <div>
      <form
        id="userForm"
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={user?.firstName}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('firstName', {
              required: {
                value: true,
                message: 'A user must have a username!',
              },
            })}
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={user?.lastName}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('lastName', {
              required: {
                value: true,
                message: 'A user must have a username!',
              },
            })}
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user?.email}
            placeholder="user@gmail.com"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('email', {
              required: {
                value: true,
                message: 'A user must have a username!',
              },
            })}
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            defaultValue={user?.phoneNumber}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            required
            pattern="\d{10}"
            placeholder="e.g., 0712345678"
            {...register('phoneNumber', {
              required: {
                value: true,
                message: 'A user must have a valid phonenumber!',
              },
            })}
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="role"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            defaultValue={user?.role}
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            {...register('role', {
              required: {
                value: true,
                message: 'A user must have a role',
              },
            })}
          >
            <option value="">Select Role</option>
            {roles.map(role => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <Button
            btnText={'Cancel'}
            type={'cancelBtn'}
            onClick={() => onCloseModal()}
          />
          <Button btnText={'Save User'} type={'saveBtn'} />
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;
