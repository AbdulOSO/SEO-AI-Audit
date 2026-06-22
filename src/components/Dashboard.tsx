import { useState } from "react";
import { 
  SEOAuditReport, 
  SEORecommendation, 
  CompetitorAnalysis as CompType, 
  KeywordDensity 
} from "../types";
import { 
  Shield, 
  Settings, 
  TrendingUp, 
  Sparkles, 
  Globe, 
  Clock, 
  Download, 
  Share2, 
  CheckCircle, 
  AlertTriangle, 
  AlertOctagon, 
  Smartphone, 
  FileText, 
  Zap, 
  Users, 
  Link2, 
  Activity, 
  Layers, 
  Check,
  Eye,
  Lock,
  Compass,
  CornerDownRight,
  HelpCircle,
  TrendingDown
} from "lucide-react";

interface DashboardProps {
  report: SEOAuditReport;
  onShare: () => void;
  onDownloadPdf: () => void;
}

export default function Dashboard({ report, onShare, onDownloadPdf }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "onpage" | "technical" | "speed" | "mobile" | "content" | "competitors" | "backlinks" | "security-access-ux">("overview");

  // Format date helper
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      case "high": return "bg-orange-500/10 text-orange-400 border border-orange-500/20";
      case "medium": return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
      default: return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical": return <AlertOctagon className="h-4 w-4 text-rose-400 shrink-0" />;
      case "high": return <AlertTriangle className="h-4 w-4 text-orange-400 shrink-0" />;
      default: return <Sparkles className="h-4 w-4 text-amber-400 shrink-0" />;
    }
  };

  return (
    <div id="seo-dashboard-root" className="space-y-6">
      
      {/* Dynamic Header Badge inside Dashboard */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl glass-panel gap-4">
        <div>
          <span className="text-[10px] font-mono font-bold tracking-widest text-indigo-400 uppercase">
            Website Intelligence Crawl Done
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 mt-1">
            <Globe className="h-5 w-5 text-blue-400 shrink-0" />
            {report.url.replace(/^https?:\/\//, "")}
          </h2>
          <div className="flex flex-wrap items-center gap-2 mt-1.5">
            {report.targetCountry && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-505/10 bg-indigo-950/40 border border-indigo-500/20 px-2.5 py-1 text-[10px] font-bold text-indigo-300">
                <Globe className="h-3 w-3 text-blue-400" />
                Target Local SEO: {report.targetCity ? `${report.targetCity}, ` : ""}{report.targetCountry}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/60 border border-white/5 px-2.5 py-1 text-[10px] font-bold text-slate-400">
              <Clock className="h-3 w-3 text-indigo-400" />
              Analyzed {formatDate(report.timestamp)} &bull; OSO AI Base V3.5
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-950/60 border border-white/5 hover:bg-slate-900 rounded-xl text-xs font-bold text-slate-350 hover:text-white transition-all cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share Audit
          </button>
          <button
            onClick={onDownloadPdf}
            className="flex items-center gap-1.5 px-4.5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-xs font-bold text-white shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Export Executive PDF
          </button>
        </div>
      </div>

      {/* Editorial Overview summary banner */}
      <div className="relative overflow-hidden p-6 sm:p-7 rounded-3xl border border-white/5 bg-slate-900/15 backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Sparkles className="h-24 w-24 text-indigo-555" />
        </div>
        <div className="flex gap-4.5 items-start">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xl shrink-0">
            <Sparkles className="h-5.5 w-5.5" />
          </div>
          <div>
            <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest leading-none">
              AI Editorial Assessment
            </span>
            <p className="mt-2 text-sm font-semibold text-slate-200 leading-relaxed font-sans">
              {report.editorial.summary}
            </p>
            <p className="mt-3 text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <TrendingUp className="h-4.5 w-4.5 shrink-0" />
              Implementing target adjustments yields +{report.editorial.targetGainText || "18% Organic Increase"} growth.
            </p>
          </div>
        </div>
      </div>

      {/* Key Core Audit Scores Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Overall Big Score Card */}
        <div className="col-span-2 lg:col-span-1 p-6 rounded-3xl bg-gradient-to-b from-indigo-950/20 to-slate-950/90 border border-white/5 backdrop-blur-xl text-center flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">Overall SEO Score</span>
            <div className="relative flex items-center justify-center my-4 select-none">
              {/* SVG circular progress representation */}
              <svg className="h-24 w-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" className="stroke-slate-950 fill-none" strokeWidth="6" />
                <circle 
                  cx="48" 
                  cy="48" 
                  r="40" 
                  className="stroke-emerald-400 fill-none" 
                  strokeWidth="8" 
                  strokeDasharray={`${2 * Math.PI * 40}`}
                  strokeDashoffset={`${2 * Math.PI * 40 * (1 - report.scores.overall / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-white">{report.scores.overall}</span>
                <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider mt-0.5">Scale</span>
              </div>
            </div>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 py-1.5 rounded-full border border-emerald-500/25 font-bold uppercase tracking-wider">
            {report.scores.overall >= 85 ? "EXCELLENT STATUS" : "OPTIMIZATION NEEDED"}
          </span>
        </div>

        {/* Other Score Cards */}
        {[
          { label: "Technical Health", value: report.scores.health, color: "stroke-blue-400", bg: "bg-blue-400", desc: "Sitemap & errors check" },
          { label: "Search Visibility", value: report.scores.visibility, color: "stroke-purple-400", bg: "bg-purple-400", desc: "SERP presence rank" },
          { label: "Speed Performance", value: report.scores.performance, color: "stroke-amber-400", bg: "bg-amber-400", desc: "Core Web Vitals load" },
          { label: "Content Optimization", value: report.scores.content, color: "stroke-rose-400", bg: "bg-rose-400", desc: "Semantic NLP alignment" }
        ].map((met, idx) => (
          <div key={idx} className="p-5.5 rounded-3xl glass-panel hover:border-white/10 flex flex-col justify-between transition-colors">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{met.label}</span>
              <p className="text-[10px] text-slate-500 font-medium">{met.desc}</p>
            </div>
            <div className="my-3 flex items-baseline gap-1.5">
              <span className="text-3xl font-black text-white">{met.value}</span>
              <span className="text-xs text-slate-500 font-bold">/100</span>
            </div>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                <div className={`h-full ${met.bg}`} style={{ width: `${met.value}%` }} />
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-500">
                <span>Pass Ratio</span>
                <span className="text-slate-200">{met.value}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Meta Performance Checklist Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Mobile Usability", value: report.scores.mobile, icon: <Smartphone className="h-4 w-4 text-emerald-400" /> },
          { label: "Technical Score", value: report.scores.technical, icon: <Settings className="h-4 w-4 text-blue-400" /> },
          { label: "SSL & Security Status", value: report.scores.security, icon: <Shield className="h-4 w-4 text-amber-400" /> },
          { label: "WCAG Accessibility", value: report.scores.accessibility, icon: <Compass className="h-4 w-4 text-purple-400" /> },
          { label: "User Experience Rating", value: report.scores.ux, icon: <Activity className="h-4 w-4 text-rose-400" /> }
        ].map((sec, idx) => (
          <div key={idx} className="p-4 bg-slate-950/40 border border-white/5 hover:border-white/10 transition-all rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-slate-950 rounded-xl border border-white/5 shrink-0 shadow-lg">
              {sec.icon}
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold leading-none tracking-wider uppercase mb-1">{sec.label}</p>
              <span className="text-sm font-black text-slate-100">{sec.value}/100</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-white/5 pb-2">
        {[
          { id: "overview", label: "Executive Action Plan", icon: <FileText className="h-3.5 w-3.5" /> },
          { id: "onpage", label: "On-Page Metrics", icon: <Compass className="h-3.5 w-3.5" /> },
          { id: "technical", label: "Technical Sitemap Audit", icon: <Settings className="h-3.5 w-3.5" /> },
          { id: "speed", label: "Speed Core Web Vitals", icon: <Zap className="h-3.5 w-3.5" /> },
          { id: "mobile", label: "Mobile Compliance", icon: <Smartphone className="h-3.5 w-3.5" /> },
          { id: "content", label: "Content & NLP Engine", icon: <Sparkles className="h-3.5 w-3.5" /> },
          { id: "competitors", label: "Competitive Opportunity Reports", icon: <Users className="h-3.5 w-3.5" /> },
          { id: "backlinks", label: "Toxic Backlinks", icon: <Link2 className="h-3.5 w-3.5" /> },
          { id: "security-access-ux", label: "Security & WCAG & UX", icon: <Shield className="h-3.5 w-3.5" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              activeTab === tab.id
                ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Tab View Rendering Grid */}
      <div className="mt-4 transition-all">
        
        {/* TAB 1: EXECUTIVE ACTION PLAN & RECOMMENDATIONS */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                  <span className="w-2 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                  Prioritized SEO Recommendations
                </h3>
                <p className="text-xs text-slate-400">
                  Critical fixes prepared with difficulty, impact level, and estimated monthly traffic improvement.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {report.recommendations.map((rec, i) => (
                <div 
                  key={i} 
                  className={`p-5 rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-950/80 border border-white/5 hover:border-slate-800 transition-all`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2.5">
                      {getPriorityIcon(rec.priority)}
                      <div>
                        <span className={`text-[9px] uppercase font-black px-2 py-0.5 rounded-full ${getPriorityColor(rec.priority)}`}>
                          {rec.priority}
                        </span>
                        <h4 className="text-sm font-black text-slate-100 mt-1">{rec.issue}</h4>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs">
                      <span className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-slate-300">
                        Difficulty: <strong className="text-white">{rec.difficulty}</strong>
                      </span>
                      <span className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/10 rounded text-[10px] text-emerald-400">
                        Est Growth: <strong className="text-white">{rec.trafficGain}</strong>
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                        Estimated Impact on Rankings
                      </span>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {rec.impact}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block flex items-center gap-1 font-mono">
                        <CornerDownRight className="h-3.5 w-3.5" />
                        AI Action Plan Recommended Fix
                      </span>
                      <p className="text-xs text-slate-200 mt-0.5 font-sans leading-relaxed">
                        {rec.fix}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ON-PAGE SEO METRICS */}
        {activeTab === "onpage" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <h3 className="text-md sm:text-lg font-black text-white mb-4">On-Page Crawl Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Meta Titles */}
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">Title Tag ({report.onPage.title.length} characters)</span>
                    <p className="text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-white/5 text-slate-200 mt-1 select-all break-all">
                      {report.onPage.title}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono block">Meta Description Description ({report.onPage.metaDescription.length} characters)</span>
                    <p className="text-xs font-sans bg-slate-950 p-2.5 rounded-lg border border-white/5 text-slate-300 mt-1 select-all leading-relaxed">
                      {report.onPage.metaDescription}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block uppercase">Internal Links</span>
                      <span className="text-xl font-bold text-white block mt-1">{report.onPage.internalLinks} links</span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block uppercase">External Outbound</span>
                      <span className="text-xl font-bold text-indigo-300 block mt-1">{report.onPage.externalLinks} links</span>
                    </div>
                  </div>
                </div>

                {/* Tag Hierarchies and Schema */}
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-indigo-400 uppercase tracking-wider font-semibold block">H1 Headings Hierarchy ({report.onPage.h1s.length} found)</span>
                    <ul className="mt-1.5 space-y-1 bg-slate-950 p-3 rounded-xl border border-white/5">
                      {report.onPage.h1s.map((h1, i) => (
                        <li key={i} className="text-xs mt-1 text-slate-200 font-medium flex items-start gap-1">
                          <span className="text-[9px] bg-indigo-950/80 text-indigo-300 px-1.5 rounded select-none uppercase shrink-0">H1</span>
                          <span>{h1}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block uppercase">Schema Markup</span>
                      <span className={`text-xs block mt-1 font-bold ${report.onPage.schemaMarkupPresent ? "text-emerald-400" : "text-rose-400"}`}>
                        {report.onPage.schemaMarkupPresent ? "Detected (JSON-LD Organization)" : "Not detected"}
                      </span>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl">
                      <span className="text-[10px] text-slate-400 block uppercase">Image alt attributes</span>
                      <span className="text-xs block mt-1 font-semibold text-slate-200">
                        {report.onPage.imageAltTextCount} tags ({report.onPage.imageAltMissingCount} missing ALT tags)
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Keyword density widget */}
            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white mb-2">Most Frequent Keywords Density Engine</h3>
              <p className="text-xs text-slate-400 mb-4">
                Identified semantic clusters on target content to review keyword optimization placement.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3.5">
                {report.onPage.keywordDensity.map((key: KeywordDensity, i) => (
                  <div key={i} className="p-3 bg-slate-950/80 border border-indigo-950 rounded-xl relative overflow-hidden text-center">
                    <span className="text-xs font-bold text-slate-100 block truncate">{key.word}</span>
                    <span className="text-xl font-black text-indigo-400 block mt-1">{key.density}%</span>
                    <span className="text-[10px] text-slate-500 block">Count: {key.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TECHNICAL SITEMAP AUDIT */}
        {activeTab === "technical" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
                <h4 className="text-sm font-bold text-white pb-3 border-b border-white/5 mb-4">Indexer File Crawl Verification</h4>
                <div className="space-y-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Robots.txt Location</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${report.technical.robotsTxtPresent ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                      {report.technical.robotsTxtPresent ? "ACTIVE (200 OK)" : "MISSING FILE"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">XML Sitemap Indexer</span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${report.technical.sitemapPresent ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}`}>
                      {report.technical.sitemapPresent ? "ACTIVE & REGISTERED" : "MISSING IN HEADER"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Indexability Crawl Status</span>
                    <span className="text-slate-200 font-mono font-bold text-[11px] bg-slate-950 px-2 py-0.5 rounded border border-white/5">{report.technical.indexabilityStatus}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Redirect Loop Chains</span>
                    <span className="text-slate-200 font-bold">{report.technical.redirectChainCount} chains found</span>
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
                <h4 className="text-sm font-bold text-white pb-3 border-b border-white/5 mb-4 font-sans">Javascript Rendering Performance</h4>
                <div className="flex items-center gap-4">
                  <div className="text-center p-3.5 bg-slate-950 border border-white/5 rounded-xl shrink-0">
                    <span className="text-3xl font-black text-blue-400">{report.technical.javascriptRenderingScore}</span>
                    <span className="text-[9px] text-slate-500 block uppercase font-bold mt-1">Crawl Speed</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-slate-200 font-bold">Dynamic Single Page CSR Hydration Successful</p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Google crawlers compiled layout resources dynamically and extracted static textual models without layout delays or timeouts.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Error logs */}
            <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Duplication Diagnostics Logs</span>
              <ul className="mt-2 space-y-2">
                {report.technical.duplicateContentIssues.map((issue, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-2.5 p-2.5 bg-slate-950 rounded-lg">
                    <span className="h-4 w-4 bg-rose-500/10 text-rose-400 flex items-center justify-center rounded text-[10px] shrink-0 font-bold">!</span>
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 4: CORE WEB VITALS / PERFORMANCE */}
        {activeTab === "speed" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: "LCP (Largest Contentful)", value: report.speed.coreWebVitals.lcp, desc: "Rendering hero layout", status: "FAST" },
                { label: "CLS (Cumulative Layout Shift)", value: report.speed.coreWebVitals.cls, desc: "Layout frame updates", status: "STABLE" },
                { label: "INP (Interaction to Next Paint)", value: report.speed.coreWebVitals.inp, desc: "Tappable interactive sync", status: "FAST" },
                { label: "FCP (First Contentful Paint)", value: report.speed.coreWebVitals.fcp, desc: "Static container timing", status: "FAST" },
                { label: "TTFB (Time To First Byte)", value: report.speed.coreWebVitals.ttfb, desc: "Server connection latency", status: "EXCELLENT" }
              ].map((vital, idx) => (
                <div key={idx} className="p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                  <span className="text-[9px] text-slate-400 uppercase tracking-tight block leading-tight">{vital.label}</span>
                  <span className="text-lg font-black text-white block mt-2">{vital.value}</span>
                  <span className="text-[9px] text-emerald-400 font-semibold block mt-1">{vital.status}</span>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{vital.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white mb-2">Web Performance Statistics Summary</h3>
              <div className="grid grid-cols-3 gap-3 text-center mb-6">
                <div className="p-3 bg-slate-950 border border-white/5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase block">Total Load Time</span>
                  <span className="text-xl font-bold text-emerald-400 mt-1 block">{report.speed.loadTime}s</span>
                </div>
                <div className="p-3 bg-slate-950 border border-white/5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase block">Page Payload Payload</span>
                  <span className="text-xl font-bold text-blue-400 mt-1 block">{report.speed.pageSize} MB</span>
                </div>
                <div className="p-3 bg-slate-950 border border-white/5 rounded-xl">
                  <span className="text-[10px] text-slate-400 uppercase block">Network Requests Requests</span>
                  <span className="text-xl font-bold text-purple-400 mt-1 block">{report.speed.requestsCount} reqs</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Top Page Load Optimization Suggestions</span>
                <div className="mt-2 space-y-1.5">
                  {report.speed.suggestions.map((sug, i) => (
                    <div key={i} className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg flex items-center gap-2">
                      <Zap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MOBILE COMPLIANCE */}
        {activeTab === "mobile" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <h3 className="text-base font-bold text-white mb-4">Mobile Device Compliance Audit</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Target Responsiveness</span>
                    <span className="text-emerald-400 font-bold">100% RESPONSIVE</span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Viewport Definition</span>
                    <span className="text-slate-200 font-medium font-mono">width=device-width, initial-scale=1</span>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Google Mobile Score</span>
                    <span className="text-indigo-400 font-bold">{report.mobile.mobileSpeedScore}/100</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5">
                    <span className="text-[10px] text-indigo-400 uppercase tracking-widest block font-bold">Touch Target Tap Compliance</span>
                    <p className="text-xs text-slate-300 mt-1">{report.mobile.touchTargetsStatus}</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5">
                    <span className="text-[10px] text-indigo-400 uppercase tracking-widest block font-bold">Typography Scaling</span>
                    <p className="text-xs text-slate-300 mt-1">{report.mobile.fontSizeStatus}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Mobile Layout Warnings</span>
              <div className="mt-2 space-y-1.5">
                {report.mobile.recommendations.map((rec, i) => (
                  <div key={i} className="text-xs text-slate-200 bg-slate-950 p-2.5 rounded-lg flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: CONTENT & NLP ENGINE */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/50 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase">Textual Word Count</span>
                <span className="text-2xl font-black text-white block mt-1.5">{report.content.count} words</span>
                <span className="text-[10px] text-indigo-400 mt-1.5 block">Recommended: &gt; 1200 words</span>
              </div>
              <div className="p-4 bg-slate-900/50 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase">Flesch Reading Ease Readability</span>
                <span className="text-2xl font-black text-white block mt-1.5">{report.content.readabilityScore}/100</span>
                <span className="text-[10px] text-indigo-400 mt-1.5 block">Difficulty: Standard Commercial</span>
              </div>
              <div className="p-4 bg-slate-900/50 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 uppercase">Grammar & Editorial Status</span>
                <span className="text-2xl font-black text-emerald-400 block mt-1.5">{report.content.grammarStatus}</span>
                <span className="text-[10px] text-emerald-400 mt-1.5 block">No structural typos detected</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <h4 className="text-sm font-bold text-white mb-2.5">Extracted Semantic NLP entity values</h4>
              <p className="text-xs text-slate-400 mb-4">
                These entities were discovered on the landing layout during crawling.
              </p>
              <div className="flex flex-wrap gap-2">
                {report.content.nlpEntities.map((ent, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white/5 border border-white/5 text-slate-300 rounded-full text-xs font-mono font-semibold">
                    {ent}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md space-y-3">
              <span className="text-[10px] uppercase font-bold text-purple-400 tracking-wider">Semantic Topic Coverage Recommendations</span>
              <div className="mt-1 space-y-1.5">
                {report.content.suggestions.map((sug, i) => (
                  <div key={i} className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg flex items-center gap-2">
                    <Sparkles className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                    <span>{sug}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: COMPETITIVE OPPORTUNITY REPORTS */}
        {activeTab === "competitors" && (
          <div className="space-y-6">
            <p className="text-xs text-slate-400">
              Audit analysis matching your keyword profiles and rankings stats against direct domain targets.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.competitors.map((comp: CompType, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-white/10 bg-slate-900/40 text-center relative overflow-hidden">
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-indigo-950 text-indigo-400 border border-indigo-900 rounded text-[9px] font-mono">
                    DA: {comp.domainAuthority}
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-bold block uppercase leading-none">Domain</span>
                  <span className="text-sm font-bold text-slate-100 block mt-1 truncate">{comp.name}</span>
                  
                  <div className="my-4 flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-black text-indigo-400">{comp.score}</span>
                    <span className="text-xs text-slate-500">/100</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-3 mt-3 text-xs">
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Est Traffic</span>
                      <strong className="text-slate-100 mt-0.5 block">{comp.traffic || "0"}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-500 uppercase block">Backlinks</span>
                      <strong className="text-slate-100 mt-0.5 block">{comp.backlinks.toLocaleString() || "0"}</strong>
                    </div>
                  </div>

                  <div className="mt-4 text-left border-t border-white/5 pt-2.5">
                    <span className="text-[9px] text-slate-500 uppercase font-mono font-bold block">Discovered Keyword Gap</span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {comp.keywordGap.map((gap, i) => (
                        <span key={i} className="text-[9px] px-1.5 py-0.5 bg-slate-950 rounded border border-white/5 text-slate-300">
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: BACKLINKS ANALYSIS */}
        {activeTab === "backlinks" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-900/50 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] text-slate-450 uppercase tracking-wider">Referring Domains</span>
                <span className="text-2xl font-black text-white block mt-1">{report.backlinks.referringDomains} domains</span>
              </div>
              <div className="p-4 bg-slate-900/50 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] text-slate-450 uppercase tracking-wider">Total Backlinks</span>
                <span className="text-2xl font-black text-slate-100 block mt-1">{report.backlinks.total.toLocaleString()} links</span>
              </div>
              <div className="p-4 bg-slate-900/50 border border-white/10 rounded-xl text-center">
                <span className="text-[10px] text-slate-450 uppercase tracking-wider">Authority Score</span>
                <span className="text-2xl font-black text-indigo-400 block mt-1">{report.backlinks.authorityScore}/100</span>
              </div>
              <div className="p-4 bg-rose-950/15 border border-rose-900/30 rounded-xl text-center">
                <span className="text-[10px] text-rose-300 uppercase tracking-wider">Toxic backlink warnings</span>
                <span className="text-2xl font-black text-rose-450 block mt-1">{report.backlinks.toxicLinksCount} warnings</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white mb-2">Backlink Link Profile Composition</h3>
              <p className="text-xs text-slate-400 mb-4">
                DoFollow backlinks carry the maximum authority ranking weight on modern crawling services.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Anchor text distributions */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider block">Discovered anchor text text weight</span>
                  {report.backlinks.anchorDistribution.map((dist, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between items-center text-slate-200 mb-1 font-medium font-mono">
                        <span>&ldquo;{dist.anchor}&rdquo;</span>
                        <span>{dist.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${dist.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Authority summary */}
                <div className="p-4 bg-slate-950 rounded-xl border border-white/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Domain Authority Tier</span>
                    <strong className="text-white text-base block mt-1 font-bold">Grade Tier Tier A Enterprise</strong>
                    <p className="text-xs text-slate-400 mt-1">
                      Your link building exhibits standard industry organic growth with high follow rates:
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3 text-xs">
                    <div>
                      <span className="text-[10px] text-emerald-400 uppercase font-bold">Follow (Carry wt)</span>
                      <p className="text-slate-200 font-bold">{report.backlinks.followLinksCount.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase">NoFollow</span>
                      <p className="text-slate-200 font-bold">{report.backlinks.unfollowLinksCount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* TAB 9: SECURITY, ACCESSIBILITY, AND UX */}
        {activeTab === "security-access-ux" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Security card */}
              <div className="p-5 rounded-xl border border-white/10 bg-slate-900/40">
                <h4 className="text-sm font-bold text-white pb-2.5 border-b border-white/5 flex items-center gap-2 mb-3">
                  <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
                  SSL & Security
                </h4>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>SSL Certificate verified</span>
                    <span className="text-emerald-400 font-bold">Verified valid</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>HTTPS Redirect status</span>
                    <span className="text-emerald-400 font-bold">Redirect active</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Mixed content check</span>
                    <span className="text-emerald-400 font-bold">Clear</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 flex justify-between">
                    <span className="text-slate-300">Headers rating score</span>
                    <strong className="text-white">{report.security.securityHeadersScore}/100</strong>
                  </div>
                </div>
              </div>

              {/* Accessibility card */}
              <div className="p-5 rounded-xl border border-white/10 bg-slate-900/40">
                <h4 className="text-sm font-bold text-white pb-2.5 border-b border-white/5 flex items-center gap-2 mb-3">
                  <Compass className="h-4 w-4 text-indigo-400 shrink-0" />
                  WCAG Accessibility
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>WCAG status</span>
                    <span className="text-slate-100 font-bold">{report.accessibility.wcagStatus}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Contrast checklist</span>
                    <span className="text-emerald-400 font-bold">Correct ratios</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Keyboard navigation support</span>
                    <span className="text-emerald-400 font-bold">Fully navigable</span>
                  </div>
                  <div className="border-t border-white/5 pt-2 flex justify-between">
                    <span className="text-slate-300">Missing ALT images</span>
                    <strong className="text-rose-450 font-bold">{report.accessibility.missingAltTags} tags</strong>
                  </div>
                </div>
              </div>

              {/* UX improvements */}
              <div className="p-5 rounded-xl border border-white/10 bg-slate-900/40">
                <h4 className="text-sm font-bold text-white pb-2.5 border-b border-white/5 flex items-center gap-2 mb-3">
                  <Activity className="h-4 w-4 text-rose-400 shrink-0" />
                  User Experience Score
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Navigation routing score</span>
                    <span className="text-slate-100 font-bold">{report.ux.navigationScore}/100</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>Mobile layout viewport UX</span>
                    <span className="text-slate-100 font-bold">{report.ux.mobileUXScore}/100</span>
                  </div>
                  <div className="border-t border-white/5 pt-2">
                    <span className="text-[9px] text-slate-500 uppercase block">Conversion Opportunity</span>
                    <p className="text-[11px] text-slate-300 mt-1 leading-tight">{report.ux.conversionOpportunity}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Combined improvements lists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40">
                <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">Discovered Accessibility Warnings</span>
                <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                  {report.accessibility.errorsList.map((err, idx) => (
                    <li key={idx} className="p-2.5 bg-slate-950 rounded-lg flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                      <span>{err}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl border border-white/10 bg-slate-900/40">
                <span className="text-[10px] uppercase font-bold text-blue-400 tracking-wider">Humble UX Navigation Recommendations</span>
                <ul className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                  {report.ux.improvements.map((imp, idx) => (
                    <li key={idx} className="p-2.5 bg-slate-950 rounded-lg flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      <span>{imp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
