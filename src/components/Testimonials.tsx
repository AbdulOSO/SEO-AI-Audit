import { Star, Shield, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote: "SEO AI Audit has replaced our expensive SEMrush keyword trackers. The unlimited analysis lets our developers test updates on dev scopes before they hit production, giving us huge agility gains.",
      author: "Sarah Jenkins",
      role: "SEO Architect, Apex Solutions",
      rating: 5
    },
    {
      quote: "The Gemini-powered content quality suggestions are superb. Instead of just flagging low word count, it specifies exactly what semantic topics and NLP entities we missed. Our search positions jumped from page 3 to 1 in weeks.",
      author: "Marcus Vance",
      role: "Lead Growth Engineer, StreamLine SaaS",
      rating: 5
    },
    {
      quote: "We execute hundreds of site crawls weekly on our client roster. Finding a premium platform with zero limits, zero paywalls, and robust, downloadable PDF exports was phenomenal. Big credits to OSO Software Outsourcing.",
      author: "Evelyn Zhao",
      role: "SEO Agency Principal, Ascent Digital",
      rating: 5
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase">
          Client Word of Mouth
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 flex items-center justify-center gap-2">
          <Quote className="h-5 w-5 text-purple-400 shrink-0" />
          Endorsed by Top Marketing Teams
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Reviews from seasoned SEO practitioners and performance webmasters using our intelligence system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((test, i) => (
          <div 
            key={i} 
            className="p-6 rounded-2xl glass-panel glass-panel-hover flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(test.rating)].map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed font-medium">
                &ldquo;{test.quote}&rdquo;
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-100 block">{test.author}</span>
                <span className="text-[10px] text-indigo-400 font-semibold">{test.role}</span>
              </div>
              <Shield className="h-4 w-4 text-indigo-500/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
