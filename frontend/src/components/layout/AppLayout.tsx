import MapView from "../map/MapView";

type AppLayoutProps = {
  children?: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Map Layer */}
      <div className="absolute inset-0">
        <MapView />
      </div>

      {/* UI Overlay Layer */}
      <div className="relative z-10 h-full w-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default AppLayout;

