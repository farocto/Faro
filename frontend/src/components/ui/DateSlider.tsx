type DateSliderProps = {
  selectedDate: number;
  onChange: (value: number) => void;
};

function DateSlider({ selectedDate, onChange }: DateSliderProps) {
  return (
    <input
      type="range"
      min={0}
      max={7}
      value={selectedDate}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-64"
    />
  );
}

export default DateSlider;
