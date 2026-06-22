import { useState, useEffect, FormEvent } from "react";
import { Search, Loader2, Sparkles, AlertCircle, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Layers, HelpCircle, Globe } from "lucide-react";

interface HeroProps {
  onStartAnalysis: (url: string, competitors: string[], targetCountry?: string, targetCity?: string) => Promise<void>;
  isAnalyzing: boolean;
}

const STEPS = [
  "Resolving Target URL DNS & Certs...",
  "Crawling Title tags, Headers & OpenGraph meta...",
  "Simulating Mobile Viewports & Touch compliance...",
  "Measuring Core Web Vitals, TTFB & JS latency...",
  "Evaluating Content density & Semantic NLP entities...",
  "Invoking Google Gemini model intelligence..."
];

export const COUNTRIES_LIST = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "India", "United Arab Emirates", "Saudi Arabia", "Pakistan", "Brazil", "Singapore", "South Africa", "Spain", "Italy", "Mexico", "Netherlands", "Sweden", "Switzerland", "Ireland", "New Zealand",
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua & Barbuda", "Argentina", "Armenia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "Gabon", "Gambia", "Georgia", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "Indonesia", "Iran", "Iraq", "Israel", "Ivory Coast", "Jamaica", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Samoa", "San Marino", "Sao Tome & Principe", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Korea", "South Sudan", "Sri Lanka", "Sudan", "Suriname", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function Hero({ onStartAnalysis, isAnalyzing }: HeroProps) {
  const [url, setUrl] = useState("");
  const [showCompetitors, setShowCompetitors] = useState(false);
  const [comp1, setComp1] = useState("");
  const [comp2, setComp2] = useState("");
  const [targetCountry, setTargetCountry] = useState("United States");
  const [targetCity, setTargetCity] = useState("");
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      setCurrentStepIdx(0);
      interval = setInterval(() => {
        setCurrentStepIdx((prev) => (prev < STEPS.length - 1 ? prev + 1 : prev));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!url) {
      setErrorMessage("Please enter a valid URL to analyze.");
      return;
    }

    let cleanUrl = url.trim();
    if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
      cleanUrl = "https://" + cleanUrl;
    }

    try {
      new URL(cleanUrl);
    } catch {
      setErrorMessage("Invalid URL format. Example: https://example.com");
      return;
    }

    const comps: string[] = [];
    if (comp1) comps.push(comp1.trim());
    if (comp2) comps.push(comp2.trim());

    onStartAnalysis(cleanUrl, comps, targetCountry, targetCity);
  };

  const setSampleUrl = (sample: string, c1?: string, c2?: string) => {
    setUrl(sample);
    if (c1) {
      setComp1(c1);
      setShowCompetitors(true);
    }
    if (c2) {
      setComp2(c2);
      setShowCompetitors(true);
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* Background visual effect blobs */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/10 to-violet-500/10 blur-[130px] animate-pulse-slow" />
      <div className="absolute top-12 right-12 -z-10 h-[350px] w-[350px] rounded-full bg-blue-500/5 blur-[100px] animate-pulse" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Company Title Label */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-950/30 px-4.5 py-1.5 text-xs font-semibold text-indigo-300 backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
          Powered by Gemini 3.5 Intelligence — OSO Software Outsourcing, LLC
        </div>

        {/* Headline */}
        <h1 className="mx-auto mt-8 max-w-4xl font-sans text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl/tight leading-none">
          Get an Instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">AI-Powered SEO Audit</span> of Any Website
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-6 max-w-3xl text-sm sm:text-base md:text-lg text-slate-400 leading-relaxed font-sans">
          Analyze your website’s SEO, content quality, technical health, page speed, mobile usability, 
          user experience, security, accessibility, and search visibility using advanced artificial intelligence.
        </p>

        {/* Website Analyzer Box */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-white/5 bg-slate-900/30 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input URL Group */}
            <div className="relative rounded-2xl bg-slate-950 p-1.5 border border-white/5 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.15)] transition-all duration-300">
              <div className="flex items-center lg:gap-3 pl-3">
                <Search className="h-5 w-5 text-indigo-400 shrink-0" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter Website URL (e.g., https://yourwebsite.com)"
                  disabled={isAnalyzing}
                  className="block w-full bg-transparent py-3 px-2 text-sm text-white placeholder-slate-600 focus:outline-none disabled:opacity-75 transition-all text-ellipsis"
                />
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-3 text-xs font-bold text-white hover:from-blue-500 hover:to-purple-500 shadow-md shadow-indigo-600/25 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Analyzing
                    </span>
                  ) : (
                    "Analyze Now"
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-center gap-2 rounded-xl bg-rose-950/30 border border-rose-900/30 p-3.5 text-xs text-rose-300 text-left">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Geographical Search Target Selection for Local SEO */}
            <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 sm:p-5 text-left space-y-3.5">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 select-none">
                <Globe className="h-3.5 w-3.5 text-blue-400" />
                <span>Geographical Search Base (Country & City Local SEO Crawl)</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Target Search Country / Regional Nodes
                  </label>
                  <select
                    value={targetCountry}
                    onChange={(e) => setTargetCountry(e.target.value)}
                    disabled={isAnalyzing}
                    className="block w-full rounded-xl border border-white/5 bg-slate-950 py-2.5 px-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500/50 cursor-pointer min-h-[40px]"
                  >
                    {COUNTRIES_LIST.map((country) => (
                      <option key={country} value={country} className="bg-slate-950 text-slate-200">
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                    Target City (Optional for Hyper-Local SEO)
                  </label>
                  <input
                    type="text"
                    value={targetCity}
                    onChange={(e) => setTargetCity(e.target.value)}
                    placeholder="e.g., London, New York, Sydney"
                    disabled={isAnalyzing}
                    className="block w-full rounded-xl border border-white/5 bg-slate-950 py-2.5 px-3.5 text-xs text-slate-200 placeholder-slate-700 focus:outline-none focus:border-indigo-500/50 transition-colors min-h-[40px]"
                  />
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic">
                Crawl will adapt search result algorithms, latency, CDN hop evaluations, and local schema validation for this target region.
              </p>
            </div>

            {/* Accordion For Competitor Research Input Addition */}
            <div className="border-t border-white/5 pt-4">
              <button
                type="button"
                onClick={() => setShowCompetitors(!showCompetitors)}
                className="flex items-center justify-between w-full text-xs text-indigo-400 hover:text-indigo-350 transition-colors py-2 focus:outline-none select-none"
              >
                <span className="flex items-center gap-2 font-semibold">
                  <Layers className="h-4 w-4" />
                  Add Competitors for Keyword Gap Audit (Optional)
                </span>
                {showCompetitors ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>

              {showCompetitors && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 animate-fadeIn">
                  <div>
                    <label className="block text-left text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                      Competitor Website #1
                    </label>
                    <input
                      type="text"
                      value={comp1}
                      onChange={(e) => setComp1(e.target.value)}
                      placeholder="e.g., competitor-one.com"
                      disabled={isAnalyzing}
                      className="block w-full rounded-xl border border-white/5 bg-slate-950 py-2.5 px-3.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-indigo-505/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-left text-[10px] font-bold text-slate-500 mb-1.5 uppercase tracking-wider">
                      Competitor Website #2
                    </label>
                    <input
                      type="text"
                      value={comp2}
                      onChange={(e) => setComp2(e.target.value)}
                      placeholder="e.g., competitor-two.com"
                      disabled={isAnalyzing}
                      className="block w-full rounded-xl border border-white/5 bg-slate-950 py-2.5 px-3.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-indigo-505/50 transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Analysis Progress Steps Card */}
            {isAnalyzing && (
              <div className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-950/10 p-5 text-left animate-pulse">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Loader2 className="h-4.5 w-4.5 text-indigo-400 animate-spin" />
                    <span className="text-xs font-bold text-slate-200">Real-Time AI Processing...</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider">
                    Step {currentStepIdx + 1} of {STEPS.length}
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <p className="text-sm font-semibold text-white italic">
                    &ldquo;{STEPS[currentStepIdx]}&rdquo;
                  </p>
                  {/* Miniature progress bar */}
                  <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-1000"
                      style={{ width: `${((currentStepIdx + 1) / STEPS.length) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    Our AI scraper is crawling URLs and comparing site hierarchies.
                  </p>
                </div>
              </div>
            )}
          </form>

          {/* Preset Samples to Test Immediately */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 text-xs">
            <span className="text-slate-500 font-medium">Or check beautiful sample URLs:</span>
            <button
              onClick={() => setSampleUrl("stripe.com", "square.com", "paypal.com")}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/5 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer"
            >
              stripe.com (Tech SaaS)
            </button>
            <button
              onClick={() => setSampleUrl("techcrunch.com", "wired.com", "mashable.com")}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/5 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer"
            >
              techcrunch.com (Content Portal)
            </button>
            <button
              onClick={() => setSampleUrl("shopify.com", "bigcommerce.com")}
              className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 border border-white/5 text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer"
            >
              shopify.com (E-Commerce)
            </button>
          </div>
        </div>

        {/* Brand Promise Trust Indicators Row */}
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-slate-900/20 p-5 backdrop-blur-md hover:border-white/10 transition-colors">
            <CheckCircle2 className="h-6 w-6 text-emerald-500 mb-2.5" />
            <span className="text-xs font-bold text-slate-155">Unlimited Audits</span>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">No monthly usage caps</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-slate-900/20 p-5 backdrop-blur-md hover:border-white/10 transition-colors">
            <Sparkles className="h-6 w-6 text-purple-500 mb-2.5" />
            <span className="text-xs font-bold text-slate-155">AI-Powered Analysis</span>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Powered by Gemini 3.5</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-slate-900/20 p-5 backdrop-blur-md hover:border-white/10 transition-colors">
            <ShieldCheck className="h-6 w-6 text-blue-500 mb-2.5" />
            <span className="text-xs font-bold text-slate-155">Audit Reports</span>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Clean PDF formats</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-slate-900/20 p-5 backdrop-blur-md hover:border-white/10 transition-colors">
            <Layers className="h-6 w-6 text-indigo-400 mb-2.5" />
            <span className="text-xs font-bold text-slate-155">Enterprise Insights</span>
            <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">Deeper semantic crawls</p>
          </div>
        </div>

      </div>
    </div>
  );
}
