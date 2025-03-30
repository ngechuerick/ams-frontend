import { useForm } from 'react-hook-form';
import { useUser } from '../../features/authentication/useUser';
import { useChangeUser } from '../../features/users/useUpdateUser';

import UpdatePasswordForm from '../../components/UpdatePasswordForm';
import Breadcrumb from '../../components/BreadCrumps';

function Profile() {
  const { currentUser, isLoading, error } = useUser();
  const { register, handleSubmit, reset } = useForm();

  const { updateuser, isPending } = useChangeUser();

  function onsubmitData(data) {
    const finalData = { ...data, userId: currentUser._id };
    updateuser(finalData, {
      onSuccess: () => {
        reset();
      },
    });
  }

  return (
    <div>
      <div className="min-h-screen bg-blue-50 p-6">
        <Breadcrumb />
        <p className="mb-6 text-gray-500">
          Welcome <b>{currentUser.firstName}</b> , Edit/Update your details
          here.
        </p>

        <div className="flex flex-col gap-6 rounded-lg p-2 lg:flex-row">
          <div className="flex-1 bg-white p-4.5 shadow-md">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Account Information
            </h2>
            <p className="mb-4 text-gray-500">Edit your profile Here</p>
            <form className="space-y-4" onSubmit={handleSubmit(onsubmitData)}>
              <div className="flex items-center">
                <div className="relative">
                  {currentUser.photo ? (
                    <img
                      src={`https://ams-omega-lilac.vercel.app/public/img/users/${currentUser.photo}`}
                      alt="Profile"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                      <span className="text-2xl">👤</span>
                    </div>
                  )}
                  <label
                    htmlFor="photo"
                    className="absolute bottom-0 right-0 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-white"
                  >
                    ✎
                  </label>
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    {...register('photo')}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  defaultValue={currentUser.firstName}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  {...register('firstName')}
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  defaultValue={currentUser.lastName}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  {...register('lastName')}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={currentUser.email}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  {...register('email')}
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={currentUser.phoneNumber}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  {...register('phoneNumber')}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Update Now
                </button>
              </div>
            </form>
          </div>

          <div className="flex-1 bg-white p-4.5 shadow-md">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Change Password
            </h2>

            <UpdatePasswordForm currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
