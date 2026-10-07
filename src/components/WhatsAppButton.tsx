import React from 'react';
import { MessageSquareText } from 'lucide-react';
import { useSiteSettings } from '../context/SiteSettingsContext';

export const WhatsAppButton: React.FC = () => {
  const { settings } = useSiteSettings();
  const cleanPhone = (settings.agency.phone || '+91 78704 33580').replace(/[^0-9]/g, '');
  const domain = settings.agency.domain || 'krestatenoida.com';
  const whatsappUrl =
    `https://wa.me/${cleanPhone}?text=` +
    encodeURIComponent(`Hi ${settings.agency.name || 'KR Estate Noida'}, I am interested in properties in Noida & Jewar Corridor (via ${domain})`);

  return (
    <aside
      aria-label="Direct communication channels"
      className="fixed bottom-6 right-6 z-40 flex items-center"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center gap-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-slate-900 px-4 py-3 shadow-2xl shadow-emerald-950/60 border border-emerald-400/40 hover:scale-105 transition-all duration-300"
        title="Chat with KR Estate Advisory on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <MessageSquareText className="h-4 w-4" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline whitespace-nowrap">
          WhatsApp Advisor
        </span>
      </a>
    </aside>
  );
};
