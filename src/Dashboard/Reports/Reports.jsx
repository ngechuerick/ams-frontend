// import React, { useState, useEffect } from 'react';

// function Reports() {
//   const [reports, setReports] = useState({
//     occupancy: { totalUnits: 0, occupiedUnits: 0, rate: 0 },
//     maintenance: { pending: 0, completed: 0, overdue: 0 },
//     payments: { paid: 0, overdue: 0, partial: 0 },
//   });
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   // Fetch reports data (mock or replace with your API call)
//   const fetchReports = async () => {
//     try {
//       const query =
//         startDate && endDate
//           ? `?startDate=${startDate}&endDate=${endDate}`
//           : '';
//       const response = await fetch(`/reports${query}`);
//       const data = await response.json();
//       setReports(data);
//     } catch (error) {
//       console.error('Error fetching reports:', error);
//     }
//   };

//   const handleGenerate = () => {
//     fetchReports();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="mb-6 text-3xl font-bold text-gray-800">Reports</h1>

//       {/* Date Filter */}
//       <div className="mb-6 flex flex-col gap-4 sm:flex-row">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Start Date
//           </label>
//           <input
//             type="date"
//             value={startDate}
//             onChange={e => setStartDate(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             End Date
//           </label>
//           <input
//             type="date"
//             value={endDate}
//             onChange={e => setEndDate(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//           />
//         </div>
//         <button
//           onClick={handleGenerate}
//           className="mt-6 rounded-md bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700 sm:mt-0 sm:self-end"
//         >
//           Generate Reports
//         </button>
//       </div>

//       {/* Reports Sections */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//         {/* Occupancy Report */}
//         <div className="rounded-lg bg-white p-6 shadow-md">
//           <h2 className="mb-4 text-xl font-semibold text-gray-800">
//             Occupancy Report
//           </h2>
//           <p className="text-gray-600">
//             Total Units:{' '}
//             <span className="font-medium">{reports.occupancy.totalUnits}</span>
//           </p>
//           <p className="text-gray-600">
//             Occupied Units:{' '}
//             <span className="font-medium">
//               {reports.occupancy.occupiedUnits}
//             </span>
//           </p>
//           <p className="text-gray-600">
//             Occupancy Rate:{' '}
//             <span className="font-medium">{reports.occupancy.rate}%</span>
//           </p>
//         </div>

//         {/* Maintenance Report */}
//         <div className="rounded-lg bg-white p-6 shadow-md">
//           <h2 className="mb-4 text-xl font-semibold text-gray-800">
//             Maintenance Report
//           </h2>
//           <p className="text-gray-600">
//             Pending:{' '}
//             <span className="font-medium">{reports.maintenance.pending}</span>
//           </p>
//           <p className="text-gray-600">
//             Completed:{' '}
//             <span className="font-medium">{reports.maintenance.completed}</span>
//           </p>
//           <p className="text-gray-600">
//             Overdue:{' '}
//             <span className="font-medium">{reports.maintenance.overdue}</span>
//           </p>
//         </div>

//         {/* Payment Report */}
//         <div className="rounded-lg bg-white p-6 shadow-md">
//           <h2 className="mb-4 text-xl font-semibold text-gray-800">
//             Payment Report
//           </h2>
//           <p className="text-gray-600">
//             Paid: <span className="font-medium">{reports.payments.paid}</span>
//           </p>
//           <p className="text-gray-600">
//             Overdue:{' '}
//             <span className="font-medium">{reports.payments.overdue}</span>
//           </p>
//           <p className="text-gray-600">
//             Partial:{' '}
//             <span className="font-medium">{reports.payments.partial}</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Reports;

import React, { useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAllMaintenances } from '../../features/maintenances/useAllMaintenances';
import LoaderMini from '../../ui/LoaderMini';
import { useAllUnits } from '../../features/units/useAllUnits';
import { useUsers } from '../../features/users/useUsers';
import useMonthlyPaymentStats from '../../features/payments/useMonthlyStats';
import useYearlyPaymentStats from '../../features/payments/useYearlyPayments';
import { useEffect } from 'react';
import localeCurrency from '../../utils/currencyLocale';
import { useGetAllReports } from '../../features/payments/useGetReport';
import Button from '../../ui/Button';
import Breadcrumb from '../../components/BreadCrumps';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);
function Reports() {
  // const [paymentTrends] = useState({
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  //   datasets: [
  //     {
  //       label: 'On-Time Payments',
  //       data: [90, 88, 92, 85, 87, 89, 91],
  //       borderColor: 'rgba(75, 192, 192, 1)',
  //       fill: false,
  //     },
  //     {
  //       label: 'Delayed Payments',
  //       data: [10, 12, 8, 15, 13, 11, 9],
  //       borderColor: 'rgba(255, 99, 132, 1)',
  //       fill: false,
  //     },
  //   ],
  // });

  const [expenses] = useState({
    maintenance: 5000,
    utilities: 3000,
    other: 2000,
  });

  const [reportType, setReportType] = useState('');

  /**We want to fetch All reports */
  const { reportdata, isPending: fetchingReports } = useGetAllReports();

  function handleReportsGeneration(reportType) {
    setReportType(reportType);
    reportdata(reportType, {
      onSuccess: response => {
        console.log(response);

        /** Create a URL for the file and trigger download*/
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
          'download',
          `${reportType.charAt(0).toUpperCase() + reportType.slice(1)}_Report.pdf`,
        );
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      },
      onError: err => {
        console.log(err);
      },
    });
  }

  /**Fetching Yearly payments stats */
  const { yearlypayments, isLoading: fetchingYearlyStats } =
    useYearlyPaymentStats();

  /**Fetching monthly payment stats */
  const { monthlystats, isLoading: fetchingPaymentStats } =
    useMonthlyPaymentStats();

  /**MONTHLY PAYMENT */
  let paymentsArr = [];

  /**Fetching tenants */
  const { allusers, isLoading: fetchingTenants } = useUsers({
    role: 'tenant',
    active: 'true',
  });

  /**Fetching all units */
  const { allunits, isLoading: fetchingUnits } = useAllUnits();

  /**Fetching all maintenances */
  const {
    allmaintenances,
    isLoading: fetchingMaintenances,
    error,
    isError,
  } = useAllMaintenances();

  /**MONTHLY STATS FOR RENT PAYMENT */
  const [revenueData, setRevenueData] = useState({
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ],
    datasets: [
      {
        label: 'Total Rent Collected (in Ksh)',
        data: paymentsArr,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  /**UNITS */
  let occupiedUnits = [];
  let vacantUnits = [];

  const [occupancyData, setOccupancyData] = useState({
    labels: ['Occupied', 'Vacant'],
    datasets: [
      {
        label: 'Units',
        data: [occupiedUnits?.length, vacantUnits?.length],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  });

  // Update chart data when fetched data changes
  useEffect(() => {
    if (monthlystats) {
      const paymentsArr = monthlystats.map(
        payment => payment.totalRentCollected || 0,
      );
      setRevenueData(prev => ({
        ...prev,
        datasets: [{ ...prev.datasets[0], data: paymentsArr }],
      }));
    }
  }, [monthlystats]);

  /**Same case applies here */
  useEffect(() => {
    if (allunits) {
      const occupied = allunits.filter(unit => !unit.vacant).length;
      const vacant = allunits.filter(unit => unit.vacant).length;
      setOccupancyData(prev => ({
        ...prev,
        datasets: [{ ...prev.datasets[0], data: [occupied, vacant] }],
      }));
    }
  }, [allunits]);

  if (
    fetchingMaintenances ||
    fetchingUnits ||
    fetchingTenants ||
    fetchingPaymentStats ||
    fetchingYearlyStats
  )
    return <LoaderMini />;

  /**MONTHLY PAYMENT */
  paymentsArr = monthlystats?.map(payment => payment.totalRentCollected);

  /**UNITS */
  occupiedUnits = allunits.slice().filter(unit => unit.vacant === false);
  vacantUnits = allunits.slice().filter(unit => unit.vacant === true);

  /**TENANTS NOT PAID RENT */
  const leaseExpiredTenants = allusers
    .slice()
    .filter(user => user.paidRent === false);

  /**Calculating overdue will be tenants who have not */

  /**Calculating the pending payments */
  const pendingPayments = leaseExpiredTenants.length * 5500;

  /**MAINTENANCES */
  const openRequests = allmaintenances
    .slice()
    .filter(request => request.status === 'new');
  const progressRequests = allmaintenances
    .slice()
    .filter(request => request.status === 'fixing');
  const resolvedRequests = allmaintenances
    .slice()
    .filter(request => request.status === 'fixed');

  return (
    <div className="min-h-screen p-8">
      <Breadcrumb />

      <h1 className="mb-8 text-3xl font-bold">
        Apartment Management Analytics
      </h1>

      {/* Revenue Overview */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Revenue Overview</h2>
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">
              Total Rent Collected ({new Date().getFullYear()})
            </h3>
            <p className="text-2xl">
              Ksh {localeCurrency(yearlypayments[0]?.totalRentCollected)}
            </p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Pending Payments</h3>
            <p className="text-2xl">Ksh {localeCurrency(pendingPayments)}</p>
          </div>
          {/* <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Overdue Amounts</h3>
            <p className="text-2xl">$2,000</p>
          </div> */}
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-4 text-lg font-semibold">Monthly Revenue Trends</h3>
          <Bar data={revenueData} />
        </div>
      </div>

      {/* Occupancy Analysis */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Occupancy Analysis</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-lg font-semibold">Occupancy Rate</h3>
            <Bar data={occupancyData} />
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Lease Expirations</h3>
            <p className="text-xl">
              {leaseExpiredTenants.length} Tenants from &nbsp;
              {leaseExpiredTenants.length} units need to pay rent.
            </p>
          </div>
        </div>
      </div>

      {/* Tenant Payment Trends */}
      {/* <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Tenant Payment Trends</h2>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <Line data={paymentTrends} />
        </div>
      </div> */}

      {/* Maintenance Requests Summary */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Maintenance Requests</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Open Requests</h3>
            <p className="text-2xl">{openRequests?.length}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">In Progress</h3>
            <p className="text-2xl">{progressRequests?.length}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Resolved</h3>
            <p className="text-2xl">{resolvedRequests?.length}</p>
          </div>
        </div>
      </div>

      {/* Expense Tracking */}
      {/* <div className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Expense Tracking</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Maintenance Costs</h3>
            <p className="text-2xl">${expenses.maintenance}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Utilities</h3>
            <p className="text-2xl">${expenses.utilities}</p>
          </div>
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-lg font-semibold">Other Expenses</h3>
            <p className="text-2xl">${expenses.other}</p>
          </div>
        </div>
      </div> */}

      {/* Reports Section */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Reports</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* <button className="rounded-lg bg-blue-500 p-4 text-white shadow-md hover:bg-blue-600">
            Generate Financial Report
          </button> */}
          <button
            onClick={() => handleReportsGeneration('lease')}
            className="rounded-lg bg-blue-500 p-4 text-white shadow-md hover:bg-blue-600"
          >
            {reportType === 'lease' && fetchingReports ? (
              <p className="animate-pulse">Generating...</p>
            ) : (
              <p> Generate Lease Report</p>
            )}
          </button>

          <button
            onClick={() => handleReportsGeneration('payments')}
            className="rounded-lg bg-blue-500 p-4 text-white shadow-md hover:bg-blue-600"
          >
            {reportType === 'payments' && fetchingReports ? (
              <p className="animate-pulse">Generating...</p>
            ) : (
              <p> Generate Payment History Report</p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reports;
