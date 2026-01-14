import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { AppMode } from "../../App";
import { mockEvents } from "../../mocks/events";
import { mockDrivers } from "../../mocks/drivers";
import { mockSafetyZones } from "../../mocks/safetyZones";


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
    
    map.on("load", () => 
    {
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

    map.on("click", "safety-zones-fill", (e) => {
    if (!e.features || !e.features[0]) return;

    const { name, level } = e.features[0].properties as {
      name: string;
      level: string;
    };

    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        `<strong>${name}</strong><br/>Safety: ${level.toUpperCase()}`
      )
      .addTo(map);
    });

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
      color: "#3b82f6", // Faro blue (neutral, non-judgmental)
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

