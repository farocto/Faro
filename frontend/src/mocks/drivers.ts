import type { Driver } from "../types/map";

export const mockDrivers: Driver[] = [
  {
    id: "d1",
    name: "Luis",
    latitude: 18.4861,
    longitude: -69.9312,
    status: "available",
  },
  {
    id: "d2",
    name: "Maria",
    latitude: 18.4729,
    longitude: -69.9021,
    status: "busy",
  },
  {
    id: "d3",
    name: "Jose",
    latitude: 18.5092,
    longitude: -69.9441,
    status: "offline",
  },
];
