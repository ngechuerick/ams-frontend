import { useForm } from 'react-hook-form';
import { useSendCommunication } from '../features/communication/useSendCommunication';
import PulseLoader from 'react-spinners/PulseLoader';

function CommunicationForm({
  allusers,
  handleTenantToggle,
  sendToAll,
  method,
  setSendToAll,
  selectedTenants,
  setMethod,
  setSelectedTenants,
}) {
  const { register, handleSubmit, reset } = useForm();

  const { sendcommunication, isPending, error } = useSendCommunication();

  function onSubmit(data) {
    if (sendToAll) {
      const usersEmail = allusers.map(user => user.email);

      const finalData = { ...data, tenantemail: usersEmail };
      sendcommunication(finalData, {
        onSuccess: () => {
          reset();
          //   location.reload();
        },
      });
    } else {
      const finalData = { ...data, commMethod: method };
      sendcommunication(finalData, {
        onSuccess: () => {
          reset();
          //   location.reload();
        },
      });
    }
  }
  return (
    <div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* Tenant Selection */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">
            Select Recipients
          </h2>

          {/* Bulk Toggle */}
          <label className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              checked={sendToAll}
              onChange={e => {
                setSendToAll(e.target.checked);
                if (e.target.checked) setSelectedTenants([]);
              }}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <span className="font-medium text-gray-700">
              Send to All Tenants
            </span>
          </label>

          {/* Tenant List (disabled when Send to All is checked) */}
          {!sendToAll && (
            <div className="max-h-64 space-y-2 overflow-y-auto">
              {allusers.length === 0 ? (
                <p className="text-gray-600">No tenants available.</p>
              ) : (
                allusers.map(tenant => (
                  <label
                    key={tenant._id}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      // checked={selectedTenants.includes(tenant._id)}
                      defaultValue={tenant.email}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                      disabled={sendToAll}
                      {...register('tenantemail')}
                    />
                    <span className="text-gray-700">
                      {tenant.firstName} {tenant.lastName} (Unit
                      {tenant.unit?.unitNum})
                    </span>
                  </label>
                ))
              )}
            </div>
          )}
        </div>
        {/* Communication Method */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Method</h2>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="email"
                checked={method === 'email'}
                onChange={e => setMethod(e.target.value)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700">Email</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="text"
                checked={method === 'text'}
                onChange={e => setMethod(e.target.value)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-700">Text</span>
            </label>
          </div>
        </div>
        {/* Subject (Email Only) */}
        {method === 'email' && (
          <div className="rounded-lg bg-white p-6 shadow-md">
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter email subject"
              {...register('subject')}
            />
          </div>
        )}
        {/* Message */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <label className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows="4"
            placeholder="Enter your message here"
            {...register('message')}
          />
        </div>
        {/* Submit Button & Status */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
          >
            {isPending ? (
              <PulseLoader
                color={'#ffff'}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : sendToAll ? (
              'Send to All'
            ) : (
              'Send Communication'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CommunicationForm;
