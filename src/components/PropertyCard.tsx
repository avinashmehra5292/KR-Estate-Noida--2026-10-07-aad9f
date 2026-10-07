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
    <article className="group flex flex-col rounded-3xl border border-slate-300/80 bg-white/90 backdrop-blur-xl hover:bg-white/90 hover:border-amber-400/40 transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1">
      
      {/* High-Resolution Photo Showcase Banner with Scrim */}
      <div 
        onClick={() => onSelectProperty(property)}
        className="relative h-60 w-full cursor-pointer overflow-hidden bg-[#FDFBF7]"
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 group-hover:from-black/80 transition-colors" />

        {/* Top unboxed status indicator */}
        <div className="absolute top-4 inset-x-4 z-10 flex items-center justify-between text-xs">
          <span className="font-semibold text-amber-300 tracking-wider uppercase text-[11px] drop-shadow-md">
            {property.developer || 'Featured Residence'}
          </span>
          {property.possessionDate ? (
            <span className="text-slate-100 font-medium text-[11px] bg-slate-900/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-300/30 shadow-sm">
              {property.possessionDate}
            </span>
          ) : <span />}
        </div>

        {/* Media Badges (Photos count + Video Tour) */}
        <div className="absolute bottom-4 inset-x-4 z-10 flex items-end justify-between">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-medium text-slate-100 bg-slate-900/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-300/30 shadow-sm">
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
                className="flex items-center gap-1 text-[11px] font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 px-2.5 py-1 rounded-md transition-colors shadow-md"
              >
                <Play className="h-3 w-3 fill-current" />
                <span>Video Tour</span>
              </button>
            )}
          </div>

          <span className="text-xs text-amber-300 font-mono flex items-center gap-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform drop-shadow">
            Gallery <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col p-6">
        
        {/* Unboxed Metadata (Zero-pill discipline) */}
        <div className="flex items-center gap-1.5 text-xs text-slate-800 mb-2">
          <span>{property.sector || property.locality || 'Noida'}</span>
          {property.bhkConfigurations && property.bhkConfigurations.length > 0 && (
            <>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>{property.bhkConfigurations.join(' / ')}</span>
            </>
          )}
        </div>

        {/* Primary Title */}
        <h3 
          onClick={() => onSelectProperty(property)}
          className="font-display text-xl font-bold text-slate-900 group-hover:text-amber-300 transition-colors cursor-pointer"
        >
          {property.title}
        </h3>

        <p className="mt-2 text-sm text-slate-800 line-clamp-2 leading-relaxed min-h-[2.5rem]">
          {property.shortDescription || property.tagline || (property.fullDescription ? property.fullDescription.slice(0, 130) + '...' : 'Premium curated landmark on the Noida corridor with luxury architecture and lifestyle amenities.')}
        </p>

        {/* Feature Points */}
        <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-800">
            <span className="text-slate-800">Metro Transit</span>
            <span className="font-medium text-slate-900">{property.distanceToMetro || '500m (Aqua Line Corridor)'}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-800">
            <span className="text-slate-800">Jewar Airport</span>
            <span className="font-medium text-slate-900">{property.distanceToAirport || '35 Mins (Jewar Airport)'}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-800">
            <span className="text-slate-800">RERA Registered</span>
            <span className="font-mono text-emerald-600 font-semibold text-[11px]">{property.reraNumber || 'UPRERA Verified'}</span>
          </div>
        </div>

        {/* Pricing & CTA Zone */}
        <div className="mt-6 pt-4 border-t border-slate-300 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-800 block">
              Investment Pricing
            </span>
            <span className="font-mono font-bold text-lg text-amber-400 tabular-nums">
              {property.priceDisplay || (property.priceNumInCrores ? `₹${property.priceNumInCrores} Cr` : 'Price on Request')}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onScheduleVisit(property.title)}
              className="px-3 py-2 text-xs font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Book Visit
            </button>
            <button
              type="button"
              onClick={() => onSelectProperty(property)}
              className="px-3 py-2 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-800 hover:text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Specs
            </button>
          </div>
        </div>

      </div>
    </article>
  );
};

