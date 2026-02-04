import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type { AppMode } from "../../App";
import { mockEvents } from "../../mocks/events";
import { mockSafetyZones } from "../../mocks/safetyZones";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

type MapViewProps = {
  mode: AppMode;
  selectedDate: string; // ISO date YYYY-MM-DD
  selectedEventId: string | null;
  onSelectEvent: (id: string | null) => void;
};

function MapView({
  mode,
  selectedDate,
  selectedEventId,
  onSelectEvent,
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const getZoneForEvent = (zoneId: string) =>
    mockSafetyZones.find((zone) => zone.id === zoneId);

  /* MAP INIT */
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-69.9312, 18.4861],
      zoom: 12,
    });

    mapRef.current = map;

    map.on("load", () => {
      map.addSource("safety-zones", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: mockSafetyZones.map((zone) => ({
            type: "Feature",
            properties: {
              level: zone.level,
              name: zone.name,
            },
            geometry: {
              type: "Polygon",
              coordinates: zone.coordinates,
            },
          })),
        },
      });

      map.addLayer({
        id: "safety-zones-fill",
        type: "fill",
        source: "safety-zones",
        paint: {
          "fill-color": [
            "match",
            ["get", "level"],
            "safe",
            "#16a34a",
            "caution",
            "#facc15",
            "danger",
            "#dc2626",
            "#000000",
          ],
          "fill-opacity": 0.35,
        },
      });

      map.addLayer({
        id: "safety-zones-outline",
        type: "line",
        source: "safety-zones",
        paint: {
          "line-color": "#ffffff",
          "line-width": 1,
        },
      });
    });

    return () => map.remove();
  }, []);

  /* EVENT MARKERS */
  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (mode !== "events") return;

    const filteredEvents = mockEvents.filter((event) => {
      const eventDate = event.startDateTime.slice(0, 10);
      return eventDate === selectedDate;
    });

    filteredEvents.forEach((event) => {
      const marker = new mapboxgl.Marker({ color: "#3b82f6" })
        .setLngLat([event.longitude, event.latitude])
        .setPopup(new mapboxgl.Popup().setText(event.title))
        .addTo(mapRef.current!);

      marker.getElement().addEventListener("click", () => {
        onSelectEvent(event.id);
      });

      markersRef.current.push(marker);
    });
  }, [mode, selectedDate]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}

export default MapView;
