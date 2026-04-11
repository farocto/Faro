type CreateEventButtonProps = {
  onClick?: () => void;
};

function CreateEventButton({ onClick }: CreateEventButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex items-center gap-2
        rounded-xl bg-red-600 px-4 py-3
        text-sm font-semibold text-white
        shadow-lg transition
        hover:bg-red-500
        focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-black
      "
      aria-label="Create event"
      title="Create event"
    >
      <span className="text-lg leading-none">+</span>
      <span>Create Event</span>
    </button>
  );
}

export default CreateEventButton;