import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function LocationMapView({ apartment, position, handleMapClick = undefined }) {
  console.log(apartment, position);
  /**Map evenets for handling onclick handler */
  function MapEvents({ onMapClick }) {
    useMapEvents({
      click: e => onMapClick(e), // Call the passed handler on click
    });
    return null;
  }

  return (
    <div className="h-64 w-full overflow-hidden rounded-md border border-gray-300">
      <MapContainer
        center={
          apartment?.coordinates.length > 0 ? apartment?.coordinates : position
        }
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker
          position={
            apartment?.coordinates.length > 0
              ? apartment?.coordinates
              : position
          }
        >
          <Popup>Your apartment is here!</Popup>
        </Marker>
        <MapEvents onMapClick={handleMapClick} />
      </MapContainer>
    </div>
  );
}

export default LocationMapView;
