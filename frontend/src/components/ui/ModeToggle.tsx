import type { AppMode } from "../../App";

type ModeToggleProps = {
  mode: AppMode;
  onChange: (mode: AppMode) => void;
};

function ModeToggle({ mode, onChange }: ModeToggleProps) {
  return (
    <div className="flex gap-2 bg-black/50 p-1 rounded">
      <button
        onClick={() => onChange("events")}
        className={`px-3 py-1 rounded ${
          mode === "events" ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        Events
      </button>

      <button
        onClick={() => onChange("drivers")}
        className={`px-3 py-1 rounded ${
          mode === "drivers" ? "bg-blue-600" : "bg-gray-700"
        }`}
      >
        Drivers
      </button>
    </div>
  );
}

export default ModeToggle;
