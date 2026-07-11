import { useState } from "react";
import {
  Flame,
  Moon,
  Sun,
  Award,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  HelpCircle,
  ShieldAlert,
  User,
  Globe,
  RefreshCw,
  Cloud,
  HardDrive,
} from "lucide-react";
import { UserStats } from "../types";
import BrandLogo from "./BrandLogo";

interface HeaderProps {
  userStats: UserStats;
  isHindi: boolean;
  setIsHindi: (val: boolean) => void;
  isDark: boolean;
  setIsDark: (val: boolean) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedFontSize: number;
  setSelectedFontSize: (size: number) => void;
  user: any;
  onGoogleSignIn: () => void;
  onSignOut: () => void;
  isSyncing?: boolean;
  isSynced?: boolean;
  onSync?: () => void;
}

export default function Header({
  userStats,
  isHindi,
  setIsHindi,
  isDark,
  setIsDark,
  currentView,
  setCurrentView,
  selectedFontSize,
  setSelectedFontSize,
  user,
  onGoogleSignIn,
  onSignOut,
  isSyncing,
  isSynced,
  onSync,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", labelEn: "Home", labelHi: "मुख्य पृष्ठ" },
    { id: "questions", labelEn: "MCQ Practice", labelHi: "प्रैक्टिस प्रश्न" },
    { id: "quizzes", labelEn: "Mock Tests", labelHi: "मॉक टेस्ट" },
    { id: "dashboard", labelEn: "Dashboard", labelHi: "डैशबोर्ड" },
  ];

  const secondaryNav = [
    { id: "about", labelEn: "About", labelHi: "हमारे बारे में" },
    { id: "contact", labelEn: "Contact", labelHi: "संपर्क करें" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => {
              setCurrentView("home");
              setMobileMenuOpen(false);
            }}
            className="flex items-center cursor-pointer group active:scale-98 transition-transform"
            id="header-logo-container"
          >
            <BrandLogo
              size="md"
              className="group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-slate-100/50 dark:bg-slate-900/50 rounded-xl border border-slate-200/20 dark:border-slate-800/20">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setCurrentView(item.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all duration-300 ${
                  currentView === item.id
                    ? "bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-500 shadow-[0_2px_8px_rgba(30,41,59,0.04)] dark:shadow-none border border-slate-200/30 dark:border-slate-700/30"
                    : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-500 hover:bg-white/40 dark:hover:bg-slate-800/40"
                }`}
              >
                {isHindi ? item.labelHi : item.labelEn}
              </button>
            ))}
          </nav>

          {/* Desktop Right Side Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              id="lang-toggle-btn"
              onClick={() => setIsHindi(!isHindi)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200/60 dark:border-slate-800 text-xs font-bold text-slate-705 dark:text-slate-305 hover:bg-slate-50 dark:hover:bg-slate-800/50 active:scale-95 shadow-sm transition-all cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>{isHindi ? "English medium" : "हिंदी माध्यम"}</span>
            </button>

            {/* Dark Mode Switcher */}
            <button
              id="dark-mode-toggle-btn"
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-800/80 transition-all duration-300 cursor-pointer"
              aria-label="Toggle theme mode"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>

            {/* Sync Indicator */}
            {user && (
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  isSyncing
                    ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200/40 dark:border-amber-900/30 text-amber-700 dark:text-amber-400"
                    : isSynced
                    ? "bg-blue-50 dark:bg-blue-950/10 border-blue-200/40 dark:border-blue-900/30 text-blue-700 dark:text-blue-400"
                    : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                }`}
                title={
                  isSyncing
                    ? "Saving changes to Cloud..."
                    : isSynced
                    ? "Data synced with Cloud"
                    : "Using Local Storage Data"
                }
              >
                {isSyncing ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : isSynced ? (
                  <Cloud className="h-4 w-4" />
                ) : (
                  <HardDrive className="h-4 w-4" />
                )}
                <span>
                  {isSyncing ? "Syncing..." : isSynced ? "Cloud" : "Local"}
                </span>
                {!isSyncing && onSync && (
                  <button
                    onClick={onSync}
                    className="ml-1 p-0.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 active:scale-90 transition-transform"
                    title="Force Sync Now"
                  >
                    <RefreshCw className="h-3 w-3" />
                  </button>
                )}
              </div>
            )}

            {/* Google Authentication Controller */}
            {user ? (
              <div id="user-profile-menu" className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView("dashboard")}
                  className="h-9 w-9 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden ring-2 ring-emerald-500/20 hover:ring-emerald-500/40 cursor-pointer hover:scale-100 transition-transform flex items-center justify-center"
                  title={user.displayName || user.email || "View Dashboard"}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User"}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-bold text-xs text-emerald-600 dark:text-emerald-400">
                      {(user.displayName || user.email || "U")[0].toUpperCase()}
                    </span>
                  )}
                </button>
                <button
                  onClick={onSignOut}
                  className="text-[10px] font-bold text-red-500 hover:text-red-650 cursor-pointer hover:underline px-1 py-1"
                >
                  {isHindi ? "लॉगआउट" : "Sign Out"}
                </button>
              </div>
            ) : null}
          </div>

          {/* Mobile hamburger icon */}
          <div className="flex md:hidden items-center gap-2">
            {/* Quick language toggle on mobile */}
            <button
              onClick={() => setIsHindi(!isHindi)}
              className="p-1 px-2.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-800 dark:text-white"
            >
              {isHindi ? "EN" : "हिं"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open main menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-3 shadow-xl transition-all animate-fade-in">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  currentView === item.id
                    ? "bg-emerald-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 font-bold"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {isHindi ? item.labelHi : item.labelEn}
              </button>
            ))}
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Quick theme toggler / accessibility in mobile */}
          <div className="flex items-center justify-between px-4 py-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {isHindi ? "डार्क थीम चालू करें" : "Toggle Dark Mode"}
            </span>
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white"
            >
              {isDark ? "Light ☀️" : "Dark 🌙"}
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
            {secondaryNav.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-slate-500 dark:text-slate-400 hover:underline px-2"
              >
                {isHindi ? item.labelHi : item.labelEn}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
