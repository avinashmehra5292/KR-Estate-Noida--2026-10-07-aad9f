import React, { useState } from 'react';
import { Play, Compass, Eye, ShieldCheck, Video, Sparkles, Send, ArrowRight, Film, Radio } from 'lucide-react';
import { NOIDA_PROPERTIES } from '../data/properties';
import { SafeImage } from './SafeImage';

interface VideoShowcaseProps {
  onWatchVideo: (video: {
    title: string;
    videoUrl: string;
    duration: string;
    description: string;
  }) => void;
  onOpenClientVideoModal?: () => void;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ onWatchVideo, onOpenClientVideoModal }) => {
  const videoProperties = NOIDA_PROPERTIES.filter((p) => p.videoTour);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeProperty = videoProperties[selectedIdx] || videoProperties[0];
  const activeTour = activeProperty.videoTour!;

  return (
    <section id="virtual-tours" className="py-20 lg:py-28 border-b border-orange-200/60 bg-[#FFF3EB] relative overflow-hidden text-slate-900">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-amber-400/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[300px] bg-orange-300/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 mb-2.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span>Cinema-Grade Immersive Inspections</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
              4K Drone Aerial Tours &amp; Architecture Walkthroughs
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-2xl leading-relaxed">
              Inspect actual construction progress, surrounding 80% green belts, expressway accessibility, and sky villa model interiors before your physical visit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenClientVideoModal && (
              <button
                onClick={onOpenClientVideoModal}
                className="px-5 py-3 rounded-xl gold-gradient-btn text-slate-950 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 whitespace-nowrap"
              >
                <Video className="h-4 w-4" />
                <span>Expressway Video Studio</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-700 bg-white/80 px-3 py-2 rounded-xl border border-orange-200/80 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>KR Aerial Survey Team</span>
            </div>
          </div>
        </div>

        {/* Client Video Presentation Feature Card */}
        {onOpenClientVideoModal && (
          <div className="mb-10 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-500/10 via-[#FFF8F2] to-[#FDEEE4] border border-orange-200/90 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl gold-gradient-btn text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                <Film className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Private Client &amp; Investor Reel Studio</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  Generate a Bespoke Noida Expressway Real Estate Video for Your Clients
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl leading-relaxed">
                  Personalize the 4-scene Noida Expressway 4K drone flythrough with your client's name, customized property focus (Sec 128 Golf, Sec 150 Green Living, Sec 140A Commercial), AI voice narration, and direct WhatsApp sharing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={onOpenClientVideoModal}
                className="w-full md:w-auto px-6 py-3.5 rounded-xl gold-gradient-btn text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Launch Client Video Studio</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Featured Video Player Spotlight */}
        <div className="rounded-3xl border border-orange-200/90 bg-white/95 p-5 sm:p-7 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Main Video Hero Card (Col 8) */}
            <div className="lg:col-span-8">
              <div 
                onClick={() => onWatchVideo(activeTour)}
                className="group relative aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-pointer border border-orange-200 shadow-2xl hover:border-amber-400 transition-all"
              >
                <SafeImage
                  src={activeProperty.coverImage || ''}
                  alt={activeTour.title}
                  aspectRatioClass="aspect-[16/9]"
                  fallbackGradient={activeProperty.architecturalTheme?.gradient}
                  iconType={activeProperty.architecturalTheme?.iconType}
                  title={activeTour.title}
                  className="group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 group-hover:from-black/80 transition-colors" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full gold-gradient-btn text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 group-hover:scale-110 transition-all duration-300">
                    <Play className="h-8 w-8 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Top Corner Telemetry Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[11px] font-mono text-slate-200 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30 shadow-lg">
                  <Compass className="h-3.5 w-3.5 text-amber-400" />
                  <span>4K DRONE FLYTHROUGH · {activeTour.duration}</span>
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute bottom-4 inset-x-4 z-10 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block drop-shadow-sm">
                      {activeProperty.developer} · {activeProperty.sector}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
                      {activeTour.title}
                    </h3>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-xs font-semibold text-white backdrop-blur-md border border-white/20">
                    Watch Full Tour
                  </span>
                </div>

              </div>
            </div>

            {/* Video Playlist Cards (Col 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Choose Inspection Chapter:
              </span>

              <div className="space-y-3">
                {videoProperties.map((prop, idx) => (
                  <div
                    key={prop.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`flex items-center gap-3 p-3 rounded-2xl border transition-all cursor-pointer ${
                      selectedIdx === idx
                        ? 'bg-amber-500/15 border-amber-500/70 shadow-md shadow-amber-500/10'
                        : 'bg-[#FFF8F3] border-orange-200/80 hover:border-amber-400/50 hover:bg-white'
                    }`}
                  >
                    {/* Tiny Thumbnail */}
                    <div className="relative h-14 w-20 rounded-xl overflow-hidden shrink-0 border border-orange-200">
                      <SafeImage
                        src={prop.coverImage || ''}
                        alt={prop.title}
                        aspectRatioClass="h-full w-full"
                        fallbackGradient={prop.architecturalTheme?.gradient}
                        iconType={prop.architecturalTheme?.iconType}
                        title={prop.title}
                      />
                      <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white fill-current" />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1 text-xs">
                      <span className="font-semibold text-slate-900 block truncate">
                        {prop.title}
                      </span>
                      <span className="text-slate-600 text-[11px] block truncate">
                        {prop.sector} · {prop.locality}
                      </span>
                      <span className="text-amber-700 font-mono text-[10px] font-bold">
                        {prop.videoTour?.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onWatchVideo(activeTour)}
                  className="w-full py-3.5 text-xs font-bold text-slate-950 gold-gradient-btn rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Eye className="h-4 w-4" />
                  <span>Launch 4K Virtual Walkthrough</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

