import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does SEO AI Audit analyze websites?",
      a: "Our system initiates an automated technical crawl of the specified URL. It retrieves titles, headers hierarchy, robots files, XML sitemaps, semantic content density, load times, and mobile usability indices, and combines this live scan dataset with artificial intelligence models from Google Gemini to synthesize structured audit feedback, SEO priority scales, and difficulty-rated instructions."
    },
    {
      q: "What technical parameters are analyzed?",
      a: "We systematically scan 12 foundational categories, including robots.txt and sitemap registrations, SSL security certificates, header hierarchies, image alt attributes, duplicate parameters, mobile responsive media viewports, keyword densities, Core Web Vitals (LCP, CLS, INP, FCP, TTFB), and WCAG accessibility standards."
    },
    {
      q: "How accurate are the Gemini AI recommendations?",
      a: "The recommendations are highly contextualized. Unlike traditional static checkers that run on naive regex metrics, our engine cross-references semantic entities, checks keyword volume densities, and suggests topical coverage targets. The growth forecasts are modeled using historical optimization cohorts."
    },
    {
      q: "Are website audits truly unlimited?",
      a: "Yes. In collaboration with OSO Software Outsourcing, LLC, we offer completely unlimited scans, reports, history saves, and competitor gap comparisons. There are no pricing tiers, subscriptions, caps, or hidden restrictions for any user of the platform."
    },
    {
      q: "What exports are available?",
      a: "Users can print or export their analysis reports into self-contained PDF format executive files directly from the top utility bar, or share a unique URL index to highlight recommendations to active site developers."
    }
  ];

  return (
    <div className="rounded-3xl glass-panel p-6 sm:p-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase">
          Client Questions & Answers
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white mt-1.5 flex items-center justify-center gap-2">
          <HelpCircle className="h-5.5 w-5.5 text-blue-400" />
          Frequently Asked Questions
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Everything you need to know about our unlimited AI SEO crawler and grading platform.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div 
            key={idx} 
            className="rounded-2xl border border-white/5 bg-slate-950/40 transition-all hover:border-indigo-505/20 overflow-hidden"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between p-4.5 text-left font-bold text-xs sm:text-sm text-slate-200 hover:text-white transition-all focus:outline-none cursor-pointer"
            >
              <span className="pr-4">{faq.q}</span>
              {openIdx === idx ? (
                <ChevronUp className="h-4 w-4 text-indigo-400 shrink-0 animate-bounce" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-500 shrink-0" />
              )}
            </button>
            
            {openIdx === idx && (
              <div className="px-5 pb-5 text-xs text-slate-400 font-medium leading-relaxed border-t border-white/5 pt-4 animate-fadeIn">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
