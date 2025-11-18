import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Products from "./components/Products";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" alt="Whoofsy" className="w-9 h-9" />
          <span className="text-xl font-bold">Whoofsy</span>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-slate-300 text-sm">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#buy" className="hover:text-white">Buy</a>
          <a href="#" className="hover:text-white">Support</a>
          <a href="#buy" className="inline-flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white font-medium transition">Get a Tag</a>
        </nav>
      </header>

      <main>
        <Hero />
        <HowItWorks />
        <Products />
      </main>

      <Footer />
    </div>
  )
}

export default App
