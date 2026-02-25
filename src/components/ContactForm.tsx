"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const countryCodes = [
  { code: "+7", country: "RU", flag: "🇷🇺" },
  { code: "+90", country: "TR", flag: "🇹🇷" },
  { code: "+1", country: "US", flag: "🇺🇸" },
  { code: "+44", country: "GB", flag: "🇬🇧" },
  { code: "+49", country: "DE", flag: "🇩🇪" },
  { code: "+33", country: "FR", flag: "🇫🇷" },
  { code: "+971", country: "AE", flag: "🇦🇪" },
  { code: "+86", country: "CN", flag: "🇨🇳" },
  { code: "+82", country: "KR", flag: "🇰🇷" },
  { code: "+81", country: "JP", flag: "🇯🇵" },
];

interface ContactFormProps {
  dict: {
    contact: {
      form: {
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
        send: string;
        sending: string;
        success: string;
        error: string;
      };
    };
  };
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [selectedCode, setSelectedCode] = useState("+7");
  const [codeOpen, setCodeOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [phone, setPhone] = useState("");

  const selectedCountry = countryCodes.find((c) => c.code === selectedCode);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: `${selectedCode} ${phone}`,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setPhone("");
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {dict.contact.form.name}
          </label>
          <input
            name="name"
            type="text"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all outline-none"
            placeholder={dict.contact.form.name}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {dict.contact.form.email}
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all outline-none"
            placeholder={dict.contact.form.email}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Phone with country code */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {dict.contact.form.phone}
          </label>
          <div className="flex gap-2">
            {/* Country code selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCodeOpen(!codeOpen)}
                className="flex items-center gap-1.5 px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white hover:border-gold/30 transition-all h-full min-w-[90px]"
              >
                <span className="text-base">{selectedCountry?.flag}</span>
                <span className="text-sm">{selectedCode}</span>
                <svg className={`w-3 h-3 text-gray-400 transition-transform ${codeOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {codeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-36 glass-dark rounded-xl border border-white/10 shadow-2xl shadow-black/50 z-50 max-h-48 overflow-y-auto"
                  >
                    {countryCodes.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setSelectedCode(c.code);
                          setCodeOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 transition-colors ${
                          selectedCode === c.code ? "text-gold" : "text-gray-300"
                        }`}
                      >
                        <span>{c.flag}</span>
                        <span>{c.country}</span>
                        <span className="text-gray-500 ml-auto">{c.code}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Phone number */}
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {dict.contact.form.subject}
          </label>
          <input
            name="subject"
            type="text"
            required
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all outline-none"
            placeholder={dict.contact.form.subject}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {dict.contact.form.message}
        </label>
        <textarea
          name="message"
          rows={6}
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-all resize-none outline-none"
          placeholder={dict.contact.form.message}
        />
      </div>

      {/* Status messages */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {dict.contact.form.success}
          </motion.div>
        )}
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm"
          >
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {dict.contact.form.error}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {status === "sending" ? dict.contact.form.sending : dict.contact.form.send}
      </button>
    </form>
  );
}
