import { useEffect, useRef } from 'react';
import './Map.css';

function Map({ className, style, center, zoom }) {
  const mapRef = useRef();
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapId: 'LOCATION_ID',
    });
    new window.google.maps.marker.AdvancedMarkerElement({
      map,
      position: center,
    });
  }, [center, zoom]);

  return <div ref={mapRef} className={`map ${className}`} style={style}></div>;
}

export default Map;
