import { useForm } from 'react-hook-form';
import { useNewPassword } from '../features/authentication/useUpdatePassword';
import toast from 'react-hot-toast';

function UpdatePasswordForm({ currentUser }) {
  const { register, handleSubmit, reset } = useForm();

  /**Changing password */
  const { changepassword } = useNewPassword();

  function onSubmit(data) {
    const finalData = { ...data, userId: currentUser._id };

    changepassword(finalData, {
      onSuccess: () => {
        toast.success('Successfully updated your password.');
        reset();
      },
    });
  }
  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="currentPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register('passwordCur')}
          />
        </div>
        <div>
          <label
            htmlFor="newPassword"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter your new password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register('newPassword')}
          />
        </div>
        <div>
          <label
            htmlFor="confirmNewPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Re-type New Password
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            placeholder="Re-type the new password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register('passwordConfirm')}
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
