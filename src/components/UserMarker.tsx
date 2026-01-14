import { memo } from 'react'
import { Marker, Popup } from 'react-leaflet'
import type { User } from '../types/user'

interface UserMarkerProps {
  user: User
}

export const UserMarker = memo(({ user }: UserMarkerProps) => {
  return (
    <Marker position={[user.lat, user.lon]}>
      <Popup
        closeButton={false}
        offset={[0, -8]}
        className="user-popup"
        maxWidth={300}
      >
        <div className="group relative rounded-xl bg-white/90 backdrop-blur-md shadow-xl border border-gray-200 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
              {user.name}
            </h3>
            <p className="text-xs text-gray-500">
              Nearby user
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-700 transition-colors group-hover:bg-gray-200"
              >
                #{interest}
              </span>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-br from-indigo-500/5 via-transparent to-pink-500/10" />
        </div>
      </Popup>
    </Marker>
  )
})

UserMarker.displayName = 'UserMarker'
