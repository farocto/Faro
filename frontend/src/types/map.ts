export type Event = {
  id: string;
  title: string;
  latitude: number;
  longitude: number;
  daysFromToday: number;
  riskLevel: "low" | "medium" | "high";
};

export type Driver = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: "available" | "busy" | "offline";
};
