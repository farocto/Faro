import { FaroLogo } from "@/components/brand/FaroLogo";
import {
  ActionIcon,
  CityIcon,
  EditorialIcon,
} from "@/components/brand/FaroIcons";

import type { AppSection } from "@/types/navigation";

type FaroSidebarProps = {
  active: AppSection;
  onNavigate: (section: AppSection) => void;
  onAction: () => void;
};

const navItems = [
  {
    id: "city" as const,
    label: "City",
    Icon: CityIcon,
  },
  {
    id: "editorial" as const,
    label: "Editorial",
    Icon: EditorialIcon,
  },
];

function FaroSidebar({
  active,
  onNavigate,
  onAction,
}: FaroSidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-dvh w-[240px] flex-col border-r border-cloud-dark bg-cloud lg:flex">
      <div className="border-b border-cloud-dark px-5 py-6">
        <FaroLogo />
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-3 py-6">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = active === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all ${
                isActive
                  ? "bg-harbor-soft"
                  : "hover:bg-harbor-soft/50"
              }`}
            >
              <span
                className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                  isActive
                    ? "bg-harbor text-amber"
                    : "text-slate group-hover:text-harbor"
                }`}
              >
                <Icon size={19} strokeWidth={1.6} />

                {isActive && (
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-amber ring-2 ring-cloud" />
                )}
              </span>

              <span
                className={`text-sm font-semibold ${
                  isActive
                    ? "text-harbor"
                    : "text-slate group-hover:text-harbor"
                }`}
              >
                {label}
              </span>

              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-amber" />
              )}
            </button>
          );
        })}

        <div className="my-3 border-t border-cloud-dark" />

        <button
          type="button"
          onClick={onAction}
          className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-harbor-soft/50"
        >
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-harbor text-amber shadow-md transition-all group-hover:bg-night">
            <ActionIcon size={20} strokeWidth={1.6} />

            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-amber ring-2 ring-cloud" />
          </span>

          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-editorial text-amber">
              Prende la Luz
            </span>

            <span className="text-xs font-medium text-slate">
              Share with Faro
            </span>
          </div>
        </button>
      </nav>

      <div className="border-t border-cloud-dark px-5 py-5">
        <p className="text-[9px] font-semibold uppercase tracking-editorial text-slate">
          Sigue la luz
        </p>

        <p className="mt-1.5 text-xs text-slate">
          Santo Domingo
        </p>
      </div>
    </aside>
  );
}

export default FaroSidebar;