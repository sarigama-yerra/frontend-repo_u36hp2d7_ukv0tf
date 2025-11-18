import { useEffect, useMemo, useState } from "react";

const apiBase = import.meta.env.VITE_BACKEND_URL || "";

export default function OwnerDashboard() {
  const [auth, setAuth] = useState({ email: "", name: "" });
  const [user, setUser] = useState(null);

  const [code, setCode] = useState("");
  const [pet, setPet] = useState({ name: "", breed: "", color: "", allergies: "", medical_notes: "", contact_visibility: "phone" });
  const [linked, setLinked] = useState({});

  const [status, setStatus] = useState("ACTIVE");
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canActivate = user && code.length > 0;
  const canCreatePet = user && pet.name.trim().length > 0;

  const premiumPitch = useMemo(() => ([
    { title: "Instant Scan Alerts", desc: "Get notified the moment someone scans your tag" },
    { title: "Precise GPS at Scan", desc: "See the exact location snapshot" },
    { title: "Scan History & Analytics", desc: "Track when and where your pet was scanned" },
    { title: "Family Sharing", desc: "Add family, sitters, and neighbors" },
  ]), []);

  const signIn = async () => {
    setError("");
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(auth),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Sign-in failed");
      setUser(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const activate = async () => {
    setError("");
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/tags/activate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, user_id: user.id, model: "smart_tag" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Activation failed");
      setLinked((l) => ({ ...l, tag: data }));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const createPet = async () => {
    setError("");
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/pets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...pet, owner_id: user.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Failed to create pet");
      setPet((p) => ({ ...p, id: data.id }));
      setLinked((l) => ({ ...l, pet: data }));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const link = async () => {
    setError("");
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/tags/link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, pet_id: pet.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Failed to link");
      setLinked((l) => ({ ...l, linked: data.success }));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async () => {
    if (!pet.id) return;
    const next = status === "ACTIVE" ? "LOST" : "ACTIVE";
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/pets/${pet.id}/status?status=${next}`, { method: "PATCH" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Failed to update status");
      setStatus(data.status);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const testMyTag = async () => {
    setError("");
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/scan/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || "Test failed");
      setTestResult(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (linked?.pet?.status) setStatus(linked.pet.status);
  }, [linked]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 text-white">
      <h1 className="text-3xl font-bold mb-2">Whoofsy Owner Dashboard</h1>
      <p className="text-slate-300 mb-8">Activate your tag, set up your pet, and test your safety net.</p>

      {!user ? (
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Sign in with Google (mock)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <input className="bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2" placeholder="Email" value={auth.email} onChange={(e)=>setAuth(a=>({...a,email:e.target.value}))} />
            <input className="bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2" placeholder="Name" value={auth.name} onChange={(e)=>setAuth(a=>({...a,name:e.target.value}))} />
            <button onClick={signIn} disabled={loading || !auth.email} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg px-4 py-2">Sign In</button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      ) : (
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-300 text-sm">Signed in as</p>
              <p className="font-semibold">{user.name || user.email}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">Tier: {user.tier}</span>
          </div>
        </div>
      )}

      {user && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
            <h3 className="font-semibold mb-3">Activate Tag</h3>
            <div className="flex gap-2">
              <input className="flex-1 bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2" placeholder="Enter tag code" value={code} onChange={(e)=>setCode(e.target.value)} />
              <button onClick={activate} disabled={!canActivate || loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg px-4 py-2">Activate</button>
            </div>
            {linked.tag && <p className="text-emerald-300 text-sm mt-2">Tag activated</p>}
          </div>

          <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-6">
            <h3 className="font-semibold mb-3">Create Pet Profile</h3>
            <div className="grid grid-cols-1 gap-2 mb-2">
              <input className="bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2" placeholder="Pet name" value={pet.name} onChange={(e)=>setPet(p=>({...p,name:e.target.value}))} />
              <div className="grid grid-cols-2 gap-2">
                <input className="bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2" placeholder="Breed" value={pet.breed} onChange={(e)=>setPet(p=>({...p,breed:e.target.value}))} />
                <input className="bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2" placeholder="Color" value={pet.color} onChange={(e)=>setPet(p=>({...p,color:e.target.value}))} />
              </div>
              <input className="bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2" placeholder="Allergies" value={pet.allergies} onChange={(e)=>setPet(p=>({...p,allergies:e.target.value}))} />
              <textarea className="bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2" placeholder="Medical notes" value={pet.medical_notes} onChange={(e)=>setPet(p=>({...p,medical_notes:e.target.value}))} />
              <select className="bg-slate-900/70 border border-slate-700 rounded-lg px-3 py-2" value={pet.contact_visibility} onChange={(e)=>setPet(p=>({...p,contact_visibility:e.target.value}))}>
                <option value="phone">Show phone</option>
                <option value="form">Contact form only</option>
                <option value="both">Phone + Form</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={createPet} disabled={!canCreatePet || loading} className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-lg px-4 py-2">Save Profile</button>
              <button onClick={link} disabled={!linked.tag || !pet.id || loading} className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 rounded-lg px-4 py-2">Link Tag</button>
            </div>
            {linked.linked && <p className="text-emerald-300 text-sm mt-2">Tag linked to pet</p>}
          </div>
        </div>
      )}

      {pet?.id && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`rounded-xl p-6 border ${status === "LOST" ? "bg-red-950/40 border-red-700" : "bg-slate-800/60 border-slate-700"}`}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Status</h3>
              <span className={`text-xs px-2 py-1 rounded-full border ${status === "LOST" ? "bg-red-500/20 text-red-200 border-red-400/40" : "bg-emerald-500/20 text-emerald-200 border-emerald-400/40"}`}>{status}</span>
            </div>
            <p className="text-slate-300 text-sm mb-3">Switch to LOST to enable the urgent red finder view.</p>
            <button onClick={toggleStatus} className={`rounded-lg px-4 py-2 ${status === "LOST" ? "bg-emerald-600 hover:bg-emerald-500" : "bg-red-600 hover:bg-red-500"}`}>{status === "LOST" ? "Mark Active" : "Mark LOST"}</button>
          </div>

          <div className="rounded-xl p-6 border bg-slate-800/60 border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Test My Tag</h3>
            </div>
            <p className="text-slate-300 text-sm mb-3">Simulate a finder scan and see exactly what they see.</p>
            <button onClick={testMyTag} disabled={!code} className="rounded-lg px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50">Run Test</button>
            {testResult && (
              <div className="mt-4 text-sm">
                <div className={`px-3 py-2 rounded-lg mb-2 ${testResult.status === 'LOST' ? 'bg-red-900/40 border border-red-700 text-red-100' : 'bg-emerald-900/40 border border-emerald-700 text-emerald-100'}`}>Finder view status: {testResult.status}</div>
                <p className="text-slate-300">Contact visibility: <span className="font-mono">{testResult?.contact?.visibility}</span></p>
                {testResult?.premium_alert && (
                  <p className="text-emerald-300 mt-1">Premium alert would be delivered (email).</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Premium Upsell */}
      <div className="mt-8 bg-gradient-to-br from-slate-800/80 to-slate-900/60 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-1">Upgrade to Premium</h3>
            <p className="text-slate-300 mb-3">Sell absolute peace of mind: instant scan alerts, precise GPS, and full history.</p>
            <ul className="grid sm:grid-cols-2 gap-2 mb-4">
              {premiumPitch.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-200"><span className="text-emerald-400">✔</span> <div><p className="font-medium">{f.title}</p><p className="text-slate-400 text-sm">{f.desc}</p></div></li>
              ))}
            </ul>
          </div>
          <div className="text-right min-w-[200px]">
            <div className="text-3xl font-bold">$99<span className="text-base font-medium">/yr</span></div>
            <div className="text-slate-400 text-sm">or $15/month</div>
            <button className="mt-3 w-full bg-emerald-600 hover:bg-emerald-500 rounded-lg px-4 py-2">Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  );
}
