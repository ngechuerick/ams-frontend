import AddUnit from '../../features/units/AddUnit';

import { useDeleteUnit } from '../../features/units/useDeleteUnit';
import { useAllUnits } from '../../features/units/useAllUnits';
import LoaderMini from '../../ui/LoaderMini';
import EditUnit from '../../features/units/editUnit';
import Breadcrumb from '../../components/BreadCrumps';

function Units() {
  /**Fetching all units */
  const { allunits, isLoading } = useAllUnits();

  /**Deleting a unit BUG:FIXME:THIS WILL BE FIXED DURING REFACTORING*/
  const { deleteunit, isPending } = useDeleteUnit();

  if (isLoading) return <LoaderMini />;

  if (allunits?.length === 0)
    return (
      <div>
        <p className="mb-4">There are no units kindly add one.</p>
        <AddUnit />
      </div>
    );
  return (
    <div>
      <Breadcrumb />

      <div className="mb-4 flex justify-between py-2">
        <AddUnit />
      </div>

      <div>
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Search units..."
            // value={searchTerm}
            // onChange={e => setSearchTerm(e.target.value)}
            className="w-full max-w-md rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div> */}

        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100">
                  Apartment
                </th>
                <th className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100">
                  Description
                </th>
                <th className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100">
                  Unit Type
                </th>
                <th className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100">
                  Floor
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Unit
                </th>
                <th className="cursor-pointer border-b px-4 py-3 text-left text-sm font-semibold text-gray-600 hover:bg-gray-100">
                  Status
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allunits?.map(unit => (
                <tr
                  key={unit._id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="border-b px-4 py-3 text-gray-700">
                    {unit.apartmentUnit}
                  </td>
                  <td className="border-b px-4 py-3 text-gray-700">
                    {unit.description}
                  </td>

                  <td className="border-b px-4 py-3 text-gray-700">
                    {unit.unitType}
                  </td>
                  <td className="border-b px-4 py-3 text-gray-700">
                    {unit.floor}
                  </td>
                  <td className="border-b px-4 py-3 text-gray-700">
                    {unit.unitNum}
                  </td>
                  <td className="border-b px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        unit.vacant
                          ? 'bg-red-100 text-red-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {unit.vacant ? 'Vacant' : 'Occupied'}
                    </span>
                  </td>
                  <td className="border-b">
                    <div className="flex space-x-2">
                      <EditUnit unitData={unit} />

                      <button
                        onClick={() => deleteunit(unit._id)}
                        disabled={isPending}
                        className="rounded bg-red-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          {/* {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              // onClick={() => setCurrentPage(i + 1)}
              // className={`rounded px-3 py-1 ${
              //   // // currentPage === i + 1
              //   //   ? 'bg-indigo-500 text-white'
              //   //   : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              // } transition duration-200`}
            >
              {i + 1}
            </button>
          ))} */}
        </div>
      </div>
    </div>
  );
}

export default Units;
