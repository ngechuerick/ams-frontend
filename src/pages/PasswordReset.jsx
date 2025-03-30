import { useForm } from 'react-hook-form';
import { useResetPassword } from '../features/authentication/useResetPassword';
import Button from '../ui/Button';

function PasswordReset() {
  const { register, reset, handleSubmit } = useForm();
  const { updatepassword, isPending, isSuccess, error } = useResetPassword();

  function onSubmit(data) {
    console.log(data);
    updatepassword(data);
  }
  return (
    <div className="login-page flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Update password
        </h2>
        <p className="mb-4 text-slate-900">Please enter your new password</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 invalid:focus:border-red-600 invalid:focus:ring-red-600"
              placeholder="••••••••"
              {...register('password')}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password Confirm
            </label>
            <input
              type="password"
              id="passwordConfirm"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-slate-800 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 invalid:focus:border-red-600 invalid:focus:ring-red-600"
              placeholder="••••••••"
              {...register('passwordConfirm')}
            />
          </div>

          <Button isPending={isPending} btnText={'Update'} type={'authBtn'} />
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
