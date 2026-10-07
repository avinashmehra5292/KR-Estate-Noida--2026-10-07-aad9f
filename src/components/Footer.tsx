import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, Globe } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface FooterProps {
  onOpenScheduleModal: () => void;
  onOpenDomainModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenScheduleModal, onOpenDomainModal }) => {
  const { settings } = useSiteSettings();

  return (
    <footer className="border-t border-slate-300 bg-[#FDFBF7] text-slate-800 text-xs">
      
      {/* Top Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Overview (Col 2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 font-display font-bold text-lg">
                KR
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-slate-900">
                {settings.agency.name || 'KR Estate Noida'}
              </span>
            </div>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed max-w-md">
              {settings.agency.tagline || 'Noida’s premier real estate consultancy. Delivering curated property portfolios across Sector 150 Sports City, Noida Expressway, and the Yamuna Expressway Jewar Airport corridor.'}
            </p>
            
            <div className="pt-2 flex flex-col space-y-2 text-xs">
              <a href={`mailto:${settings.agency.email || 'avinashmehra5292@gmail.com'}`} className="flex items-center gap-2 text-slate-800 hover:text-amber-500 transition-colors">
                <Mail className="h-4 w-4 text-amber-500" />
                <span>{settings.agency.email || 'avinashmehra5292@gmail.com'}</span>
              </a>
              <a href={`tel:${(settings.agency.phone || '+91 78704 33580').replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2 text-slate-800 hover:text-amber-500 transition-colors">
                <Phone className="h-4 w-4 text-amber-500" />
                <span>{settings.agency.phone || '+91 78704 33580'}</span>
              </a>
              <div className="flex items-start gap-2 text-slate-800">
                <MapPin className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.agency.address || 'Corporate Suites, Sector 142 & Expressway, Noida, UP 201305'}</span>
              </div>
            </div>
          </div>

          {/* Micro-Markets & Sectors */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Noida Growth Sectors
            </h4>
            <ul className="space-y-2 text-slate-800">
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
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Advisory Solutions
            </h4>
            <ul className="space-y-2 text-slate-800">
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Luxury Apartments</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Commercial & Retail 12% ROI</a></li>
              <li><a href="#properties" className="hover:text-amber-400 transition-colors">Freehold Plotted Townships</a></li>
              <li><a href="#calculator" className="hover:text-amber-400 transition-colors">Home Loan EMI Calculator</a></li>
              <li><a href="#advisor" className="hover:text-amber-400 transition-colors">AI Investment Matchmaker</a></li>
              <li><a href="#valuation" className="hover:text-amber-400 transition-colors">Sell / Rent Property Listing</a></li>
            </ul>
          </div>

          {/* Trust & Domain */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Domain & Verification
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenDomainModal}
                className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{settings.agency.domain || 'krestatenoida.com'}</span>
              </button>
              <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-900 block">RERA Channel Partner</span>
                <p className="text-[11px] text-slate-800">
                  Registered under UP RERA. All developer partners strictly verified.
                </p>
              </div>
              <button
                onClick={() => onOpenScheduleModal()}
                className="w-full py-2 px-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
              >
                Book Site Inspection
              </button>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer (UP RERA Compliant) */}
        <div className="mt-12 pt-8 border-t border-slate-300 text-[11px] text-slate-800 leading-relaxed space-y-2">
          <p>
            <strong>Regulatory Disclaimer:</strong> KR Estate (operating at krestatenoida.com) functions as an authorized real estate advisory and channel partner for RERA-registered real estate projects in Noida, Greater Noida, and Yamuna Expressway. All project images, specifications, floor plans, and pricing displayed are for informational representation and subject to official builder terms and RERA filings. Nothing on this website constitutes a formal offer of sale without physical verification of official allotment documentation.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-4 border-t border-slate-200 text-slate-800">
            <div>
              {settings.seo.footerCopyright || `© ${new Date().getFullYear()} ${settings.agency.name || 'KR Estate Noida'} (${settings.agency.domain || 'krestatenoida.com'}). All rights reserved.`}
            </div>
            <div className="flex items-center gap-4">
              <span>Primary Contact: {settings.agency.email || 'avinashmehra5292@gmail.com'}</span>
              <span aria-hidden="true">·</span>
              <span>{settings.agency.phone || '+91 78704 33580'}</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
