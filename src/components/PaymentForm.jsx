import { useForm } from 'react-hook-form';
// import { useConfirmPaid } from '../features/payments/useconfirmPaid';
import { usePayrent } from '../features/payments/usePayrent';
import { useState } from 'react';
import { monthNames } from '../utils/dateLocaleConverter';

function PaymentForm({ curTenant }) {
  const { register, handleSubmit, reset } = useForm();
  const { payrent, isPending } = usePayrent();
  // const { confirmPay, isPending: pendingConfirm } = useConfirmPaid();

  const [hideForm, setHideForm] = useState(false);

  function onSubmit(data) {
    if (data.tel === '' || data.amount === '') return;

    const finalData = { ...data, tenantId: curTenant._id };

    payrent(finalData, {
      onSuccess: () => {
        setHideForm(true);
        reset({ tel: '', amount: '' });
      },
      onError: () => {
        /**Reset all input values when there is an error */
        reset({ tel: '', amount: '' });
      },
    });
  }

  function dueStr() {
    const date = new Date();
    const curMonth = date.getMonth() + 1;
    const curYear = date.getFullYear();

    return `${monthNames[curMonth]} ${curYear}`;
  }

  dueStr();

  return (
    <div>
      <div className="mx-auto max-w-4xl space-y-6 p-6">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Payment Details</h2>
          <div className="space-y-2">
            <p>
              <span className="text-gray-400">Rent : </span>
              <span className="font-semibold text-yellow-600">KES 5,000</span>
            </p>
            <p>
              <span className="text-gray-400">Due by:</span>
              <span className="font-semibold">
                &nbsp; 5<sup>th</sup> {dueStr()}
              </span>
            </p>
            <p>
              <span className="text-gray-400">Status : </span>
              <span
                className={`font-semibold ${
                  curTenant.paidRent ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {curTenant.paidRent ? 'paid' : 'Not paid'}
              </span>
            </p>
            <p>
              <span className="text-gray-400">Apartment : </span>
              <span className="font-semibold">
                {curTenant.unit.apartmentUnit}
              </span>
            </p>
            <p>
              <span className="text-gray-400">Unit : </span>
              <span className="font-semibold">{curTenant.unit.unitNum}</span>
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">Payment Method</h2>

          <div className="cursor-pointer rounded-md bg-green-500 p-4 transition hover:bg-green-600">
            <h3 className="text-lg font-semibold text-slate-200">
              Pay via M-Pesa
            </h3>
            <p className="text-sm text-slate-100">
              Secure and fast payment with M-Pesa.
            </p>
          </div>

          <div className="mt-4 rounded-md bg-gray-700 p-4">
            <h3 className="text-md font-semibold text-slate-300">
              M-Pesa Payment Instructions:
            </h3>
            <ul className="mt-2 list-inside list-decimal space-y-1 text-sm text-gray-300">
              <li>Go to M-Pesa on your phone.</li>
              <li>Select &ldquo; Lipa na M-Pesa &rdquo;.</li>
              <li>Buy good and services</li>
              <li>
                Enter Till Number:
                <span className="text-yellow-400">174379</span>
              </li>
              <li>
                Enter :<span className="text-yellow-400">KES 5,000</span>
              </li>
              <li>Confirm and Complete Payment.</li>
            </ul>
          </div>
        </div>

        {!hideForm && (
          <div className="w-full rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Pay with Mpesa push</h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex space-x-2">
                <input
                  type="tel"
                  id="tel"
                  pattern="[0-9]*"
                  className="block w-full appearance-none rounded-r border border-gray-200 bg-gray-200 px-6 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  placeholder="Enter phone number eg 0700000000/2547000000"
                  {...register('tel')}
                />
              </div>
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="number"
                    id="amount"
                    // min="100"
                    className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-6 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                    placeholder="Enter amount"
                    {...register('amount')}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="focus:shadow-outline mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >
                Pay now
              </button>
            </form>
          </div>
        )}

        {/* <div className="rounded-lg bg-white p-6 text-center shadow-md">
          <button
            type="submit"
            onClick={confirmPay}
            className="focus:shadow-outline mt-4 w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Confirm Paid
          </button>
        </div> */}

        {hideForm && (
          <div className="rounded-lg bg-white p-6 text-center shadow-md">
            <h2 className="text-xl font-semibold text-green-400">
              ✅ Payment Successful!
            </h2>
            <p className="text-gray-300">Thank you for your payment.</p>
            <div className="mt-4 space-y-1 text-sm text-gray-400">
              <p>
                Transaction ID: <span className="font-semibold">123456XYZ</span>
              </p>
              <p>
                Paid: <span className="font-semibold">KES 25,000</span>
              </p>
              <p>
                Date: <span className="font-semibold">1st November 2023</span>
              </p>
            </div>

            {/* <button className="mt-4 rounded-md bg-blue-500 px-6 py-2 font-semibold transition hover:bg-blue-600">
            📄 Download Invoice
          </button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentForm;
