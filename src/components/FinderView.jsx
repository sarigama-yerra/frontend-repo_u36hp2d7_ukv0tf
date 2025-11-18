import { useEffect, useState } from "react";

const apiBase = import.meta.env.VITE_BACKEND_URL || "";

export default function FinderView() {
  const [code, setCode] = useState("");
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLocation = () => new Promise((resolve) => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 4000 }
    );
  });

  const scan = async () => {
    setError("");
    try {
      setLoading(true);
      const loc = await getLocation();
      const res = await fetch(`${apiBase}/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, ...(loc || {}) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Scan failed");
      setPayload(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-6">
      <div className={`rounded-2xl p-6 border ${payload?.status === 'LOST' ? 'bg-red-950/80 border-red-700' : 'bg-slate-800/60 border-slate-700'}`}>
        <h1 className="text-2xl font-bold text-white mb-3">Whoofsy Finder</h1>
        <p className="text-slate-300 text-sm mb-4">Enter the tag code (auto-scanned via QR/NFC in production)</p>
        <div className="flex gap-2 mb-4">
          <input className="flex-1 bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2 text-white" placeholder="Tag code" value={code} onChange={(e)=>setCode(e.target.value)} />
          <button onClick={scan} disabled={!code || loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg px-4 py-2 text-white">Open Profile</button>
        </div>
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        {payload && (
          <div className="text-white">
            <div className="mb-4">
              <div className="text-sm uppercase tracking-wide opacity-80">Status</div>
              <div className="text-xl font-semibold">{payload.status}</div>
            </div>
            <div className="mb-4">
              <div className="text-sm uppercase tracking-wide opacity-80">Pet</div>
              <div className="text-lg">{payload.pet?.name || 'Unknown'}</div>
              {payload.pet?.medical?.allergies && <div className="text-red-300 text-sm">Allergies: {payload.pet.medical.allergies}</div>}
              {payload.pet?.medical?.notes && <div className="text-slate-300 text-sm">Notes: {payload.pet.medical.notes}</div>}
            </div>

            <div className="mb-4">
              <div className="text-sm uppercase tracking-wide opacity-80">Contact</div>
              {payload.contact?.visibility !== 'form' && payload.contact?.phone && (
                <a href={`tel:${payload.contact.phone}`} className="inline-block bg-emerald-600 hover:bg-emerald-500 rounded-lg px-4 py-2 text-white">Call Owner</a>
              )}
              {payload.contact?.visibility !== 'phone' && (
                <div className="mt-2">
                  <a href="#" className="text-blue-300 underline">Send a message</a>
                </div>
              )}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200">
              <div className="font-semibold mb-1">Good Samaritan Offer</div>
              <p className="text-sm">{payload.good_samaritan_offer?.copy}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
