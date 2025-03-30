import Button from '../ui/Button';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import LocationMapView from './LocationMapView';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// prettier-ignore
const kenyanCounties = [
    'Nairobi','Mombasa','Kwale','Kilifi','Tana River','Lamu','Taita Taveta','Garissa','Wajir','Mandera','Marsabit','Isiolo','Meru','Tharaka-Nithi','Embu','Kitui','Machakos','Makueni','Nyandarua','Nyeri','Kirinyaga',"Murang'a",'Kiambu','Turkana','West Pokot','Samburu','Trans-Nzoia','Uasin Gishu','Elgeyo-Marakwet','Nandi','Baringo','Laikipia','Nakuru','Narok','Kajiado','Kericho','Bomet','Kakamega',
    'Vihiga','Bungoma', 'Busia', 'Siaya', 'Kisumu','Homa Bay','Migori','Kisii','Nyamira',
  ];
const apartmentTypes = ['Flats', 'Plot', 'Hotel', 'Hostel'];

function ApartmentFormt({
  register,
  onSubmit,
  handleSubmit,
  isPending,
  apartment,
  errors,
  isLoading,
  onCloseModal,
  handleMapClick,
  position,
}) {
  /**Map evenets for handling onclick handler */
  function MapEvents({ onMapClick }) {
    useMapEvents({
      click: e => onMapClick(e), // Call the passed handler on click
    });
    return null;
  }

  if (isLoading)
    return <p className="animate-pulse text-slate-900">Loading...</p>;

  return (
    <form
      id="EditApartmentForm"
      className="space-y-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Apartment Name
          </label>
          <div className="flex-1">
            <input
              type="text"
              id="name"
              name="name"
              disabled={isPending}
              defaultValue={apartment?.name}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              {...register('name', {
                required: {
                  defaultValue: true,
                  message: 'Apartment should have a name.',
                },
                minLength: {
                  defaultValue: 5,
                  message: 'Apartment name should be greater than 5 char',
                },
              })}
              required
            />

            {errors.name && (
              <span className="px-2 text-xs font-semibold text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Location (Kenyan County)
          </label>
          <div className="flex-1">
            <select
              id="location"
              name="location"
              disabled={isPending}
              defaultValue={apartment?.location}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              {...register('location', {
                required: {
                  defaultValue: true,
                  message: 'Select A location!',
                },
              })}
              required
            >
              <option defaultValue="">Select a County</option>
              {kenyanCounties.map(county => (
                <option key={county} defaultValue={county}>
                  {county}
                </option>
              ))}
            </select>
            {errors.location && (
              <span className="px-2 text-xs font-semibold text-red-500">
                {errors.location.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="floors"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Number of Floors
          </label>
          <div className="flex-1">
            <input
              type="number"
              id="floors"
              name="floors"
              disabled={isPending}
              defaultValue={apartment?.floors}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              required
              min="1"
              {...register('floors', {
                required: {
                  defaultValue: true,
                  message: 'Provide number of floors!',
                },
              })}
            />
            {errors.floors && (
              <span className="px-2 text-xs font-semibold text-red-500">
                {errors.floors.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="units"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Number of Units
          </label>
          <div className="flex-1">
            <input
              type="number"
              id="units"
              name="units"
              disabled={isPending}
              defaultValue={apartment?.units}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              required
              min="1"
              {...register('units', {
                required: {
                  defaultValue: true,
                  message: 'Provide number of units',
                },
              })}
            />
            {errors.units && (
              <span className="px-2 text-xs font-semibold text-red-500">
                {errors.units.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="amenities"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Amenities
          </label>
          <div className="flex-1">
            <input
              type="text"
              id="amenities"
              name="amenities"
              disabled={isPending}
              defaultValue={apartment?.amenities}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              required
              min="1"
              {...register('amenities')}
            />
            {/* {errors.units && (
            <span className="px-2 text-xs font-semibold text-red-500">
              {errors.units.message}
            </span>
          )} */}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="apartmentType"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Apartment Type
          </label>
          <div className="flex-1">
            <select
              id="apartmentType"
              name="apartmentType"
              disabled={isPending}
              defaultValue={apartment?.apartmentType}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm invalid:border-red-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
              required
              {...register('apartmentType', {
                required: {
                  defaultValue: true,
                  message: 'Select apartment Type!',
                },
              })}
            >
              <option defaultValue="">Select Apartment Type</option>
              {apartmentTypes.map(type => (
                <option key={type} defaultValue={type.toLowerCase()}>
                  {type}
                </option>
              ))}
            </select>
            {errors.apartmentType && (
              <span className="px-2 text-xs font-semibold text-red-500">
                {errors.apartmentType.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:gap-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            disabled={isPending}
            defaultValue={apartment?.description}
            className="mt-1 block h-20 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm md:w-2/3"
            required
            {...register('description')}
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <label
            htmlFor="photo"
            className="block text-sm font-medium text-gray-700 md:w-1/3"
          >
            Upload Photo
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-indigo-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 md:w-2/3"
            // required
            {...register('photo')}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:items-start md:gap-4">
        <label
          htmlFor="location"
          className="block text-sm font-medium text-gray-700 md:w-1/3"
        >
          Location(lat,lng)
        </label>

        <LocationMapView
          apartment={apartment}
          position={position}
          handleMapClick={handleMapClick}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          btnText={'Cancel'}
          type={'cancelBtn'}
          onClick={() => onCloseModal()}
        />

        <Button
          isPending={isPending}
          btnText={'Save Apartment'}
          type={'saveBtn'}
        />
      </div>
    </form>
  );
}

export default ApartmentFormt;
