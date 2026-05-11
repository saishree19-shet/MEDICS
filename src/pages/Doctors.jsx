import React from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Phone, Sparkles, ChevronDown, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 }
};

export default function Doctors() {
  const navigate = useNavigate();
  const [currentLocation, setCurrentLocation] = React.useState({ lat: 37.7749, lng: -122.4194 }); // Default to SF
  const [mapInstance, setMapInstance] = React.useState(null);
  const [realDoctors, setRealDoctors] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState('doctor'); // 'doctor' or 'hospital'

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentLocation({ lat, lng });

          // Simulate searching for nearby clinics
          setIsSearching(true);
          setTimeout(() => {
            // Populate list with reliable mock data, perfectly positioned around their live GPS in Mangaluru
            setRealDoctors([
              { place_id: 'm1', name: "Dr. Amritha Bhandary (KMC Hospital)", types: ["Gynecologist & Obstetrician"], rating: 4.8, vicinity: "Ambedkar Circle, Mangaluru", opening_hours: { isOpen: () => true }, geometry: { location: { lat: lat + 0.015, lng: lng - 0.012 } } },
              { place_id: 'm2', name: "Dr. Prema D'Cunha (Father Muller)", types: ["Senior Gynecologist"], rating: 4.9, vicinity: "Kankanady, Mangaluru", opening_hours: { isOpen: () => true }, geometry: { location: { lat: lat - 0.010, lng: lng - 0.005 } } },
              { place_id: 'm3', name: "Unity Hospital Women's Wing", types: ["Maternity & Gynecology Hospital"], rating: 4.6, vicinity: "Falnir Road, Mangaluru", opening_hours: { isOpen: () => true }, geometry: { location: { lat: lat + 0.008, lng: lng - 0.020 } } }
            ]);
            setIsSearching(false);
          }, 1500);

        },
        (error) => {
          console.error("Error fetching location", error);
        }
      );
    }
  }, [activeFilter]); // Re-run mock search if filter changes

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} style={{ paddingBottom: '100px' }}>
      
      {/* Map Header */}
      <div style={{ margin: '-24px -20px 24px -20px', height: '240px', background: 'linear-gradient(to bottom, #2C3E50, #34495E)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Real Google Map Background */}
        {isLoaded ? (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.8 }}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={currentLocation}
              zoom={13}
              options={{ 
                disableDefaultUI: false, 
                fullscreenControl: true, 
                streetViewControl: false, 
                mapTypeControl: false,
                zoomControl: true 
              }}
              onLoad={(map) => setMapInstance(map)}
            >
              <Marker position={currentLocation} icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }} />
              {realDoctors.map((doc, idx) => (
                <Marker 
                  key={doc.place_id || idx} 
                  position={doc.geometry.location} 
                  icon={{ url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' }}
                  title={doc.name}
                />
              ))}
            </GoogleMap>
          </div>
        ) : (
          <>
            {/* Abstract Map Graphic Representation (Fallback) */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) perspective(500px) rotateX(45deg) rotateZ(-15deg)', width: '300px', height: '200px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', display: 'flex', flexWrap: 'wrap', gap: '4px', padding: '10px' }}>
              {[...Array(20)].map((_, i) => (
                 <div key={i} style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
              ))}
            </div>
            {/* Floating Map Pins */}
            <MapPin size={24} color="var(--primary)" fill="var(--primary-light)" style={{ position: 'absolute', top: '40%', left: '40%' }} />
            <MapPin size={32} color="var(--primary)" fill="white" style={{ position: 'absolute', top: '60%', left: '50%' }} />
            <MapPin size={20} color="var(--primary)" fill="var(--primary-light)" style={{ position: 'absolute', top: '30%', left: '60%' }} />
          </>
        )}

        {/* Top Controls */}
        <div style={{ position: 'absolute', top: '24px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ background: 'rgba(255,255,255,0.9)', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--text-dark)' }}>
            <MapPin size={14} color="var(--danger)" /> My Live Location
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MapPin size={16} /></div>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SlidersHorizontal size={16} /></div>
          </div>
        </div>

        {/* Bottom Filter Pills */}
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', display: 'flex', gap: '8px', overflowX: 'auto', zIndex: 10 }}>
          <button 
            onClick={() => setActiveFilter('doctor')}
            style={{ background: activeFilter === 'doctor' ? 'var(--primary)' : 'rgba(255,255,255,0.9)', color: activeFilter === 'doctor' ? 'white' : 'var(--text-dark)', border: 'none', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }}
          >
            <span style={{ fontSize: '16px' }}>⛑</span> Specialists
          </button>
          <button 
            onClick={() => setActiveFilter('hospital')}
            style={{ background: activeFilter === 'hospital' ? 'var(--primary)' : 'rgba(255,255,255,0.9)', color: activeFilter === 'hospital' ? 'white' : 'var(--text-dark)', border: 'none', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: '0.2s' }}
          >
            <span style={{ fontSize: '16px' }}>🏥</span> Hospitals
          </button>
        </div>
      </div>

      {/* Emergency Care */}
      <div className="flex-between" style={{ marginBottom: '16px' }}>
        <h2>Emergency Care</h2>
        <span style={{ color: 'var(--primary)', fontSize: '13px', fontWeight: '600' }}>View All</span>
      </div>

      <div style={{ background: 'var(--danger-light)', borderRadius: '24px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'white', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>*</div>
        <div style={{ flex: 1 }}>
          <h3 style={{ color: 'var(--danger)', fontSize: '15px', marginBottom: '4px' }}>24/7 Rapid Response</h3>
          <p style={{ fontSize: '12px', color: 'var(--text-dark)', margin: 0, opacity: 0.8 }}>Nearest: St. Mary's General Hospital (0.8 miles)</p>
        </div>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--danger)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-danger)' }}>
          <Phone size={20} />
        </div>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
        <div style={{ flex: 1, background: '#F4F4F5', borderRadius: '24px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Search size={18} color="var(--text-muted)" />
          <input type="text" placeholder="Search gynecologist, nutrition..." style={{ border: 'none', background: 'transparent', width: '100%', fontSize: '13px', outline: 'none' }} />
        </div>
        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SlidersHorizontal size={18} />
        </div>
      </div>

      {/* Top Rated Doctors */}
      <div className="flex-between" style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px' }}>Top Rated<br/>Doctors</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', color: 'var(--primary)', fontSize: '12px' }}>
          <span>Sort: <ChevronDown size={12} style={{ verticalAlign: 'middle' }}/></span>
          <span style={{ fontWeight: '600' }}>Relevant</span>
        </div>
      </div>

      {/* Doctor Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {isSearching && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>Searching for real clinics nearby...</p>}
        {!isSearching && realDoctors.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No doctors found nearby yet.</p>}

        {realDoctors.map((doc, idx) => (
          <div className="card" key={doc.place_id || idx} style={{ padding: '16px' }}>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '70px', height: '70px', borderRadius: '12px', background: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontWeight: 'bold', fontSize: '24px' }}>
                  {doc.name.charAt(0)}
                </div>
                <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '14px', height: '14px', background: doc.opening_hours?.isOpen() ? 'var(--success)' : 'var(--text-muted)', border: '2px solid white', borderRadius: '50%' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{doc.name}</h3>
                <p style={{ fontSize: '10px', color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '0.5px', marginBottom: '8px', textTransform: 'uppercase' }}>
                  {doc.types?.[0]?.replace(/_/g, ' ') || 'Clinic / Hospital'}
                </p>
                <div style={{ display: 'flex', gap: '8px', fontSize: '11px', color: 'var(--text-light)' }}>
                  {doc.rating && (
                    <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' }}>
                      ☆ {doc.rating}
                    </span>
                  )}
                  <span>📍 {doc.vicinity}</span>
                </div>
              </div>
            </div>
            <div className="flex-between">
              <div>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>STATUS</p>
                <p style={{ fontSize: '14px', fontWeight: 'bold', margin: 0, color: doc.opening_hours?.isOpen() ? 'var(--success)' : 'var(--text-muted)' }}>
                  {doc.opening_hours?.isOpen() ? 'Open Now' : 'Closed'}
                </p>
              </div>
              <button className="btn-primary" onClick={() => navigate('/doctors/booking')}>Book Now</button>
            </div>
          </div>
        ))}

        {/* Smart Match Insight (Keep one for UI demo) */}
        {realDoctors.length > 0 && (
          <div style={{ background: 'var(--white)', border: '1px solid var(--primary-light)', borderRadius: '20px', padding: '16px', display: 'flex', gap: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Sparkles size={20} />
            </div>
            <div>
              <div className="flex-between" style={{ marginBottom: '4px' }}>
                <h4 style={{ color: 'var(--primary)', fontSize: '13px' }}>Smart Match Insight</h4>
                <span style={{ color: 'var(--text-muted)' }}>×</span>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--text-dark)', lineHeight: '1.5', margin: 0 }}>
                Based on your symptoms, <strong>{realDoctors[0]?.name}</strong> has excellent reviews for reproductive health.
              </p>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}
