import { useState } from "react";

type CalendarPopupProps = {
  selectedDate: string; // ISO YYYY-MM-DD
  onSelect: (isoDate: string) => void;
  onClose: () => void;
};

function CalendarPopup({
  selectedDate,
  onSelect,
  onClose,
}: CalendarPopupProps) {
  /* ===============================
     DATE SETUP
     =============================== */
  const selected = new Date(selectedDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(selected.getFullYear(), selected.getMonth(), 1)
  );

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);

  // Monday as first day of week (0 = Monday)
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  /* ===============================
     HELPERS
     =============================== */
  const toISO = (d: Date) => d.toISOString().split("T")[0];

  const isToday = (day: number) =>
    toISO(new Date(year, month, day)) === toISO(today);

  const isSelected = (day: number) =>
    toISO(new Date(year, month, day)) === selectedDate;

  /* ===============================
     RENDER
     =============================== */
  return (
    <div className="absolute top-16 right-0 z-50 w-80 rounded-2xl bg-neutral-900 text-white shadow-2xl p-4 border border-white/10">
      {/* ===============================
         HEADER
         =============================== */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() =>
            setCurrentMonth(new Date(year, month - 1, 1))
          }
          className="text-xl px-2 hover:text-red-500"
        >
          ‹
        </button>

        <div className="text-sm font-semibold uppercase tracking-wide">
          {currentMonth.toLocaleDateString("es-DO", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <button
          onClick={() =>
            setCurrentMonth(new Date(year, month + 1, 1))
          }
          className="text-xl px-2 hover:text-red-500"
        >
          ›
        </button>
      </div>

      {/* ===============================
         WEEKDAY HEADERS
         =============================== */}
      <div className="grid grid-cols-7 text-center text-xs mb-2 opacity-60">
        {["L", "M", "M", "J", "V", "S", "D"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* ===============================
         DAY GRID
         =============================== */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty offset cells */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Actual days */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
          (day) => {
            const iso = toISO(new Date(year, month, day));

            return (
              <button
                key={day}
                onClick={() => {
                  onSelect(iso);
                  onClose();
                }}
                className={`h-9 rounded-lg text-sm transition
                  ${
                    isSelected(day)
                      ? "bg-red-600 text-white"
                      : "hover:bg-white/10"
                  }
                  ${
                    isToday(day) && !isSelected(day)
                      ? "ring-1 ring-red-500"
                      : ""
                  }
                `}
              >
                {day}
              </button>
            );
          }
        )}
      </div>

      {/* ===============================
         FOOTER
         =============================== */}
      <button
        onClick={onClose}
        className="mt-4 w-full text-xs opacity-60 hover:opacity-100"
      >
        Close
      </button>
    </div>
  );
}

export default CalendarPopup;
