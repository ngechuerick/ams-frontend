import { useForm } from 'react-hook-form';
import { useVerifyCode } from '../features/authentication/useVerify';
import Button from '../ui/Button';

function Verification() {
  const { register, handleSubmit, reset } = useForm();

  const { verify, isPending, isSuccess, error } = useVerifyCode();

  function onSubmit(data) {
    const codes = Object.values(data).join('');

    verify(codes);
  }
  return (
    <div className="login-page flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-semibold text-gray-900">
          Verification Code
        </h2>
        <p className="mb-6 text-center text-gray-500">
          We have sent you a code if account exists
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="mb-6 flex justify-center space-x-2 text-slate-950">
              <input
                type="text"
                id="code1"
                maxLength="1"
                className="h-12 w-12 rounded border border-gray-300 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                {...register('code1')}
              />
              <input
                type="text"
                id="code2"
                maxLength="1"
                className="h-12 w-12 rounded border border-gray-300 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                {...register('code2')}
              />
              <input
                type="text"
                id="code3"
                maxLength="1"
                className="h-12 w-12 rounded border border-gray-300 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                {...register('code3')}
              />
              <input
                type="text"
                id="code4"
                maxLength="1"
                className="h-12 w-12 rounded border border-gray-300 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                {...register('code4')}
              />
              <input
                type="text"
                id="code5"
                maxLength="1"
                className="h-12 w-12 rounded border border-gray-300 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                {...register('code5')}
              />
              <input
                type="text"
                id="code6"
                maxLength="1"
                className="h-12 w-12 rounded border border-gray-300 text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
                {...register('code6')}
              />
            </div>
          </div>

          <Button isPending={isPending} btnText={'Verify'} type={'authBtn'} />
        </form>
      </div>
    </div>
  );
}

export default Verification;
