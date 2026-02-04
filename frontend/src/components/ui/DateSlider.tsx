import { useState } from "react";
import CalendarPopup from "./CalendarPopup";

type DateSliderProps = {
  selectedDate: string; // ISO YYYY-MM-DD
  onChange: (dateISO: string) => void;
};

function DateSlider({ selectedDate, onChange }: DateSliderProps) {
  /* ===============================
     BASE DATES
     =============================== */

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(selectedDate);
  selected.setHours(0, 0, 0, 0);

  /* ===============================
     WEEK STATE
     =============================== */

  const [weekOffset, setWeekOffset] = useState(0);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() + weekOffset * 7);

  /* ===============================
     BUILD WEEK DATES
     =============================== */
  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  /* ===============================
     HELPERS
     =============================== */
  const toISO = (d: Date) => d.toISOString().split("T")[0];
  const isToday = (d: Date) => d.getTime() === today.getTime();

  const jumpToWeekContaining = (date: Date) => {
    const diffDays = Math.floor(
      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    setWeekOffset(Math.floor(diffDays / 7));
  };

  /* ===============================
     RENDER
     =============================== */
  return (
    <div
      className="
        relative flex items-center gap-2
        bg-black/75 p-3 rounded-xl shadow-lg
        w-[720px]   /* 🔒 FIXED SLIDER WIDTH — prevents horizontal shifting */
      "
    >
      {/* PREVIOUS WEEK */}
      <button
        onClick={() => setWeekOffset((w) => w - 1)}
        className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
        title="Previous week"
      >
        &laquo;
      </button>

      {/* DATE BUTTONS */}
      <div
        className="
          flex gap-2 flex-1 justify-center
          /* 🔒 FLEX AREA FIXED — keeps buttons centered */
        "
      >
        {dates.map((date) => {
          const iso = toISO(date);
          const active = iso === selectedDate;
          const todayFlag = isToday(date);

          return (
            <button
              key={iso}
              onClick={() => onChange(iso)}
              className={`
                relative rounded-lg text-sm transition text-center
                w-[72px] h-[64px]    /* 🔒 FIXED BUTTON SIZE */
                flex flex-col items-center justify-center
                ${
                  active
                    ? "bg-white text-black font-semibold"
                    : "bg-white/10 text-white hover:bg-white/20"
                }
                ${todayFlag ? "ring-2 ring-red-500" : ""}
              `}
            >
              {/* TODAY BADGE */}
              {todayFlag && (
                <span className="absolute -top-2 -right-2 text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded">
                  TODAY
                </span>
              )}

              <div className="text-xs uppercase opacity-70 leading-none">
                {date.toLocaleDateString("es-DO", { weekday: "short" })}
              </div>

              <div className="text-sm leading-tight">
                {date.toLocaleDateString("es-DO", { month: "short" })}
              </div>

              <div className="text-lg font-semibold leading-none">
                {date.getDate()}
              </div>
            </button>
          );
        })}
      </div>

      {/* NEXT WEEK */}
      <button
        onClick={() => setWeekOffset((w) => w + 1)}
        className="px-3 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
        title="Next week"
      >
        &raquo;
      </button>

      {/* CALENDAR BUTTON */}
      <button
        onClick={() => setCalendarOpen(true)}
        className="ml-2 px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition"
        title="Open calendar"
      >
        📅
      </button>

      {/* CALENDAR POPUP */}
      {calendarOpen && (
        <CalendarPopup
          selectedDate={selectedDate}
          onSelect={(iso) => {
            const picked = new Date(iso);
            picked.setHours(0, 0, 0, 0);

            onChange(iso);
            jumpToWeekContaining(picked);
            setCalendarOpen(false);
          }}
          onClose={() => setCalendarOpen(false)}
        />
      )}
    </div>
  );
}

export default DateSlider;
