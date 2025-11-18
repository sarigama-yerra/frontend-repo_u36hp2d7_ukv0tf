export default function Products() {
  const products = [
    { name: 'Whoofsy Smart Tag', price: '$16', desc: 'Slim QR + NFC tag. Waterproof. Works with any phone.', cta: 'Buy Tag' },
    { name: 'Whoofsy Smart Case', price: '$21', desc: 'QR + NFC + AirTag-ready protective case.', cta: 'Buy Case' },
  ]
  return (
    <section id="buy" className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col lg:flex-row items-start gap-8">
        <div className="lg:w-2/3">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Choose your tag</h2>
          <p className="text-slate-300 mt-3 max-w-2xl">Both include free Basic features forever. Upgrade anytime to Premium for pro-level protection.</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map(p => (
              <div key={p.name} className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col">
                <div className="text-xl font-semibold text-white">{p.name}</div>
                <div className="text-slate-300 mt-1">{p.desc}</div>
                <div className="mt-4 text-2xl font-bold text-emerald-300">{p.price}</div>
                <a href="#checkout" className="mt-6 inline-flex items-center justify-center rounded-lg bg-blue-500 hover:bg-blue-600 px-5 py-3 text-white font-medium transition">
                  {p.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
          <div className="text-lg font-semibold text-white">What’s included</div>
          <ul className="mt-4 space-y-3 text-slate-300 text-sm">
            <li>• Unlimited scans, link to one pet</li>
            <li>• Owner contact visibility controls</li>
            <li>• Medical notes and care instructions</li>
            <li>• Lost/Active status toggle</li>
            <li>• Premium trial available</li>
          </ul>
          <div className="mt-6 text-slate-400 text-xs">Ships in 2–3 days. 30‑day money‑back guarantee.</div>
        </div>
      </div>
    </section>
  )
}
