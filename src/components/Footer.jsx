export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 py-10 text-slate-400 text-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/flame-icon.svg" alt="Whoofsy" className="w-6 h-6" />
          <span>© {new Date().getFullYear()} Whoofsy</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#buy" className="hover:text-white">Buy</a>
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
        </div>
      </div>
    </footer>
  )
}
