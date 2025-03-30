import PulseLoader from 'react-spinners/PulseLoader';

const tailwindStyles = {
  editBtn:
    'rounded bg-yellow-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-yellow-600',
  sendBtn:
    'rounded-md bg-indigo-600 px-6 py-2 text-white transition hover:bg-indigo-700',
  cancelBtn:
    'rounded bg-gray-500 px-4 py-2 text-white transition duration-300 hover:bg-gray-600',
  deleteBtn:
    'inline-block rounded bg-red-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-red-600 disabled:bg-slate-800 disabled:text-slate-800',
  addItemBtn: '',
  viewItemBtn: '',
  reportBtn:
    'rounded-lg bg-blue-500 p-4 text-white shadow-md hover:bg-blue-600"',
  saveBtn:
    'rounded bg-indigo-500 px-4 py-2 text-white transition duration-300 hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-100',
  authBtn:
    'w-full rounded-lg bg-indigo-600 py-2.5 font-medium text-white transition-colors hover:bg-indigo-700 disabled:bg-indigo-500',
};

function Button({ isPending, btnText, type, onClick }) {
  return (
    <button
      disabled={isPending}
      onClick={onClick}
      className={tailwindStyles[type]}
    >
      {isPending ? (
        <PulseLoader
          color={'#ffff'}
          size={10}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <span> {btnText}</span>
      )}
    </button>
  );
}

export default Button;
