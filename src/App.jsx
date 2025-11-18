import { Link } from "react-router-dom";
import OwnerDashboard from "./components/OwnerDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="relative min-h-screen p-8">
        <header className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Whoofsy" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Whoofsy</h1>
          </div>
          <nav className="text-slate-300 text-sm">
            <Link className="hover:text-white" to="/finder">Finder View</Link>
          </nav>
        </header>
        <main className="max-w-6xl mx-auto">
          <OwnerDashboard />
        </main>
      </div>
    </div>
  )
}

export default App
