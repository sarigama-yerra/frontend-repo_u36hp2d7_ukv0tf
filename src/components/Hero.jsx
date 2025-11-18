export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.35),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(139,92,246,0.35),transparent_50%)]" />
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-slate-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Lost-pet reunions made effortless
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
          Smart pet tags that bring them home faster
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
          Whoofsy QR + NFC tags let anyone scan or tap to see your pet’s urgent profile and contact you instantly.
          Upgrade to Premium for instant scan alerts, GPS snapshot, history and family sharing.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#buy" className="inline-flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 px-6 py-3 text-white font-medium shadow-lg shadow-blue-500/20 transition">
            Get your Whoofsy Tag
          </a>
          <a href="#how" className="inline-flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 px-6 py-3 text-white font-medium transition">
            How it works
          </a>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {[
            {k:"Free forever", v:"Owner contact visibility, medical notes, digital profile, lost/active toggle."},
            {k:"Premium", v:"Instant scan alerts, precise GPS snapshot, scan history & analytics, family sharing."},
            {k:"NFC + QR", v:"Works from any phone camera or a single tap—no app required."},
            {k:"Privacy-first", v:"You control what’s visible. No tracking until someone scans your tag."},
          ].map((item)=> (
            <div key={item.k} className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm text-slate-300 font-medium">{item.k}</div>
              <div className="text-slate-400 text-sm mt-1">{item.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
