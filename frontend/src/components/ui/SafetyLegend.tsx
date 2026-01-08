function SafetyLegend() {
  return (
    <div className="pointer-events-auto bg-slate-900/80 backdrop-blur rounded-xl px-4 py-3 text-white shadow-lg">
      <div className="text-sm font-semibold mb-2">Safety</div>

      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-500" />
          <span>Safe</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span>Caution</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span>Danger</span>
        </div>
      </div>
    </div>
  );
}

export default SafetyLegend;
