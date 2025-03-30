import TableHead from './TableHead';

function Table({ tableData }) {
  const data = [
    'Photo',
    'Name',
    'Number',
    'Location',
    'Type',
    'Floors',
    'Units',
    'Actions',
  ];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow-lg">
        <TableHead headData={data} />

        <tbody>
          {apartments?.map(apartment => (
            <tr
              key={apartment._id}
              className="transition-colors duration-200 hover:bg-gray-50"
            >
              <td className="border-b px-4 py-2">
                {apartment.photo ? (
                  <img
                    src={`http://localhost:8000/public/img/apartments/${apartment.photo}`}
                    alt={`${apartment.name} - ${apartment.apartmentType}`}
                    className="h-16 w-16 rounded object-cover"
                  />
                ) : (
                  ''
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
                <NavLink
                  to={`/apartment/${apartment.apartmentNum}`}
                  className="rounded bg-indigo-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-indigo-600"
                >
                  View
                </NavLink>

                <EditApartment
                  styles={
                    'rounded bg-yellow-500 px-3 py-1 text-sm text-white transition duration-300 hover:bg-yellow-600'
                  }
                  type={'Edit'}
                  apartId={apartment?.apartmentNum}
                />

                <Button
                  isPending={isPending}
                  btnText={'Delete'}
                  type={'deleteBtn'}
                  onClick={() => deleteApart(apartment.apartmentNum)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
