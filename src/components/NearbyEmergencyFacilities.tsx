import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, Shield, MapPin, Phone } from 'lucide-react';

interface EmergencyFacility {
  id: string;
  name: string;
  type: 'hospital' | 'police' | 'tourism';
  distance: string;
  phone?: string;
  status: 'open' | 'closed';
}

const emergencyFacilities: EmergencyFacility[] = [
  {
    id: 'hospital-1',
    name: 'STNM Hospital',
    type: 'hospital',
    distance: '1.2 km',
    phone: '+91-3592-202016',
    status: 'open'
  },
  {
    id: 'police-1',
    name: 'Gangtok Police Station',
    type: 'police',
    distance: '800 m',
    phone: '+91-3592-202033',
    status: 'open'
  },
  {
    id: 'tourism-1',
    name: 'Tourism Office',
    type: 'tourism',
    distance: '600 m',
    phone: '+91-3592-221634',
    status: 'open'
  },
  {
    id: 'hospital-2',
    name: 'Central Referral Hospital',
    type: 'hospital',
    distance: '2.1 km',
    phone: '+91-3592-231656',
    status: 'open'
  },
  {
    id: 'police-2',
    name: 'Tourist Police',
    type: 'police',
    distance: '450 m',
    phone: '+91-3592-221033',
    status: 'open'
  },
  {
    id: 'tourism-2',
    name: 'Sikkim Tourism Info Center',
    type: 'tourism',
    distance: '950 m',
    phone: '+91-3592-221634',
    status: 'open'
  }
];

const getFacilityIcon = (type: string) => {
  switch (type) {
    case 'hospital':
      return <Heart className="w-4 h-4" style={{ color: '#F5A623' }} />;
    case 'police':
      return <Shield className="w-4 h-4" style={{ color: '#F5A623' }} />;
    case 'tourism':
      return <MapPin className="w-4 h-4" style={{ color: '#F5A623' }} />;
    default:
      return <MapPin className="w-4 h-4" style={{ color: '#F5A623' }} />;
  }
};

export function NearbyEmergencyFacilities() {
  return (
    <section className="py-12 px-4" style={{ backgroundColor: '#F2E6D8' }}>
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 
            className="text-2xl md:text-3xl mb-2" 
            style={{ fontWeight: 600, color: '#2C3E50' }}
          >
            Nearby Emergency Facilities
          </h2>
          <p 
            className="text-base" 
            style={{ color: '#7F8C8D' }}
          >
            Essential services within reach for your safety and assistance
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {emergencyFacilities.map((facility) => (
            <Card 
              key={facility.id}
              className="border-0 transition-all duration-200 hover:shadow-lg cursor-pointer"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 1px 4px rgba(44, 62, 80, 0.06)'
              }}
            >
              <CardContent className="p-3">
                {/* Header with Icon and Status */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div 
                      className="p-1.5 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(245, 166, 35, 0.1)' }}
                    >
                      {getFacilityIcon(facility.type)}
                    </div>
                  </div>
                  <Badge 
                    className="text-xs px-1.5 py-0.5 rounded-full border-0"
                    style={{
                      backgroundColor: '#D4F8E8',
                      color: '#2ECC71',
                      fontWeight: 500,
                      fontSize: '10px'
                    }}
                  >
                    {facility.status}
                  </Badge>
                </div>

                {/* Facility Name */}
                <h3 
                  className="text-sm mb-1 leading-tight"
                  style={{ 
                    fontWeight: 600, 
                    color: '#2C3E50'
                  }}
                >
                  {facility.name}
                </h3>

                {/* Distance */}
                <div className="flex items-center justify-between mb-1">
                  <span 
                    className="text-xs"
                    style={{ color: '#7F8C8D' }}
                  >
                    {facility.distance}
                  </span>
                  
                  {/* Phone Icon (subtle) */}
                  {facility.phone && (
                    <Phone 
                      className="w-3 h-3" 
                      style={{ color: '#BDC3C7' }}
                    />
                  )}
                </div>

                {/* Emergency Context (subtle text) */}
                <div className="pt-1 border-t border-gray-100">
                  <span 
                    className="text-xs leading-tight block"
                    style={{ color: '#95A5A6', fontSize: '10px' }}
                  >
                    {facility.type === 'hospital' && 'Medical'}
                    {facility.type === 'police' && 'Safety'}
                    {facility.type === 'tourism' && 'Travel info'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Call Button */}
        <div className="text-center mt-8">

        </div>
      </div>
    </section>
  );
}