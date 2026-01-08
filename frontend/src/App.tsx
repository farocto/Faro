import AppLayout from "./components/layout/AppLayout";

function App() {
  return (
    <AppLayout>
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div className="bg-slate-900/80 backdrop-blur rounded-lg px-4 py-2 text-white">
          Faro MVP
        </div>
      </div>
    </AppLayout>
  );
}

export default App;
