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
    <section id="localities" className="py-20 lg:py-28 border-b border-slate-200 bg-[#FDFBF7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Regional Intelligence
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Noida Growth Corridors & Micro-Market Analysis
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-800">
            Strategic appraisal of Noida’s primary investment belts — infrastructure timelines, rental yields, and upcoming transit links.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-300/80 shadow-[0_4px_20px_rgb(0,0,0,0.02)] mb-8 max-w-4xl">
          {localities.map((loc, idx) => (
            <button
              key={loc.id || idx}
              onClick={() => setActiveLocalityIndex(idx)}
              className={`px-4 py-2.5 text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeLocalityIndex === idx
                  ? 'bg-amber-400 text-neutral-950 shadow-md'
                  : 'text-slate-800 hover:text-slate-900'
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* Active Locality Showcase Card */}
        <div 
          key={activeLocalityIndex} // Using key to trigger re-animation on tab change
          className="rounded-3xl border border-slate-300/80 bg-white/90 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_8px_32px_rgb(0,0,0,0.04)] animate-in fade-in slide-in-from-right-8 duration-700 fill-mode-both"
        >
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Content (Col 8) */}
            <div className="lg:col-span-8 space-y-6">
              
              <div>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider block mb-1">
                  {activeLocality.subtitle}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                  {activeLocality.name}
                </h3>
              </div>

              <p className="text-slate-800 text-sm sm:text-base leading-relaxed">
                {activeLocality.description}
              </p>

              {/* Sector Highlights */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 block">
                  Infrastructure & Strategic Merits
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(activeLocality.highlights || []).map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800">
                      <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transit & Landmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-300 text-xs">
                <div className="p-3 rounded-xl bg-[#FDFBF7]/60 border border-slate-200">
                  <span className="text-slate-800 flex items-center gap-1 mb-1 font-semibold">
                    <Train className="h-3.5 w-3.5 text-amber-400" />
                    Metro Connectivity
                  </span>
                  <span className="text-slate-900 font-medium">{activeLocality.metroConnectivity || 'Aqua Line & Expressway Transit'}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FDFBF7]/60 border border-slate-200">
                  <span className="text-slate-800 flex items-center gap-1 mb-1 font-semibold">
                    <MapPin className="h-3.5 w-3.5 text-amber-400" />
                    Key Regional Landmarks
                  </span>
                  <span className="text-slate-900 font-medium">{(activeLocality.landmarkAttractions || []).join(' · ') || 'Key Expressways & Commercial Parks'}</span>
                </div>
              </div>

            </div>

            {/* Right Metrics & Projects (Col 4) */}
            <div className="lg:col-span-4 rounded-2xl bg-[#FDFBF7]/90 border border-slate-300 p-6 space-y-6">
              
              <div>
                <span className="text-xs text-slate-800 block">Current Benchmark Valuation</span>
                <span className="font-mono text-xl font-bold text-slate-900 tabular-nums">
                  {activeLocality.avgPricePerSqFt || 'Contact for rates'}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  3-Year Capital Outlook
                </span>
                <span className="font-mono text-xl font-bold text-amber-400">
                  {activeLocality.projectedGrowth3Yr || '+25% Appreciation'}
                </span>
                <p className="text-[11px] text-amber-200/70 mt-1">
                  Driven by Jewar Airport rollout and Expressway corporate tenant absorption.
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-800 block mb-2">
                  Prime Projects Handled by KR Estate
                </span>
                <div className="space-y-1.5">
                  {(activeLocality.topProjects || []).map((proj, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200">
                      <span className="text-slate-800 font-medium">{proj}</span>
                      <span className="text-amber-400 font-mono text-[11px]">Verified</span>
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
                className="w-full py-2.5 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
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
