import { useState } from "react";
import { 
  Sparkles, 
  Home, 
  Search, 
  LineChart, 
  Settings, 
  Users, 
  FileText, 
  History, 
  Mail, 
  Menu, 
  X, 
  ChevronRight,
  TrendingUp
} from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAnalyzeClick: () => void;
  onDashboardClick: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, onAnalyzeClick, onDashboardClick }: SidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Dashboard Home", icon: Home },
    { id: "auditor", label: "AI Auditor", icon: Sparkles },
    { id: "seo", label: "SEO Keyword Gap", icon: LineChart },
    { id: "technical", label: "Technical Audit", icon: Settings },
    { id: "competitor", label: "Competitor Intel", icon: Users },
    { id: "reports", label: "Report Center", icon: FileText },
    { id: "history", label: "Audit Logs", icon: History },
    { id: "contact", label: "Support & Consulting", icon: Mail }
  ];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
    // Smooth scroll the content wrapper to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-slate-950/70 px-4 backdrop-blur-xl">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleTabChange("home")}>
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-md">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <span className="text-xs font-extrabold text-white block">SEO AI Audit</span>
            <span className="text-[8px] font-mono tracking-widest text-indigo-400 uppercase leading-none block">
              OSO Software
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleTabChange("home")}
            className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
          >
            New Audit
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 rounded-xl border border-white/5 bg-slate-900/60 text-slate-400 hover:text-white"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Floating Left Sidebar Panel (Desktop Layout) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-900 bg-slate-950/95 p-6 backdrop-blur-2xl transition-all duration-300 ease-in-out lg:z-30 lg:translate-x-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Sidebar Header/Logo */}
        <div className="flex items-center justify-between pb-6 border-b border-white/5">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleTabChange("home")}>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-xl shadow-indigo-500/5 group-hover:scale-105 transition-all duration-300">
              <Sparkles className="h-5.5 w-5.5 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-white/10 blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="text-sm font-black tracking-tight text-white block uppercase tracking-wider">SEO AI Audit</span>
              <p className="text-[9px] font-mono tracking-widest text-indigo-400 uppercase leading-none mt-1">
                OSO OUTSOURCING
              </p>
            </div>
          </div>
          {/* Close button for mobile menu */}
          <button 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-xl border border-white/5 bg-slate-900 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>



        {/* Dynamic Sidebar Links Area with perfect scrollability */}
        <nav className="mt-8 flex-1 space-y-1.5 overflow-y-auto no-scrollbar pr-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`
                  w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer
                  ${isSelected 
                    ? "bg-gradient-to-r from-indigo-600/15 via-indigo-600/10 to-transparent text-indigo-300 border border-indigo-500/20 shadow-lg shadow-indigo-500/5 font-extrabold" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <span className={`p-1.5 rounded-xl transition-all ${
                    isSelected ? "bg-indigo-500/10 text-indigo-400" : "bg-transparent text-slate-500 group-hover:text-slate-200"
                  }`}>
                    <IconComponent className="h-4.5 w-4.5 shrink-0" />
                  </span>
                  <span>{item.label}</span>
                </div>
                {isSelected && <ChevronRight className="h-3.5 w-3.5 text-indigo-400 shrink-0" />}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer element */}
        <div className="pt-6 border-t border-white/5 text-[10px] space-y-2 text-slate-500">
          <p className="leading-relaxed text-center font-bold">
            &copy; {new Date().getFullYear()} OSO Software Outsourcing, LLC
          </p>
        </div>
      </aside>

      {/* Backdrop for mobile drawer toggle */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm"
        />
      )}
    </>
  );
}
