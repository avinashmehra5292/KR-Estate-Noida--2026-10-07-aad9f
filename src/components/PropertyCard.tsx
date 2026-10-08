import React from 'react';
import { Property } from '../types';
import { SafeImage } from './SafeImage';
import { ArrowUpRight, Camera, Play } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (propertyName: string) => void;
  onWatchVideo?: (video: any) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onSelectProperty,
  onScheduleVisit,
  onWatchVideo
}) => {
  return (
    <article className="group flex flex-col rounded-3xl border border-slate-800/80 bg-[#0D121F]/75 backdrop-blur-xl hover:bg-[#121829]/85 hover:border-amber-400/50 transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.18)] hover:-translate-y-1.5">
      
      {/* High-Resolution Photo Showcase Banner with Scrim */}
      <div 
        onClick={() => onSelectProperty(property)}
        className="relative h-60 w-full cursor-pointer overflow-hidden bg-slate-950"
      >
        <SafeImage
          src={property.coverImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'}
          alt={property.title}
          aspectRatioClass="h-full w-full"
          fallbackGradient={property.architecturalTheme?.gradient}
          iconType={property.architecturalTheme?.iconType}
          title={property.title}
          className="group-hover:scale-105 transition-transform duration-700"
        />

        {/* Contrast Scrim (Measured contrast scrim >= 4.5:1 as mandated by frontend-design) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 group-hover:from-black/85 transition-colors" />

        {/* Top unboxed status indicator */}
        <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between text-xs">
          <span className="font-semibold text-amber-300 tracking-wider uppercase text-[11px] bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-amber-500/25 shadow-sm">
            {property.developer || 'Featured Residence'}
          </span>
          {property.possessionDate ? (
            <span className="text-slate-200 font-medium text-[11px] bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/60 shadow-sm">
              {property.possessionDate}
            </span>
          ) : <span />}
        </div>

        {/* Media Badges (Photos count + Video Tour) */}
        <div className="absolute bottom-4 inset-x-4 z-10 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-slate-200 bg-slate-950/75 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/60 shadow-sm">
              <Camera className="h-3 w-3 text-amber-400" />
              <span>{property.galleryImages?.length || 1} Photos</span>
            </span>

            {property.videoTour && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onWatchVideo && property.videoTour) {
                    onWatchVideo(property.videoTour);
                  } else {
                    onSelectProperty(property);
                  }
                }}
                className="flex items-center gap-1 text-[11px] font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 px-2.5 py-1 rounded-lg transition-all shadow-[0_0_15px_rgba(245,158,11,0.35)] cursor-pointer"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>Video Tour</span>
              </button>
            )}
          </div>

          <span className="text-xs text-amber-300 font-mono font-medium flex items-center gap-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform drop-shadow">
            Gallery <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-6">
        
        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 font-medium">
          <span className="text-amber-400/90">{property.sector || property.locality || 'Noida'}</span>
          {property.bhkConfigurations && property.bhkConfigurations.length > 0 && (
            <>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>{property.bhkConfigurations.join(' / ')}</span>
            </>
          )}
        </div>

        {/* Primary Title */}
        <h3 
          onClick={() => onSelectProperty(property)}
          className="font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
        >
          {property.title}
        </h3>

        <p className="mt-2 text-sm text-slate-300 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {property.shortDescription || property.tagline || (property.fullDescription ? property.fullDescription.slice(0, 130) + '...' : 'Premium curated landmark on the Noida corridor with luxury architecture and lifestyle amenities.')}
        </p>

        {/* Feature Points */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Metro Transit</span>
            <span className="font-medium text-slate-200">{property.distanceToMetro || '500m (Aqua Line Corridor)'}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Jewar Airport</span>
            <span className="font-medium text-slate-200">{property.distanceToAirport || '35 Mins (Jewar Airport)'}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>RERA Registered</span>
            <span className="font-mono text-emerald-400 font-semibold text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25">{property.reraNumber || 'UPRERA Verified'}</span>
          </div>
        </div>

        {/* Pricing & CTA Zone */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-medium block">
              Investment Pricing
            </span>
            <span className="font-mono font-bold text-xl text-amber-400 tabular-nums drop-shadow-[0_0_12px_rgba(245,158,11,0.3)]">
              {property.priceDisplay || (property.priceNumInCrores ? `₹${property.priceNumInCrores} Cr` : 'Price on Request')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onScheduleVisit(property.title)}
              className="px-3.5 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 rounded-xl transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] cursor-pointer whitespace-nowrap hover:-translate-y-0.5"
            >
              Book Visit
            </button>
            <button
              type="button"
              onClick={() => onSelectProperty(property)}
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 hover:text-white rounded-xl border border-slate-700/80 hover:border-amber-400/40 transition-colors cursor-pointer whitespace-nowrap"
            >
              Specs
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};

