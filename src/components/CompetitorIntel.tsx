import { useState } from "react";
import { Users, Search, Loader2, Sparkles, CheckCircle2, AlertTriangle, ShieldCheck, Zap, ArrowRight, TrendingUp, AlertCircle, FileText } from "lucide-react";

interface MetricRowProps {
  key?: number;
  name: string;
  yourScore: number;
  competitorScore: number;
  gap: number;
  advice: string;
}

function MetricRow({ name, yourScore, competitorScore, gap, advice }: MetricRowProps) {
  const isLoss = gap < 0;
  const isDraw = gap === 0;

  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-white/5 bg-slate-900/10 hover:border-slate-800 transition-all space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <span className="text-xs font-bold text-slate-100">{name}</span>
        <div className="flex items-center gap-4">
          <div className="text-[11px] text-slate-400">
            You: <strong className="text-slate-200">{yourScore}%</strong>
          </div>
          <div className="text-[11px] text-slate-400">
            Competitor: <strong className="text-indigo-400">{competitorScore}%</strong>
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold ${
            isLoss 
              ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
              : isDraw 
              ? "bg-slate-500/10 text-slate-400 border border-slate-500/10"
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          }`}>
            {isLoss ? `${gap}%` : isDraw ? "0%" : `+${gap}%`}
          </span>
        </div>
      </div>

      {/* Side-by-side Progress Bars */}
      <div className="space-y-1.5">
        <div className="relative w-full bg-slate-950 h-2 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-indigo-505 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500" 
            style={{ width: `${yourScore}%` }}
          />
        </div>
        <div className="relative w-full bg-slate-950 h-2 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-purple-504 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full opacity-60 transition-all duration-500" 
            style={{ width: `${competitorScore}%` }}
          />
        </div>
      </div>

      <p className="text-[10px] text-slate-450 italic leading-relaxed">
        {advice}
      </p>
    </div>
  );
}

export default function CompetitorIntel() {
  const [yourWeb, setYourWeb] = useState("");
  const [compWeb, setCompWeb] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorText, setErrorText] = useState("");
  const [gapReport, setGapReport] = useState<any>(null);

  const loadingSteps = [
    "Establishing multi-threaded connection to target domains...",
    "Crawling site architecture and caching metadata keys...",
    "Executing rendering latency and Core Web Vitals speed check...",
    "Querying authoritative keyword rankings and partner backlinks profiles...",
    "Engaging OSO AI framework models for side-by-side alignment..."
  ];

  const handleCompare = async () => {
    if (!yourWeb || !compWeb) {
      setErrorText("Please provide both your domain and the competitor domain.");
      return;
    }

    setErrorText("");
    setLoading(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
    }, 1500);

    try {
      const response = await fetch("/api/analyze-competitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          yourWebsite: yourWeb.trim(),
          competitorWebsite: compWeb.trim()
        })
      });

      if (!response.ok) {
        throw new Error("Unable to analyze comparative domains. Please verify syntax.");
      }

      const data = await response.json();
      setGapReport(data);
    } catch (err: any) {
      setErrorText(err.message || "Failed running comparative audit. Attempting model reset...");
    } finally {
      clearInterval(stepInterval);
      setLoading(false);
    }
  };

  const setSampleData = (yourSample: string, compSample: string) => {
    setYourWeb(yourSample);
    setCompWeb(compSample);
  };

  return (
    <div className="space-y-8" id="competitor-intel-root">
      
      {/* Top Description Panel Header */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/20 p-5 sm:p-6 backdrop-blur-md">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-black text-white">Competitor Gap Comparison Intel</h3>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Launch real-time side-by-side gap analyzes tracking absolute performance variables. Contrast technical parameters, authority metrics, and unlock strategic paths to secure search dominance.
            </p>
          </div>
        </div>

        {/* Demo Fast Preset trigger */}
        <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Quick Samples:</span>
          <button 
            onClick={() => setSampleData("nike.com", "adidas.com")}
            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-bold text-slate-300 transition-all cursor-pointer"
          >
            Nike vs Adidas (Athletic)
          </button>
          <button 
            onClick={() => setSampleData("shopify.com", "woocommerce.com")}
            className="px-2.5 py-1 bg-white/5 hover:bg-white/10 rounded text-[10px] font-bold text-slate-300 transition-all cursor-pointer"
          >
            Shopify vs WooCommerce (SaaS)
          </button>
        </div>
      </div>

      {/* Dual Inputs Card Form */}
      <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
              Your Website Domain
            </label>
            <div className="relative">
              <input
                type="text"
                value={yourWeb}
                onChange={(e) => setYourWeb(e.target.value)}
                placeholder="e.g., yoursite.com"
                disabled={loading}
                className="w-full bg-slate-950/80 rounded-xl border border-white/5 py-3 px-4 pl-10 text-xs text-slate-200 placeholder-slate-650 focus:outline-none focus:border-indigo-500/60 min-h-[44px]"
              />
              <Search className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-wider">
              Competitor Website Domain
            </label>
            <div className="relative">
              <input
                type="text"
                value={compWeb}
                onChange={(e) => setCompWeb(e.target.value)}
                placeholder="e.g., competitor.com"
                disabled={loading}
                className="w-full bg-slate-950/80 rounded-xl border border-white/5 py-3 px-4 pl-10 text-xs text-slate-200 placeholder-slate-650 focus:outline-none focus:border-indigo-500/60 min-h-[44px]"
              />
              <Users className="absolute left-3.5 top-3.5 h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>
        </div>

        {errorText && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-2 text-rose-400 text-xs text-left">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorText}</span>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleCompare}
            disabled={loading}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-900 text-xs font-bold text-white shadow-xl shadow-indigo-600/20 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span>Comparing Domains...</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 text-amber-300" />
                <span>Analyze Competitor Gaps</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress States for Real-Time Analysis */}
      {loading && (
        <div className="p-8 border border-white/5 bg-slate-900/20 rounded-2xl flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="h-12 w-12 rounded-full border border-indigo-500/10 border-t-indigo-500 animate-spin" />
            <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-indigo-400 animate-pulse" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest block">
              Step {loadingStep + 1} of {loadingSteps.length}
            </span>
            <p className="text-sm font-bold text-slate-200 animate-pulse">
              {loadingSteps[loadingStep]}
            </p>
          </div>
        </div>
      )}

      {/* COMPLETED GAP COMPARISON VIEWS */}
      {gapReport && !loading && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Section: Overall Scores Comparative Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 sm:p-6 rounded-2xl border border-white/15 bg-slate-900/30 text-left space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wide">Primary Domain</span>
                  <h4 className="text-base font-black text-white mt-1 break-all">{gapReport.yourWebsite.url}</h4>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-slate-100">{gapReport.yourWebsite.seoScore}</span>
                  <span className="text-slate-500 text-xs font-bold block">SEO SCORE</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Core Strengths</span>
                <ul className="space-y-1.5 text-xs text-slate-350">
                  {gapReport.yourWebsite.strengths?.map((str: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-white/5 space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Primary Weaknesses</span>
                <ul className="space-y-1.5 text-xs text-slate-350">
                  {gapReport.yourWebsite.weaknesses?.map((weak: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-slate-900/15 text-left space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-wide">Competitor Domain</span>
                  <h4 className="text-base font-black text-white mt-1 break-all">{gapReport.competitorWebsite.url}</h4>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black text-indigo-400">{gapReport.competitorWebsite.seoScore}</span>
                  <span className="text-slate-500 text-xs font-bold block">SEO SCORE</span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/5 space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Core Strengths</span>
                <ul className="space-y-1.5 text-xs text-slate-350">
                  {gapReport.competitorWebsite.strengths?.map((str: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/60 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-white/5 space-y-2">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Primary Weaknesses</span>
                <ul className="space-y-1.5 text-xs text-slate-350">
                  {gapReport.competitorWebsite.weaknesses?.map((weak: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-500/60 shrink-0 mt-0.5" />
                      <span>{weak}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Side-by-Side Horizontal Comparison Metrics */}
          <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-slate-900/40 text-left space-y-5">
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest block leading-none">
                Comparative Vectors Panel
              </span>
              <p className="text-[11px] text-slate-400 mt-1">
                Visual alignment comparing performance scores. Green gaps represent active leads; pink and rose badges define priority improvement targets.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {gapReport.comparison?.map((row: any, i: number) => (
                <MetricRow
                  key={i}
                  name={row.metric}
                  yourScore={row.yourScore}
                  competitorScore={row.competitorScore}
                  gap={row.gap}
                  advice={row.actionableAdvice}
                />
              ))}
            </div>
          </div>

          {/* Actionable Recommendations to closes gaps */}
          <div className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-slate-900/40 text-left space-y-5">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <div>
                <span className="text-xs font-black text-white block">Competitor Gap Strategic Recommendations</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Custom action steps mapping clear paths to intercept and bypass competitor.</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {gapReport.actionableRecommendations?.map((rec: any, idx: number) => (
                <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-white/5 flex gap-4 items-start">
                  <div className="p-2 bg-indigo-500/10 text-indigo-300 rounded-lg text-xs font-bold leading-none shrink-0 uppercase tracking-wider">
                    {rec.priority || "High"}
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-100 block leading-tight">{rec.issue}</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed"><strong className="text-indigo-400">Impact: </strong>{rec.impact}</p>
                    
                    <div className="relative overflow-hidden py-2 px-3 rounded-xl bg-slate-900/50 border border-white/5 flex gap-2 items-start mt-2">
                      <ArrowRight className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-slate-300 italic">
                        <strong className="text-xs font-bold text-slate-200 not-italic block mb-0.5">Fix & Optimization Plan:</strong>
                        {rec.fix}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
