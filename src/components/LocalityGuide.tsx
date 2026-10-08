import React, { useState } from 'react';
import { NOIDA_LOCALITIES } from '../data/localities';
import { MapPin, TrendingUp, Train, Check, ArrowRight } from 'lucide-react';

interface LocalityGuideProps {
  onSelectLocalityFilter: (sectorSlug: string) => void;
}

export const LocalityGuide: React.FC<LocalityGuideProps> = ({ onSelectLocalityFilter }) => {
  const [localities, setLocalities] = useState(NOIDA_LOCALITIES);
  const [activeLocalityIndex, setActiveLocalityIndex] = useState(0);

  React.useEffect(() => {
    fetch('/api/localities')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setLocalities(data);
        }
      })
      .catch(() => {});
  }, []);

  const activeLocality = localities[activeLocalityIndex] || localities[0] || NOIDA_LOCALITIES[0];

  return (
    <section id="localities" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#070A10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Regional Intelligence
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Noida Growth Corridors &amp; Micro-Market Analysis
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            Strategic appraisal of Noida’s primary investment belts — infrastructure timelines, rental yields, and upcoming transit links.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0D121F]/80 backdrop-blur-xl rounded-2xl border border-slate-800/90 shadow-xl mb-8 max-w-4xl">
          {localities.map((loc, idx) => (
            <button
              key={loc.id || idx}
              onClick={() => setActiveLocalityIndex(idx)}
              className={`px-4 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeLocalityIndex === idx
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* Active Locality Showcase Card */}
        <div 
          key={activeLocalityIndex} // Using key to trigger re-animation on tab change
          className="rounded-3xl border border-slate-800/90 bg-[#0D121F]/80 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-right-8 duration-700 fill-mode-both"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content (Col 8) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block mb-1">
                  {activeLocality.subtitle}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                  {activeLocality.name}
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeLocality.description}
              </p>

              {/* Sector Highlights */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Infrastructure &amp; Strategic Merits
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(activeLocality.highlights || []).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transit & Landmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 text-xs">
                <div className="p-3.5 rounded-xl bg-[#121829]/70 border border-slate-800/80">
                  <span className="text-amber-400 flex items-center gap-1.5 mb-1 font-semibold">
                    <Train className="h-3.5 w-3.5" />
                    Metro Connectivity
                  </span>
                  <span className="text-slate-200 font-medium">{activeLocality.metroConnectivity || 'Aqua Line & Expressway Transit'}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#121829]/70 border border-slate-800/80">
                  <span className="text-amber-400 flex items-center gap-1.5 mb-1 font-semibold">
                    <MapPin className="h-3.5 w-3.5" />
                    Key Regional Landmarks
                  </span>
                  <span className="text-slate-200 font-medium">{(activeLocality.landmarkAttractions || []).join(' · ') || 'Key Expressways & Commercial Parks'}</span>
                </div>
              </div>

            </div>

            {/* Right Metrics & Projects (Col 4) */}
            <div className="lg:col-span-4 rounded-2xl bg-[#090D17]/90 border border-slate-800/90 p-6 space-y-6 shadow-xl">
              
              <div>
                <span className="text-xs text-slate-400 block mb-1">Current Benchmark Valuation</span>
                <span className="font-mono text-2xl font-bold text-white tabular-nums">
                  {activeLocality.avgPricePerSqFt || 'Contact for rates'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/15 via-amber-600/10 to-transparent border border-amber-400/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 mb-1">
                  <TrendingUp className="h-4 w-4 text-amber-400" />
                  3-Year Capital Outlook
                </span>
                <span className="font-mono text-2xl font-bold text-amber-400 drop-shadow-[0_0_10px_rgba(245,158,11,0.35)]">
                  {activeLocality.projectedGrowth3Yr || '+25% Appreciation'}
                </span>
                <p className="text-[11px] text-amber-200/80 mt-1 leading-relaxed">
                  Driven by Jewar Airport rollout and Expressway corporate tenant absorption.
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2.5">
                  Prime Projects Handled by KR Estate
                </span>
                <div className="space-y-2">
                  {(activeLocality.topProjects || []).map((proj, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/80">
                      <span className="text-slate-200 font-medium">{proj}</span>
                      <span className="text-amber-400 font-mono text-[11px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">Verified</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectLocalityFilter(activeLocality.name);
                  const el = document.getElementById('properties');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:shadow-[0_0_30px_rgba(245,158,11,0.55)] hover:-translate-y-0.5"
              >
                <span>View Properties in this Sector</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
