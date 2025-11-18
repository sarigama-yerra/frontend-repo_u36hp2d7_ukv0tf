export default function HowItWorks() {
  const steps = [
    { title: 'Attach', desc: 'Order your Whoofsy QR + NFC tag and attach it to your pet’s collar.' },
    { title: 'Activate', desc: 'Scan once to activate, create your pet profile, set medical notes and contact.' },
    { title: 'Share', desc: 'Anyone can scan or tap your tag to view the urgent profile and contact you.' },
    { title: 'Upgrade', desc: 'Go Premium anytime for instant alerts, GPS snapshot and scan history.' },
  ]
  return (
    <section id="how" className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-white text-center">How Whoofsy works</h2>
      <p className="text-slate-300 text-center mt-3 max-w-2xl mx-auto">Designed for real-world reunions. No app required, no subscription needed to start.</p>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s) => (
          <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-lg font-semibold text-white">{s.title}</div>
            <div className="text-slate-300 mt-2 text-sm">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
