import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface FooterProps {
  onOpenScheduleModal: () => void;
  onOpenDomainModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenScheduleModal }) => {
  const { settings } = useSiteSettings();

  return (
    <footer className="border-t border-slate-800/90 bg-[#05070D] text-slate-400 text-xs">
      
      {/* Top Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Overview (Col 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400/25 via-amber-500/15 to-transparent border border-amber-400/40 text-amber-300 font-display font-bold text-lg shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                KR
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-white">
                {settings.agency.name || 'KR Estate Noida'}
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
              {settings.agency.tagline || 'Noida’s premier real estate consultancy. Delivering curated property portfolios across Sector 150 Sports City, Noida Expressway, and the Yamuna Expressway Jewar Airport corridor.'}
            </p>
            
            <div className="pt-2 flex flex-col space-y-2.5 text-xs">
              <a href={`mailto:${settings.agency.email || 'avinashmehra5292@gmail.com'}`} className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors">
                <Mail className="h-4 w-4 text-amber-400" />
                <span>{settings.agency.email || 'avinashmehra5292@gmail.com'}</span>
              </a>
              <a href={`tel:${(settings.agency.phone || '+91 78704 33580').replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-slate-300 hover:text-amber-400 transition-colors">
                <Phone className="h-4 w-4 text-amber-400" />
                <span>{settings.agency.phone || '+91 78704 33580'}</span>
              </a>
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.agency.address || 'Corporate Suites, Sector 142 & Expressway, Noida, UP 201305'}</span>
              </div>
            </div>
          </div>

          {/* Micro-Markets & Sectors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Noida Growth Sectors
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#localities" className="hover:text-amber-400 transition-colors">Sector 150 Sports City</a></li>
              <li><a href="#localities" className="hover:text-amber-400 transition-colors">Sector 128 Wish Town</a></li>
              <li><a href="#localities" className="hover:text-amber-400 transition-colors">Sector 140A IT Corridor</a></li>
              <li><a href="#localities" className="hover:text-amber-400 transition-colors">Yamuna Exp. Aerocity</a></li>
              <li><a href="#localities" className="hover:text-amber-400 transition-colors">Central Noida (Sec 43, 121)</a></li>
              <li><a href="#localities" className="hover:text-amber-400 transition-colors">Greater Noida West</a></li>
            </ul>
          </div>

          {/* Quick Advisory Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Advisory Solutions
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Luxury Apartments</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Commercial &amp; Retail 12% ROI</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Freehold Plotted Townships</a></li>
              <li><a href="#calculator" className="hover:text-amber-400 transition-colors">Home Loan EMI Calculator</a></li>
              <li><a href="#advisor" className="hover:text-amber-400 transition-colors">AI Investment Matchmaker</a></li>
              <li><a href="#valuation" className="hover:text-amber-400 transition-colors">Sell / Rent Property Listing</a></li>
            </ul>
          </div>

        </div>

        {/* Regulatory Disclaimer (UP RERA Compliant) */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-300">Regulatory Disclaimer:</strong> KR Estate (operating at krestatenoida.com) functions as an authorized real estate advisory and channel partner for RERA-registered real estate projects in Noida, Greater Noida, and Yamuna Expressway. All project images, specifications, floor plans, and pricing displayed are for informational representation and subject to official builder terms and RERA filings. Nothing on this website constitutes a formal offer of sale without physical verification of official allotment documentation.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-slate-800/80 text-slate-400">
            <div>
              {settings.seo.footerCopyright || `© ${new Date().getFullYear()} ${settings.agency.name || 'KR Estate Noida'} (${settings.agency.domain || 'krestatenoida.com'}). All rights reserved.`}
            </div>
            <div className="flex items-center gap-4">
              <span>Primary Contact: <span className="text-slate-300">{settings.agency.email || 'avinashmehra5292@gmail.com'}</span></span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span><span className="text-slate-300">{settings.agency.phone || '+91 78704 33580'}</span></span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
