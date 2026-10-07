import React, { useState } from 'react';
import { Menu, X, Phone, Calendar, Video, Lock } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface NavbarProps {
  onOpenScheduleModal: (projectName?: string) => void;
  onOpenDomainModal: () => void;
  onOpenAdminLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenScheduleModal,
  onOpenDomainModal,
  onOpenAdminLogin,
}) => {
  const { settings } = useSiteSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-300/80 bg-white/90 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] transition-all">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 relative">

        {/* Zone 1: Brand Wordmark (Single clean text element) */}
        <div className="flex lg:flex-1">
          <a href="#" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-display font-bold text-xl group-hover:border-amber-400/60 transition-colors">
              KR
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-500 transition-colors">
              {settings.agency.name || 'KR Estate'}
            </span>
          </a>
        </div>

        {/* Zone 2: Perfectly Centered Navigation Links */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm font-medium text-slate-800">
          <a href="#properties" className="hover:text-slate-900 transition-colors">
            Properties
          </a>
          <a href="#localities" className="hover:text-slate-900 transition-colors">
            Noida Sectors
          </a>
          <a href="#calculator" className="hover:text-slate-900 transition-colors">
            EMI Calculator
          </a>
          <a href="#advisor" className="hover:text-slate-900 transition-colors flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            AI Advisor
          </a>
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="hidden md:flex lg:flex-1 items-center justify-end gap-3">
          <a
            href={`tel:${settings.agency.phone.replace(/[^0-9+]/g, '')}`}
            className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-800 hover:text-amber-500 transition-colors py-2 px-3 rounded-lg border border-slate-300 hover:border-slate-400"
          >
            <Phone className="h-3.5 w-3.5 text-amber-500" />
            <span>{settings.agency.phone || '+91 78704 33580'}</span>
          </a>

          <button
            onClick={() => onOpenScheduleModal()}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-md hover:shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>Book Visit</span>
          </button>

          <button
            onClick={onOpenAdminLogin}
            title="Owner Login"
            className="flex items-center justify-center h-8 w-8 rounded-full border border-slate-300 text-slate-500 hover:text-slate-900 hover:border-slate-400 transition-all ml-2 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-lock"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenScheduleModal()}
            className="px-3 py-1.5 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-md"
          >
            Visit
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-800 hover:text-slate-900 rounded-lg focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-300 bg-[#FDFBF7]/95 px-4 pt-3 pb-6 space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-slate-800">
            <a
              href="#properties"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-amber-400"
            >
              Verified Properties
            </a>
            <a
              href="#localities"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-amber-400"
            >
              Noida Sector Guide
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-amber-400"
            >
              EMI Calculator
            </a>
            <a
              href="#advisor"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 hover:text-amber-400 flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              AI Property Advisor
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="text-left px-2 py-1.5 text-xs text-slate-800 hover:text-amber-500 flex items-center gap-2 cursor-pointer font-medium"
            >
              <Lock className="h-3.5 w-3.5 text-amber-500" />
              <span>Admin Panel</span>
            </button>
          </div>
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${settings.agency.phone.replace(/[^0-9+]/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-slate-900 border border-slate-300 rounded-lg"
            >
              <Phone className="h-4 w-4 text-amber-500" />
              <span>Call {settings.agency.phone || '+91 78704 33580'}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenScheduleModal();
              }}
              className="w-full py-2.5 text-sm font-semibold text-neutral-950 bg-amber-400 rounded-lg"
            >
              Schedule Free Site Visit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

