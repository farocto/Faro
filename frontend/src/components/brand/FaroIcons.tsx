interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function CityIcon({
  size = 20,
  className = "",
  strokeWidth = 1.6,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21h18" />
      <path d="M4 21V10l4-2.5V21" />
      <path d="M8 21V7l4-3v17" />
      <path d="M12 21V5l4 2.5V21" />
      <path d="M16 21V10l4 2.5V21" />
      <path d="M6 13h.01M6 17h.01M10 10h.01M10 14h.01M10 18h.01M14 13h.01M14 17h.01M18 14h.01M18 18h.01" />
    </svg>
  );
}

export function EditorialIcon({
  size = 20,
  className = "",
  strokeWidth = 1.6,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export function ActionIcon({
  size = 20,
  className = "",
  strokeWidth = 1.6,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" fill="currentColor" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1" />
    </svg>
  );
}