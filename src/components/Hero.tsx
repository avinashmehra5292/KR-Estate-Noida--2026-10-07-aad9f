import React, { useState } from 'react';
import { Search, MapPin, Building2, ShieldCheck, Play, Camera, ArrowRight, Eye, Sparkles } from 'lucide-react';
import { NOIDA_PROPERTIES } from '../data/properties';
import { SafeImage } from './SafeImage';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface HeroProps {
  onSearch: (params: { sector: string; type: string; budget: string }) => void;
  onOpenScheduleModal: () => void;
  onWatchVideo?: () => void;
  onOpenClientVideoModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onOpenScheduleModal,
  onWatchVideo,
  onOpenClientVideoModal,
}) => {
  const { settings } = useSiteSettings();
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      sector: selectedSector,
      type: selectedType,
      budget: selectedBudget,
    });
    const el = document.getElementById('properties');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 bg-[#FDFBF7]">
      
      {/* High-Resolution Architectural Photography Backdrop with Contrast Scrim */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80"
          alt="Noida Luxury Real Estate Architecture"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-20 filter saturate-50 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FDFBF7]/80 via-[#FDFBF7]/95 to-[#FDFBF7]" />
        <div className="absolute inset-0 bg-radial from-amber-500/5 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Unboxed Brand Sub-header Notice */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-500 mb-6 tracking-wide">
          <ShieldCheck className="h-4 w-4" />
          <span>{settings.hero.badge || 'OFFICIAL RERA ADVISORY & CHANNEL PARTNER'}</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-slate-800">NOIDA & GREATER NOIDA</span>
          <span aria-hidden="true" className="text-neutral-600">·</span>
          <span className="text-slate-800">{settings.agency.domain || 'krestatenoida.com'}</span>
        </div>

        {/* Announcement Banner if configured */}
        {settings.hero.announcementText && (
          <div className="mb-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{settings.hero.announcementText}</span>
          </div>
        )}

        {/* Main Headline */}
        <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-600 text-balance leading-[1.1]">
            {settings.hero.title || 'Exceptional Residences & High-Yield Commercials Across Noida'}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-800 max-w-3xl leading-relaxed font-light">
            {settings.hero.subtitle || 'Curated, verified property acquisitions across Sector 150 Sports City, the Noida-Greater Noida Expressway corporate belt, and the upcoming Jewar International Airport corridor. Direct developer pricing with zero brokerage on new bookings.'}
          </p>

          {/* Action CTAs: Schedule Visit + Watch 4K Drone Tour */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {(settings.hero.siteVisitButtonText || !settings.hero) && (
              <button
                type="button"
                onClick={onOpenScheduleModal}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm sm:text-base transition-all duration-300 shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)] hover:shadow-[0_0_60px_-15px_rgba(251,191,36,0.7)] hover:-translate-y-1 flex items-center gap-3 cursor-pointer ring-1 ring-amber-300/50"
              >
                <span>{settings.hero.siteVisitButtonText || 'Schedule Free Site Visit'}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            )}

            {settings.hero.droneTourButtonText && onWatchVideo && (
              <button
                type="button"
                onClick={onWatchVideo}
                className="px-6 py-4 rounded-2xl bg-white/80 hover:bg-white text-slate-900 font-semibold text-sm sm:text-base transition-all duration-300 border border-slate-200 hover:border-slate-300 flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
              >
                <Play className="h-4 w-4 text-amber-500 fill-amber-500" />
                <span>{settings.hero.droneTourButtonText}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Adjacency Trust Indicators */}
        <div className="mt-12 flex flex-wrap items-center gap-y-4 gap-x-8 text-sm text-slate-800 animate-in fade-in duration-1000 delay-300 fill-mode-both">
          {(settings.stats?.filter(s => s && (s.value?.trim() || s.label?.trim())) || [
            { value: '150+', label: 'Hectares Curated' },
            { value: '₹850+ Cr', label: 'Transacted' },
            { value: '100%', label: 'RERA Registered' }
          ]).map((stat, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <div className="w-px h-10 bg-gradient-to-b from-transparent via-slate-300 to-transparent hidden sm:block" />}
              <div className="flex flex-col gap-1">
                <span className="font-display font-bold text-2xl text-amber-500">{stat.value}</span>
                <span className="text-xs uppercase tracking-widest text-slate-600 font-semibold">{stat.label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Quick Search & Filter Console */}
        <div className="mt-14 max-w-6xl rounded-3xl border border-slate-200 bg-white/90 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] ring-1 ring-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 fill-mode-both relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 to-transparent pointer-events-none" />
          <form onSubmit={handleSearchSubmit} className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Sector / Location */}
            <div className="flex flex-col gap-1.5 px-4 py-3 rounded-2xl bg-[#FDFBF7]/50 hover:bg-white/90 border border-slate-200 transition-colors focus-within:ring-1 focus-within:ring-amber-500/50">
              <label className="text-[11px] font-medium uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-amber-400" />
                Sector / Corridor
              </label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-white text-slate-900">All Noida Locations</option>
                <option value="Sector 150" className="bg-white text-slate-900">Sector 150 (Sports City)</option>
                <option value="Noida Expressway" className="bg-white text-slate-900">Noida Expressway (Sec 124 - 144)</option>
                <option value="Central Noida" className="bg-white text-slate-900">Central Noida (Sec 43, 121)</option>
                <option value="Yamuna Expressway" className="bg-white text-slate-900">Yamuna Exp. & Jewar Airport</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="flex flex-col gap-1.5 px-4 py-3 rounded-2xl bg-[#FDFBF7]/50 hover:bg-white/90 border border-slate-200 transition-colors focus-within:ring-1 focus-within:ring-amber-500/50">
              <label className="text-[11px] font-medium uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Building2 className="h-3 w-3 text-amber-400" />
                Property Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-white text-slate-900">All Property Categories</option>
                <option value="luxury_apartment" className="bg-white text-slate-900">Luxury Apartments (3/4 BHK)</option>
                <option value="penthouse" className="bg-white text-slate-900">Sky Mansions & Penthouses</option>
                <option value="commercial" className="bg-white text-slate-900">Commercial Retail & IT Spaces</option>
                <option value="plots" className="bg-white text-slate-900">Freehold Plots & Villas</option>
              </select>
            </div>

            {/* Budget Range */}
            <div className="flex flex-col gap-1.5 px-4 py-3 rounded-2xl bg-[#FDFBF7]/50 hover:bg-white/90 border border-slate-200 transition-colors focus-within:ring-1 focus-within:ring-amber-500/50">
              <label className="text-[11px] font-medium uppercase tracking-wider text-slate-800">
                Budget Range
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value="all" className="bg-white text-slate-900">Any Investment Budget</option>
                <option value="under_1cr" className="bg-white text-slate-900">Under ₹1.00 Crore</option>
                <option value="1cr_3cr" className="bg-white text-slate-900">₹1.00 Cr – ₹3.00 Cr</option>
                <option value="3cr_6cr" className="bg-white text-slate-900">₹3.00 Cr – ₹6.00 Cr</option>
                <option value="above_6cr" className="bg-white text-slate-900">Ultra-Luxury (₹6.00 Cr+)</option>
              </select>
            </div>

            {/* Action CTA */}
            <div className="flex items-center pt-1">
              <button
                type="submit"
                className="w-full h-full min-h-[56px] flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-bold text-sm transition-all shadow-[0_0_20px_-5px_rgba(251,191,36,0.4)] hover:shadow-[0_0_30px_-5px_rgba(251,191,36,0.6)] cursor-pointer"
              >
                <Search className="h-5 w-5" />
                <span>Find Properties</span>
              </button>
            </div>

          </form>

          {/* Quick Shortcuts */}
          <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 px-2 text-xs">
            <span className="text-slate-800">Popular Searches:</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onSearch({ sector: 'Sector 150', type: 'all', budget: 'all' })}
                className="text-slate-800 hover:text-amber-400 transition-colors"
              >
                Sector 150 Sports City
              </button>
              <span className="text-neutral-700">/</span>
              <button
                type="button"
                onClick={() => onSearch({ sector: 'Noida Expressway', type: 'all', budget: 'all' })}
                className="text-slate-800 hover:text-amber-400 transition-colors"
              >
                Expressway Towers
              </button>
              <span className="text-neutral-700">/</span>
              <button
                type="button"
                onClick={() => onSearch({ sector: 'Yamuna Expressway', type: 'all', budget: 'all' })}
                className="text-slate-800 hover:text-amber-400 transition-colors"
              >
                Jewar Airport Plots
              </button>
              <span className="text-neutral-700">/</span>
              <button
                type="button"
                onClick={() => onSearch({ sector: 'all', type: 'commercial', budget: 'all' })}
                className="text-slate-800 hover:text-amber-400 transition-colors"
              >
                Commercial 12% ROI
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
