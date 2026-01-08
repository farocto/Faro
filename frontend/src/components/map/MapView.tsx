import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { AppMode } from "../../App";
import { mockEvents } from "../../mocks/events";
import { mockDrivers } from "../../mocks/drivers";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

type MapViewProps = {
  mode: AppMode;
  selectedDate: number;
};

function MapView({ mode, selectedDate }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-69.9312, 18.4861],
      zoom: 12,
    });

    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    if (mode === "events") {
      const filteredEvents = mockEvents.filter(
        (e) => e.daysFromToday === selectedDate
      );

      filteredEvents.forEach((event) => {
        const marker = new mapboxgl.Marker({
          color:
            event.riskLevel === "high"
              ? "red"
              : event.riskLevel === "medium"
              ? "orange"
              : "green",
        })
          .setLngLat([event.longitude, event.latitude])
          .setPopup(
            new mapboxgl.Popup().setText(event.title)
          )
          .addTo(mapRef.current!);

        markersRef.current.push(marker);
      });
    }
    
    if (mode === "drivers") {
      mockDrivers.forEach((driver) => {
        const marker = new mapboxgl.Marker({
          color:
            driver.status === "available"
              ? "green"
              : driver.status === "busy"
              ? "yellow"
              : "gray",
        })
          .setLngLat([driver.longitude, driver.latitude])
          .setPopup(
            new mapboxgl.Popup().setText(driver.name)
          )
          .addTo(mapRef.current!);

        markersRef.current.push(marker);
      });
    }
  }, [mode, selectedDate]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}

export default MapView;

