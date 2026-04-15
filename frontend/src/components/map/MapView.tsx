import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import type { AppMode } from "../../App";
import type { EventPin } from "../../mocks/events";
import { mockSafetyZones } from "../../mocks/safetyZones";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

type MapViewProps = {
  mode: AppMode;
  selectedDate: string;
  events: EventPin[];
  selectedEventId: string | null;
  onSelectEvent: (id: string | null) => void;

  pendingEvent: EventPin | null;
  onPendingEventMove: (coordinates: [number, number]) => void;
};

function MapView({
  mode,
  selectedDate,
  events,
  selectedEventId,
  onSelectEvent,
  pendingEvent,
  onPendingEventMove,
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const pendingMarkerRef = useRef<mapboxgl.Marker | null>(null);

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
          "fill-opacity": 0.1,
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

    map.on("click", () => {
      onSelectEvent(null);
    });

    return () => map.remove();
  }, [onSelectEvent]);

  useEffect(() => {
    if (!mapRef.current) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    if (mode !== "events") return;

    const filteredEvents = events.filter((event) => event.date === selectedDate);

    filteredEvents.forEach((event) => {
      const isSelected = event.id === selectedEventId;

      const marker = new mapboxgl.Marker({
        color: isSelected ? "#ffffff" : "#3b82f6",
      })
        .setLngLat(event.coordinates)
        .addTo(mapRef.current!);

      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectEvent(event.id);
      });

      markersRef.current.push(marker);
    });
  }, [mode, selectedDate, selectedEventId, events, onSelectEvent]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (pendingMarkerRef.current) {
      pendingMarkerRef.current.remove();
      pendingMarkerRef.current = null;
    }

    if (!pendingEvent) return;

    const marker = new mapboxgl.Marker({
      color: "#ffffff",
      draggable: true,
    })
      .setLngLat(pendingEvent.coordinates)
      .addTo(mapRef.current);

    marker.on("dragend", () => {
      const lngLat = marker.getLngLat();
      onPendingEventMove([lngLat.lng, lngLat.lat]);
    });

    pendingMarkerRef.current = marker;

    mapRef.current.flyTo({
      center: pendingEvent.coordinates,
      zoom: 16,
      speed: 1.1,
      curve: 1.2,
      essential: true,
    });
  }, [pendingEvent, onPendingEventMove]);

  useEffect(() => {
    if (!pendingMarkerRef.current || !pendingEvent) return;

    pendingMarkerRef.current.setLngLat(pendingEvent.coordinates);
  }, [pendingEvent?.coordinates]);

  return <div ref={mapContainerRef} className="h-full w-full" />;
}

export default MapView;