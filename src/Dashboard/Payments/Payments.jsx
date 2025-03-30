import { NavLink } from 'react-router-dom';
import PaymentForm from '../../components/PaymentForm';
import { useUser } from '../../features/authentication/useUser';
import { useAllPayments } from '../../features/payments/useAllPayments';
import LoaderMini from '../../ui/LoaderMini';
import { monthNames } from '../../utils/dateLocaleConverter';
import localeCurrency from '../../utils/currencyLocale';
import Breadcrumb from '../../components/BreadCrumps';

function Payments() {
  const { currentUser, isLoading } = useUser();

  const {
    allpayments,
    isLoading: fetchingPayments,
    isError,
    error,
  } = useAllPayments();

  if (isLoading || fetchingPayments) return <LoaderMini />;

  if (currentUser?.role === 'tenant') {
    return (
      <div>
        <PaymentForm curTenant={currentUser} />

        {/* Payments Section */}
        <div className="mb-6 rounded-lg bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-xl font-semibold text-gray-800">
            Payment History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3">Month</th>
                  <th className="p-3">Amount (KES)</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date Paid</th>
                </tr>
              </thead>
              <tbody>
                {currentUser?.payments.length > 0 ? (
                  currentUser?.payments?.map(payment => (
                    <tr
                      key={payment._id}
                      className="border-b transition-colors duration-200 hover:bg-gray-50"
                    >
                      <td className="p-3">{`${monthNames[new Date(payment.createdAt).getUTCMonth()]}`}</td>
                      <td className="p-3">
                        {localeCurrency(payment?.amountPaid)}
                      </td>
                      <td className="p-3">
                        <span
                          className={`rounded px-2 py-1 text-sm ${
                            user?.paidRent
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {user?.paidRent ? 'Paid' : 'updaid'}
                        </span>
                      </td>
                      <td className="p-3">
                        {new Date(payment?.createdAt)?.toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <p className="p-2 py-2">You have no payment history</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="mx-auto">
          <Breadcrumb />

          {/* <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex flex-col gap-4 md:flex-row">
              <input
                type="text"
                placeholder="Search tenants..."
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-1/3"
              />
              <select className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none md:w-1/4">
                <option value="">Filter by Month</option>
                <option value="jan">January</option>
                <option value="feb">February</option>
                <option value="mar">March</option>
              </select>
              <select className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none md:w-1/4">
                <option value="">Filter by Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div> */}

          <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Tenant Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Apartment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Room #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Amount (KES)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allpayments?.map(payment => (
                    <tr key={payment._id}>
                      <td className="whitespace-nowrap px-6 py-4">{` ${payment?.tenant?.firstName || ''}`}</td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {payment.tenant?.unit?.apartmentUnit}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {payment.tenant?.unit?.unitNum}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        Ksh {localeCurrency(payment?.amountPaid)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {`${monthNames[new Date(payment.createdAt).getUTCMonth()]} ${new Date(payment.createdAt).getUTCFullYear()}`}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
                          {payment.tenant?.paidRent ? 'Paid' : 'Due'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        03/01/2025
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <NavLink
                          to={`/users/${payment?.tenant?._id}`}
                          className="rounded bg-indigo-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-indigo-600"
                        >
                          View
                        </NavLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h3 className="text-sm font-medium text-gray-500">Total Due</h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                $1,750.00
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Paid This Month
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                $850.00
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-md">
              <h3 className="text-sm font-medium text-gray-500">
                Overdue Payments
              </h3>
              <p className="mt-1 text-2xl font-semibold text-gray-900">1</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payments;
