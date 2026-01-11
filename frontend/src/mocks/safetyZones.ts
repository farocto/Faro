import type { SafetyZone } from "../types/safety";

export const mockSafetyZones: SafetyZone[] = [
  {
    id: "zona-colonial",
    name: "Zona Colonial",
    level: "safe",
    coordinates: [
      [
        [-69.889, 18.472],
        [-69.880, 18.472],
        [-69.880, 18.478],
        [-69.889, 18.478],
        [-69.889, 18.472],
      ],
    ],
  },
  {
    id: "capotillo",
    name: "Capotillo",
    level: "danger",
    coordinates: [
      [
        [-69.903, 18.506],
        [-69.894, 18.506],
        [-69.894, 18.512],
        [-69.903, 18.512],
        [-69.903, 18.506],
      ],
    ],
  },
];
