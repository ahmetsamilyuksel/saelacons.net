"use client";

import { useState, useEffect } from "react";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const ADMIN_KEY = "saelacons2024";

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [selected, setSelected] = useState<Submission | null>(null);

  const fetchData = async (key: string) => {
    try {
      const res = await fetch(`/api/submissions?key=${key}`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
        setAuthed(true);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_key");
    if (saved) fetchData(saved);
    else setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("admin_key", keyInput);
    setLoading(true);
    fetchData(keyInput);
  };

  const markRead = async (id: string) => {
    await fetch(`/api/submissions?key=${sessionStorage.getItem("admin_key") || ADMIN_KEY}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, read: true } : s))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a1020] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#0a1020] flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h1 className="text-2xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-gray-400 text-sm mb-6">Giriş yapmak için şifreyi girin</p>
          <input
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Admin şifresi"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500/50 outline-none mb-4"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            Giriş
          </button>
        </form>
      </div>
    );
  }

  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div className="min-h-screen bg-[#0a1020] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">SAELACONS Admin</h1>
            <p className="text-gray-400 text-sm">
              {submissions.length} mesaj{" "}
              {unreadCount > 0 && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-500/20 text-blue-400 ml-1">
                  {unreadCount} yeni
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => {
              sessionStorage.removeItem("admin_key");
              setAuthed(false);
            }}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Çıkış
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {submissions.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p>Henüz mesaj yok</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="lg:col-span-1 space-y-2 max-h-[calc(100vh-180px)] overflow-y-auto">
              {submissions.map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setSelected(sub);
                    if (!sub.read) markRead(sub.id);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selected?.id === sub.id
                      ? "border-blue-500/40 bg-blue-500/10"
                      : "border-white/5 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {!sub.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />
                        )}
                        <span className="font-medium text-sm truncate">{sub.name}</span>
                      </div>
                      <p className="text-gray-400 text-xs mt-1 truncate">{sub.subject}</p>
                    </div>
                    <span className="text-gray-600 text-xs shrink-0">
                      {new Date(sub.createdAt).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold">{selected.name}</h2>
                      <p className="text-gray-400 text-sm mt-1">{selected.subject}</p>
                    </div>
                    <span className="text-gray-500 text-xs">
                      {new Date(selected.createdAt).toLocaleString("tr-TR")}
                    </span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 rounded-xl p-3">
                      <span className="text-gray-500 text-xs block mb-1">E-posta</span>
                      <a href={`mailto:${selected.email}`} className="text-blue-400 text-sm hover:underline">
                        {selected.email}
                      </a>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <span className="text-gray-500 text-xs block mb-1">Telefon</span>
                      <a href={`tel:${selected.phone}`} className="text-blue-400 text-sm hover:underline">
                        {selected.phone}
                      </a>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3">
                      <span className="text-gray-500 text-xs block mb-1">WhatsApp</span>
                      <a
                        href={`https://wa.me/${selected.phone.replace(/[\s\-()]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 text-sm hover:underline"
                      >
                        Mesaj Gönder
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-6">
                    <span className="text-gray-500 text-xs block mb-2">Mesaj</span>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                      {selected.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 text-gray-600 text-sm">
                  Bir mesaj seçin
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
