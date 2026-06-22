import { useState, FormEvent } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Enterprise Custom SEO Tooling Integration");
  const [message, setMessage] = useState("");
  const [sentStatus, setSentStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setSentStatus("error");
      return;
    }

    setSentStatus("sending");
    // Simulate API delivery
    setTimeout(() => {
      setSentStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    }, 1200);
  };

  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Contact info column */}
        <div className="md:col-span-5 space-y-6">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase">
              Partner with OSO Team
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">Get in Touch</h3>
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              Have questions about integrating our intelligence crawlers directly with your custom enterprise database or CRM dashboard? Send us a brief note.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-white/5 text-blue-400 shrink-0">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Email us</span>
                <span className="text-xs text-slate-200 font-medium">contact@oso.software</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-white/5 text-purple-400 shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">HQ Office Location</span>
                <span className="text-xs text-slate-200 font-medium font-sans">Austin, Texas, United States</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-white/5 text-emerald-400 shrink-0">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-wider">Call Team Support</span>
                <span className="text-xs text-slate-200 font-medium">+1 (800) 555-OSO-SOFT</span>
              </div>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl border border-indigo-950/40 bg-indigo-950/10 text-[11px] text-indigo-300 leading-relaxed font-sans font-medium">
            <strong>OSO Software Outsourcing, LLC</strong> specialities include full-stack web architectures, enterprise scraping, database optimization, and scalable Gemini AI custom integrations.
          </div>
        </div>

        {/* Contact Form column */}
        <form onSubmit={handleSendMessage} className="md:col-span-7 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Your Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Joe Doe"
                className="block w-full rounded-xl border border-white/5 bg-slate-950/40 py-2.5 px-3.5 text-xs text-white placeholder-slate-705 focus:outline-none focus:border-indigo-505/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Your Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="joe@company.com"
                className="block w-full rounded-xl border border-white/5 bg-slate-950/40 py-2.5 px-3.5 text-xs text-white placeholder-slate-705 focus:outline-none focus:border-indigo-505/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Subject Matter</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="block w-full rounded-xl border border-white/5 bg-slate-950/45 py-2.5 px-3.5 text-xs text-slate-350 focus:outline-none focus:border-indigo-505/50 transition-colors cursor-pointer"
            >
              <option value="Enterprise Custom SEO Tooling Integration" className="bg-slate-950">Enterprise Custom SEO Tooling Integration</option>
              <option value="Custom Software Outsourcing (OSO Services)" className="bg-slate-950">Custom Software Outsourcing (OSO Services)</option>
              <option value="Bespoke Scraper / Crawlers" className="bg-slate-950">Bespoke Scraper / Crawlers</option>
              <option value="API Key Queries" className="bg-slate-950">API Key Queries</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">Message Body</label>
            <textarea 
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How can OSO LLC support your growth objectives?"
              className="block w-full rounded-xl border border-white/5 bg-slate-950/40 py-2.5 px-3.5 text-xs text-white placeholder-slate-705 focus:outline-none focus:border-indigo-505/50 focus:ring-0 resize-none font-sans"
            />
          </div>

          {sentStatus === "success" && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-950/30 border border-emerald-900/40 p-3.5 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Thank you! Your message has been sent successfully. Our outsourcing engineers will follow up shortly.</span>
            </div>
          )}

          {sentStatus === "error" && (
            <div className="flex items-center gap-2 rounded-xl bg-rose-950/30 border border-rose-900/40 p-3.5 text-xs text-rose-350">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Please fill in all the required entries correctly.</span>
            </div>
          )}

          <div className="text-right">
            <button
              type="submit"
              disabled={sentStatus === "sending"}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-xs font-bold text-white shadow-xl hover:shadow-indigo-600/15 transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              {sentStatus === "sending" ? "Sending..." : "Send Message"}
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
