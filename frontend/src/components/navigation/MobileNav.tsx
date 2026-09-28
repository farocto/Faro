import {
  ActionIcon,
  CityIcon,
  EditorialIcon,
} from "@/components/brand/FaroIcons";

import type { AppSection } from "@/types/navigation";

type MobileNavProps = {
  active: AppSection;
  onNavigate: (section: AppSection) => void;
  onAction: () => void;
};

function MobileNav({
  active,
  onNavigate,
  onAction,
}: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-3 border-t border-cloud-dark bg-cloud/95 px-2 py-2 backdrop-blur-md lg:hidden">
      <button
        type="button"
        onClick={() => onNavigate("city")}
        className={`flex flex-col items-center gap-1 py-1 text-[10px] font-semibold ${
          active === "city" ? "text-harbor" : "text-slate"
        }`}
      >
        <CityIcon
          size={19}
          strokeWidth={1.6}
          className={active === "city" ? "text-amber" : ""}
        />

        City
      </button>

      <button
        type="button"
        onClick={onAction}
        className="flex flex-col items-center gap-1 py-1 text-[10px] font-bold text-harbor"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-harbor text-amber">
          <ActionIcon size={17} strokeWidth={1.7} />
        </span>

        Prende
      </button>

      <button
        type="button"
        onClick={() => onNavigate("editorial")}
        className={`flex flex-col items-center gap-1 py-1 text-[10px] font-semibold ${
          active === "editorial" ? "text-harbor" : "text-slate"
        }`}
      >
        <EditorialIcon
          size={19}
          strokeWidth={1.6}
          className={
            active === "editorial" ? "text-amber" : ""
          }
        />

        Editorial
      </button>
    </nav>
  );
}

export default MobileNav;