import { useForm } from 'react-hook-form';
import { useNewUser } from '../features/users/useNewUser';
import Button from '../ui/Button';

const roles = ['manager', 'admin', 'tenant', 'caretaker'];
const genders = ['Male', 'Female'];

function UserForm({ onCloseModal }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { newUser, isPending } = useNewUser();

  function onSubmit(data) {
    newUser(data, {
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
            placeholder="First name"
            className="y w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black shadow-inner outline-none transition focus:border-primary invalid:focus:border-red-600 invalid:focus:ring-red-600 active:border-primary disabled:cursor-default disabled:bg-whiter"
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
            placeholder="Last name"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black shadow-inner outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
            placeholder="eg user@gmail.com"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black shadow-inner outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value="testuser1234"
            placeholder="Disabled label"
            disabled={true}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black shadow-inner outline-none transition disabled:cursor-default disabled:bg-whiter"
            {...register('password')}
          />
        </div>
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Password Confirm
          </label>

          <input
            type="password"
            id="password"
            name="password"
            value="testuser1234"
            placeholder="Disabled label"
            disabled={true}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black shadow-inner outline-none transition disabled:cursor-default disabled:bg-whiter"
            {...register('passwordConfirm')}
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
            pattern="\d{10}"
            placeholder="e.g., 0712345678"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black shadow-inner outline-none transition disabled:cursor-default disabled:bg-whiter"
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
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black shadow-inner outline-none transition disabled:cursor-default disabled:bg-white"
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
            onClick={() => onCloseModal()}
            btnText={'Cancel'}
            type={'cancelBtn'}
          />
          <Button
            isPending={isPending}
            btnText={'Save User'}
            type={'saveBtn'}
          />
        </div>
      </form>
    </div>
  );
}

export default UserForm;
