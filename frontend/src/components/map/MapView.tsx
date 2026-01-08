import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// TEMP: we will move this to env vars next step
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function MapView() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-69.9312, 18.4861], // Santo Domingo
      zoom: 12,
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}

export default MapView;
