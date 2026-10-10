import React from 'react';
import { ShieldCheck, Award, Building, CheckCircle2 } from 'lucide-react';

export const DeveloperPartners: React.FC = () => {
  const developers = [
    { name: 'Godrej Properties', legacy: '125+ Years Legacy', flagships: 'Godrej Woods · Sec 43', rera: 'UPRERA Certified' },
    { name: 'ATS Infrastructure', legacy: 'Institutional Luxury', flagships: 'Knightsbridge · Sec 124', rera: 'UPRERA Certified' },
    { name: 'Tata Housing', legacy: 'Smart Home Pioneer', flagships: 'Eureka Park · Sec 150', rera: 'UPRERA Certified' },
    { name: 'Mahagun Group', legacy: 'Golf Course Mansions', flagships: 'Manorialle · Sec 128', rera: 'UPRERA Certified' },
    { name: 'Gulshan Homz', legacy: 'Ultra-Luxury Bespoke', flagships: 'Dynasty · Sec 144', rera: 'UPRERA Certified' },
    { name: 'Ace Group', legacy: 'Green Sports Living', flagships: 'Ace Starlit · Sec 152', rera: 'UPRERA Certified' },
    { name: 'Paras Buildtech', legacy: 'High-Yield Commercial', flagships: 'Paras Avenue · Sec 129', rera: 'UPRERA Certified' },
    { name: 'CRC Group', legacy: 'Modern Urban Towers', flagships: 'CRC Maesta · Sec 140A', rera: 'UPRERA Certified' },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-[#05070D] relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
              Institutional Developer Alliances &amp; Channel Authorizations
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Direct Developer Pricing
            </span>
            <span className="text-slate-700">·</span>
            <span className="text-slate-300 font-medium">Zero Brokerage on New Launches</span>
          </div>
        </div>

        {/* Developer Grid / Marquee */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {developers.map((dev, idx) => (
            <div
              key={idx}
              className="group p-3.5 rounded-2xl bg-[#090D18]/80 hover:bg-[#101628] border border-white/5 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between min-h-[105px] shadow-sm hover:shadow-[0_8px_20px_rgba(245,158,11,0.1)] hover:-translate-y-1 cursor-default"
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <Building className="w-3.5 h-3.5 text-amber-400/80 group-hover:text-amber-400 transition-colors" />
                  <span className="text-[9px] font-mono text-emerald-400/90 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                    RERA
                  </span>
                </div>
                <h4 className="font-display font-bold text-xs text-white group-hover:text-amber-300 transition-colors leading-tight">
                  {dev.name}
                </h4>
              </div>

              <div className="mt-2 pt-2 border-t border-white/5">
                <span className="text-[10px] text-slate-400 block truncate group-hover:text-slate-300">
                  {dev.flagships}
                </span>
                <span className="text-[9px] text-amber-400/80 font-medium block uppercase tracking-wider">
                  {dev.legacy}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
