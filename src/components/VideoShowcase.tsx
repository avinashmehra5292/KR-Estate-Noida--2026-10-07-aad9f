import React, { useState } from 'react';
import { Play, Compass, Eye, ShieldCheck, Video, Sparkles, Send, ArrowRight } from 'lucide-react';
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
    <section id="virtual-tours" className="py-20 lg:py-28 border-b border-slate-200 bg-[#FDFBF7] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[300px] bg-amber-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span>Immersive Media & Site Inspections</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              4K Drone Aerial Tours & Virtual Walkthroughs
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-800 max-w-2xl">
              Inspect actual construction progress, surrounding 80% green belts, expressway accessibility, and sky villa model interiors before your physical visit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenClientVideoModal && (
              <button
                onClick={onOpenClientVideoModal}
                className="px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 text-amber-300 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Video className="h-4 w-4 text-amber-400" />
                <span>Make Client Expressway Video</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-800">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>KR Survey Team</span>
            </div>
          </div>
        </div>

        {/* Client Video Presentation Feature Card */}
        {onOpenClientVideoModal && (
          <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-neutral-900 to-neutral-900 border border-amber-400/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20">
                <Video className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Broker & Advisor Studio</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  Need a Bespoke Noida Expressway Real Estate Video for Your Client?
                </h3>
                <p className="text-xs sm:text-sm text-slate-800 mt-1 max-w-2xl">
                  Personalize the 4-scene Noida Expressway 4K drone flythrough with your client's name, customized property focus (Sec 128 Golf, Sec 150 Green Living, Sec 140A Commercial), AI voice narration, and direct WhatsApp sharing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={onOpenClientVideoModal}
                className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Launch Client Video Studio</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Featured Video Player Spotlight */}
        <div className="rounded-3xl border border-slate-300 bg-white/90 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Main Video Hero Card (Col 8) */}
            <div className="lg:col-span-8">
              <div 
                onClick={() => onWatchVideo(activeTour)}
                className="group relative aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-pointer border border-slate-300 shadow-2xl"
              >
                <SafeImage
                  src={activeProperty.coverImage || ''}
                  alt={activeTour.title}
                  aspectRatioClass="aspect-[16/9]"
                  fallbackGradient={activeProperty.architecturalTheme?.gradient}
                  iconType={activeProperty.architecturalTheme?.iconType}
                  title={activeTour.title}
                />

                {/* Dark Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 group-hover:from-black/75 transition-colors" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-amber-400 group-hover:bg-amber-300 text-neutral-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 group-hover:scale-110 transition-all duration-300">
                    <Play className="h-8 w-8 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Top Corner Telemetry Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[11px] font-mono text-slate-900/90 bg-slate-900/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-300">
                  <Compass className="h-3.5 w-3.5 text-amber-400" />
                  <span>4K DRONE FLYTHROUGH · {activeTour.duration}</span>
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute bottom-4 inset-x-4 z-10 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-amber-300 font-medium uppercase tracking-wider block">
                      {activeProperty.developer} · {activeProperty.sector}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                      {activeTour.title}
                    </h3>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-900 backdrop-blur-md border border-slate-300">
                    Watch Full Tour
                  </span>
                </div>

              </div>
            </div>

            {/* Video Playlist Cards (Col 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                Choose Inspection Chapter:
              </span>

              <div className="space-y-3">
                {videoProperties.map((prop, idx) => (
                  <div
                    key={prop.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedIdx === idx
                        ? 'bg-amber-500/10 border-amber-500/40 shadow-md'
                        : 'bg-[#FDFBF7]/60 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Tiny Thumbnail */}
                    <div className="relative h-14 w-20 rounded-lg overflow-hidden shrink-0 border border-slate-300">
                      <SafeImage
                        src={prop.coverImage || ''}
                        alt={prop.title}
                        aspectRatioClass="h-full w-full"
                        fallbackGradient={prop.architecturalTheme?.gradient}
                        iconType={prop.architecturalTheme?.iconType}
                        title={prop.title}
                      />
                      <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                        <Play className="h-4 w-4 text-slate-900 fill-current" />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1 text-xs">
                      <span className="font-semibold text-slate-900 block truncate">
                        {prop.title}
                      </span>
                      <span className="text-slate-800 text-[11px] block truncate">
                        {prop.sector} · {prop.locality}
                      </span>
                      <span className="text-amber-400 font-mono text-[10px]">
                        {prop.videoTour?.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onWatchVideo(activeTour)}
                  className="w-full py-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
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
