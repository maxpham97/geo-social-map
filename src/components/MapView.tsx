import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import type { User } from '../types/user';
import { UserMarker } from './UserMarker';

let iconInitialized = false;

const initializeLeafletIcons = () => {
  if (iconInitialized || typeof window === 'undefined') return;
  
  try {
    delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
    iconInitialized = true;
  } catch (error) {
    console.warn('Error initializing Leaflet icons:', error);
  }
};

interface MapViewProps {
  users: User[];
  interestFilter: string;
}

export const MapView = ({ users, interestFilter }: MapViewProps) => {
  useEffect(() => {
    initializeLeafletIcons();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!Array.isArray(users) || users.length === 0) {
      return [];
    }
    
    if (!interestFilter.trim()) {
      return users;
    }
    
    const filterLower = interestFilter.toLowerCase().trim();
    return users.filter((user) =>
      Array.isArray(user.interests) &&
      user.interests.some((interest) =>
        interest.toLowerCase().includes(filterLower)
      )
    );
  }, [users, interestFilter]);

  const center: [number, number] = useMemo(() => {
    if (filteredUsers.length === 0) {
      return [55.7558, 37.6173];
    }
    
    const validUsers = filteredUsers.filter(
      (user) => typeof user.lat === 'number' && typeof user.lon === 'number'
    );
    
    if (validUsers.length === 0) {
      return [55.7558, 37.6173];
    }
    
    const avgLat =
      validUsers.reduce((sum, user) => sum + user.lat, 0) / validUsers.length;
    const avgLon =
      validUsers.reduce((sum, user) => sum + user.lon, 0) / validUsers.length;
    return [avgLat, avgLon];
  }, [filteredUsers]);

  if (!Array.isArray(users) || users.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">No data to display</div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={center}
        zoom={filteredUsers.length === 0 ? 10 : 13}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredUsers.length > 0 && (
          <MarkerClusterGroup
            chunkedLoading
            chunkDelay={100}
            chunkInterval={200}
            spiderfyOnMaxZoom
            showCoverageOnHover
            zoomToBoundsOnClick
            maxClusterRadius={80}
            disableClusteringAtZoom={18}
            spiderfyDistanceMultiplier={2}
            removeOutsideVisibleBounds
            animate
            animateAddingMarkers
          >
            {filteredUsers.map((user) => (
              <UserMarker key={user.id} user={user} />
            ))}
          </MarkerClusterGroup>
        )}
      </MapContainer>
    </div>
  );
};

