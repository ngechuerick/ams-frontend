import { NavLink } from 'react-router-dom';
import AddApartment from '../../features/apartments/AddApartment';
import useAllApartments from '../../features/apartments/useAllApartments';
import useDeleteApartment from '../../features/apartments/useDeleteApartment';
import EditApartment from '../../features/apartments/EditApartment';
import LoaderMini from '../../ui/LoaderMini';
import Button from '../../ui/Button';
import Breadcrumb from '../../components/BreadCrumps';

// import useAllApartments from '../../features/apartments/useAllApartments';

function Apartment() {
  const { isLoading, apartments, isError, error } = useAllApartments();

  if (isLoading) return <LoaderMini />;

  if (apartments?.length === 0)
    return (
      <div className="space-y-4 py-4.5">
        <p className="font-semibold">
          There are no apartments,start by creating one.
        </p>
        <AddApartment type={'New apartment'} />
      </div>
    );
  return (
    <div className="">
      {/* The top breadcrump component */}
      <Breadcrumb />

      <div className="mb-4 flex justify-between py-2">
        <AddApartment type={'New apartment'} />
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Photo
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Number
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Type
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Floors
                </th>
                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Units
                </th>

                <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {apartments?.map(apartment => (
                <tr
                  key={apartment._id}
                  className="transition-colors duration-200 hover:bg-gray-50"
                >
                  <td className="border-b px-4 py-2">
                    {apartment.photo ? (
                      <img
                        src={`https://ams-omega-lilac.vercel.app/public/img/apartments/${apartment.photo}`}
                        alt={`${apartment.name} - ${apartment.apartmentType}`}
                        className="h-16 w-16 rounded object-cover"
                      />
                    ) : (
                      <div className="h-14"></div>
                    )}
                  </td>
                  <td className="border-b px-4 py-2">
                    <div className="font-medium text-indigo-600">
                      {apartment.name}
                    </div>
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    {apartment.apartmentNum}
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    {apartment.location}
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    {apartment.apartmentType}
                  </td>

                  <td className="border-b px-4 py-2 text-gray-700">
                    {apartment.floors} Floors
                  </td>
                  <td className="border-b px-4 py-2 text-gray-700">
                    {apartment.units} Units
                  </td>

                  <td className="gap-2 space-y-1 border-b px-4">
                    <div className="flex gap-2">
                      <NavLink
                        to={`/apartment/${apartment._id}`}
                        className="rounded bg-indigo-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-indigo-600"
                      >
                        View
                      </NavLink>

                      <EditApartment
                        styles={
                          'rounded bg-yellow-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-yellow-600'
                        }
                        type={'Edit'}
                        apartId={apartment?._id}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Apartment;
