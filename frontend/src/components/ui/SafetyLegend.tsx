function SafetyLegend() {
  return (
    <div className="bg-black/70 text-white text-sm rounded p-3 space-y-2">
      <div className="font-semibold">Safety Levels</div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-green-600 inline-block rounded-sm" />
        <span>Safe</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-yellow-400 inline-block rounded-sm" />
        <span>Caution</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="w-3 h-3 bg-red-600 inline-block rounded-sm" />
        <span>Danger</span>
      </div>
    </div>
  );
}

export default SafetyLegend;
