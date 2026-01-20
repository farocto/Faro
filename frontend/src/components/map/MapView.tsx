import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { AppMode } from "../../App";
import { mockEvents } from "../../mocks/events";
import { mockDrivers } from "../../mocks/drivers";
import { mockSafetyZones } from "../../mocks/safetyZones";

/* ===============================
   MAPBOX GLOBAL CONFIGURATION
   =============================== */
// Access token loaded from environment variables
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

/* ===============================
   COMPONENT TYPES
   =============================== */
type MapViewProps = {
  mode: AppMode;
  selectedDate: number;

  // NEW — controlled by App
  selectedEventId: string | null;
  onSelectEvent: (id: string) => void;
};

/* ===============================
   MAP VIEW COMPONENT
   =============================== */
function MapView({
  mode,
  selectedDate,
  selectedEventId,
  onSelectEvent,
}: MapViewProps) {
  /* ===============================
     REFS (Persistent Objects)
     =============================== */
  // DOM container for Mapbox
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  // Mapbox map instance (persisted between renders)
  const mapRef = useRef<mapboxgl.Map | null>(null);

  // Active markers currently displayed on the map
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  /* ===============================
     INTERNAL HELPERS (2.3.3)
     =============================== */
  // INTERNAL ONLY: Get zone metadata for an event by zoneId
  // This is NOT shown to users and is safe to use for logic only
  const getZoneForEvent = (zoneId: string) => {
    return mockSafetyZones.find((zone) => zone.id === zoneId);
  };

  /* ===============================
     MAP INITIALIZATION (Runs Once)
     =============================== */
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create the Mapbox map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-69.9312, 18.4861], // Santo Domingo
      zoom: 12,
    });

    mapRef.current = map;

    /* ===============================
       SAFETY ZONES SOURCE + LAYERS
       =============================== */
    map.on("load", () => {
      // Add GeoJSON source for safety zones
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

      // Fill layer (colored safety zones)
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

      // Outline layer for visual clarity
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

    /* ===============================
       SAFETY ZONE CLICK INTERACTION
       =============================== */
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

    // Cleanup map on component unmount
    return () => {
      map.remove();
    };
  }, []);

  /* ===============================
     RENDERING LOGIC (Markers)
     =============================== */
  useEffect(() => {
    if (!mapRef.current) return;

    // Remove all existing markers before re-rendering
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    /* ===============================
       EVENTS MODE
       =============================== */
    if (mode === "events") {
      const filteredEvents = mockEvents.filter(
        (e) => e.daysFromToday === selectedDate
      );

      filteredEvents.forEach((event) => {
        // INTERNAL: zone context available if needed (not displayed)
        const zone = getZoneForEvent(event.zoneId);

        const marker = new mapboxgl.Marker({
          color: "#3b82f6", // Faro blue (neutral, client-safe)
        })
          .setLngLat([event.longitude, event.latitude])
          .setPopup(new mapboxgl.Popup().setText(event.title))
          .addTo(mapRef.current!);

        markersRef.current.push(marker);

        // Example internal usage (debug / future logic)
        // console.log(event.id, zone?.level);
      });
    }

    /* ===============================
       DRIVERS MODE
       =============================== */
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
          .setPopup(new mapboxgl.Popup().setText(driver.name))
          .addTo(mapRef.current!);

        markersRef.current.push(marker);
      });
    }

    /* ===== END OF RENDERING LOGIC ===== */
  }, [mode, selectedDate]);

  /* ===============================
     MAP CONTAINER
     =============================== */
  return <div ref={mapContainerRef} className="h-full w-full" />;
}

export default MapView;
