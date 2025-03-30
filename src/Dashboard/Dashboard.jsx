import {
  BuildingLibraryIcon,
  BuildingStorefrontIcon,
  HomeModernIcon,
  UserGroupIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/16/solid';
import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useUser } from '../features/authentication/useUser';
import DashboardTenant from '../ui/DashboardTenant';
import { useUsers } from '../features/users/useUsers';
import { useAllUnits } from '../features/units/useAllUnits';
import useAllApartments from '../features/apartments/useAllApartments';
import LoaderMini from '../ui/LoaderMini';
import MaintenanceTable from '../components/MaintenanceTable';
import AddUser from '../features/users/AddUser';
import AddApartment from '../features/apartments/AddApartment';
import Breadcrumb from '../components/BreadCrumps';

function Dashboard() {
  const data1 = [
    { name: 'Page A', uv: 20, pv: 2400 },
    { name: 'Page B', uv: 50, pv: 2400 },
    { name: 'Page C', uv: 40, pv: 2400 },
    { name: 'Page D', uv: 200, pv: 2400 },
    { name: 'Page E', uv: 300, pv: 2400 },
    { name: 'Page F', uv: 400, pv: 2400 },
    { name: 'Page G', uv: 350, pv: 2400 },
    { name: 'Page A', uv: 400, pv: 2400 },
    { name: 'Page A', uv: 800, pv: 2400 },
  ];

  const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const { currentUser, isLoading, error } = useUser();

  const { apartments, isLoading: loadingApartments } = useAllApartments();
  const { allunits, isLoading: loadingUnits } = useAllUnits();
  const { allusers, isLoading: loadingUsers } = useUsers();

  const activeTenants = allusers?.filter(
    user => user.role === 'tenant' && user.active === true,
  );
  const vacantUnits = allunits?.filter(unit => unit.vacant === true);

  if (isLoading || loadingApartments || loadingUnits || loadingUsers)
    return <LoaderMini />;

  if (currentUser?.role === 'tenant') {
    return <DashboardTenant />;
  }

  return (
    <div className="space-y-12 text-boxdark">
      {/* /**The breadcrump component */}
      <Breadcrumb />
      <section className="space-y-6 rounded-sm bg-body px-6 py-4">
        <p>
          <span className="text-slate-200">Apartment data overview</span>
        </p>
        <div className="flex flex-wrap gap-4 [&>*]:min-w-30 [&>*]:flex-1 [&>*]:basis-14">
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <BuildingLibraryIcon className="h-14 w-14 fill-meta-5" />
            </span>
            <h1 className="text-lg font-bold">
              {`${apartments?.length}`.padStart(3, '0')}
            </h1>
            <p className="text-base">Apartments</p>
            <span className="text-xs font-medium text-meta-5">
              Total Number
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <BuildingStorefrontIcon className="h-14 w-14 fill-indigo-400" />
            </span>
            <h1 className="text-lg font-bold">
              {`${allunits?.length}`.padStart(3, '0')}
            </h1>
            <p className="text-base">Units</p>
            <span className="text-xs font-medium text-indigo-400">
              Total Number of units
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <BuildingStorefrontIcon className="h-14 w-14 fill-green-300" />
            </span>
            <h1 className="text-lg font-bold">
              {`${allunits?.length - vacantUnits?.length}`.padStart(3, '0')}
            </h1>
            <p className="text-base">Occupied</p>
            <span className="text-xs font-medium text-green-500">
              Units occupied
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <HomeModernIcon className="h-14 w-14 fill-red-400" />
            </span>
            <h1 className="text-lg font-bold">
              {`${vacantUnits?.length}`.padStart(3, '0')}
            </h1>
            <p className="text-base">Vacant</p>
            <span className="text-xs font-medium text-red-400">
              Vacant units
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <UsersIcon className="h-14 w-14 fill-slate-500" />
            </span>
            <h1 className="text-lg font-bold">
              {`${activeTenants?.length}`.padStart(3, '0')}
            </h1>
            <p className="text-base">Tenants</p>

            <span className="text-xs font-medium text-slate-500">
              Number of Tenants
            </span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <UserGroupIcon className="h-14 w-14 fill-slate-500" />
            </span>
            <h1 className="text-lg font-bold">
              {`${allusers?.length}`.padStart(3, '0')}
            </h1>
            <p className="text-base">Users</p>
            <span className="text-xs font-medium text-slate-500">
              System Users
            </span>
          </div>

          <div className="flex flex-col gap-1.5 rounded-md bg-grey-3 px-4 py-2 text-left text-graydark">
            <span>
              <WrenchScrewdriverIcon className="h-14 w-14 fill-meta-5" />
            </span>
            <h1 className="text-lg font-bold">10 </h1>
            <p className="text-base">Maintenance</p>
            <span className="text-xs font-medium text-meta-5">
              Maintenance requests
            </span>
          </div>
        </div>
      </section>
      {/* <section className="rounded-sm bg-body px-6 py-4">
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-orange-200">
            <div className="flex justify-between px-2 py-4.5">
              <p>Apartment Occupancy Rate</p>
              <form>
                <select>
                  <option>Filter by</option>
                  <option>Location</option>
                  <option>Month</option>
                  <option>Type</option>
                </select>
              </form>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%" // Center horizontally
                    cy="50%" // Center vertically
                    innerRadius={60} // Optional: Donut chart effect
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(0)}%)`
                    }
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-red-500 text-slate-100">
            <div className="px-12 py-2">
              <p>Tenants in/out</p>
            </div>
            <div className="h-[90%] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart width={600} height={400} data={data1}>
                  <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section> */}
      <section className="space-y-4 rounded-sm bg-body px-6 py-4">
        <h3 className="text-xl font-medium text-slate-100">
          Maintenance requests
        </h3>
        <div className="overflow-x-auto rounded-sm bg-white">
          <MaintenanceTable />
        </div>
      </section>
      {/* <section className="space-y-4 rounded-sm bg-body px-6 py-4">
        <div className="grid grid-cols-2 gap-12">
          <div className="space-y-6 rounded-sm bg-whiten px-4.5 py-8">
            <h3>Yearly Quick Reports</h3>

            <form className="flex flex-wrap justify-between">
              <div className="relative w-64">
                <div className="group">
                  <select className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 focus:outline-none">
                    <option value="" disabled selected>
                      Select an Apartment
                    </option>
                    <option value="1">Apartment 1</option>
                    <option value="2">Apartment 2</option>
                    <option value="3">Apartment 3</option>
                    <option value="4">Apartment 4</option>
                    <option value="5">Apartment 5</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 transition-colors duration-200 group-hover:text-gray-700">
                    <svg
                      className="h-5 w-5 transform fill-current transition-transform duration-300 group-hover:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="relative w-64">
                <div className="group">
                  <select className="w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-400 focus:outline-none">
                    <option value="" disabled selected>
                      Select an year
                    </option>
                    <option value="1">2025</option>
                    <option value="2">2024</option>
                    <option value="3">2023</option>
                    <option value="4">2022</option>
                    <option value="5">2021</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 transition-colors duration-200 group-hover:text-gray-700">
                    <svg
                      className="h-5 w-5 transform fill-current transition-transform duration-300 group-hover:-rotate-180"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </form>
            <div>
              <p>
                <span>Total Revenue : </span>
                <span>2.5 Million</span>
              </p>
            </div>
          </div>
          <div className="space-y-4 rounded-sm bg-whiten px-4 py-6">
            <p>Quick actions</p>

            <div className="space-y-2">
              <AddUser type={'Tenant'} />
              <AddApartment type={'New apartment'} />
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Dashboard;
