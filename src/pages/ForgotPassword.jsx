import { Link } from 'react-router-dom';
import { useForgotPassword } from '../features/authentication/usForgotPassword';
import { useForm } from 'react-hook-form';
import Button from '../ui/Button';

function ForgotPassword() {
  const { register, handleSubmit, reset } = useForm();

  const { resetpass, isPending, isSuccess, error } = useForgotPassword();

  function onSubmit(data) {
    resetpass(data);
    console.log(data);
  }

  return (
    <div className="login-page flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
          Forgot your password?
        </h2>
        <p className="mb-4 text-slate-900">Please enter your email below</p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-slate-800 outline-none transition-all invalid:text-red-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 invalid:focus:border-red-600 invalid:focus:ring-red-600"
              placeholder="your@email.com"
              {...register('email')}
            />
          </div>

          <Button isPending={isPending} btnText={'Reset'} type={'authBtn'} />
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
