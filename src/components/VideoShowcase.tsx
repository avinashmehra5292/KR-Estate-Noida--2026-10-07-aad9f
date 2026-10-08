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
    <section id="virtual-tours" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#070A10] relative overflow-hidden text-slate-100">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[300px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 drop-shadow-sm">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <span>Immersive Media & Site Inspections</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              4K Drone Aerial Tours & Virtual Walkthroughs
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl">
              Inspect actual construction progress, surrounding 80% green belts, expressway accessibility, and sky villa model interiors before your physical visit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenClientVideoModal && (
              <button
                onClick={onOpenClientVideoModal}
                className="px-4 py-2.5 rounded-xl gold-gradient-btn text-slate-950 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-amber-500/20"
              >
                <Video className="h-4 w-4" />
                <span>Make Client Expressway Video</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>KR Survey Team Verified</span>
            </div>
          </div>
        </div>

        {/* Client Video Presentation Feature Card */}
        {onOpenClientVideoModal && (
          <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-[#0D121F] to-[#121829] border border-amber-500/35 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl gold-gradient-btn text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25">
                <Video className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Broker & Advisor Studio</span>
                </div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mt-0.5">
                  Need a Bespoke Noida Expressway Real Estate Video for Your Client?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
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
        <div className="rounded-3xl border border-slate-800/90 bg-[#0D121F]/80 p-4 sm:p-6 backdrop-blur-xl shadow-2xl ring-1 ring-amber-500/15">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Main Video Hero Card (Col 8) */}
            <div className="lg:col-span-8">
              <div 
                onClick={() => onWatchVideo(activeTour)}
                className="group relative aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-pointer border border-amber-500/30 shadow-2xl hover:border-amber-400 transition-colors"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 group-hover:from-black/80 transition-colors" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full gold-gradient-btn text-slate-950 flex items-center justify-center shadow-2xl shadow-amber-500/40 group-hover:scale-110 transition-all duration-300">
                    <Play className="h-8 w-8 fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Top Corner Telemetry Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 text-[11px] font-mono text-slate-200 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30 shadow-lg">
                  <Compass className="h-3.5 w-3.5 text-amber-400" />
                  <span>4K DRONE FLYTHROUGH · {activeTour.duration}</span>
                </div>

                {/* Bottom Title Bar */}
                <div className="absolute bottom-4 inset-x-4 z-10 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block drop-shadow-sm">
                      {activeProperty.developer} · {activeProperty.sector}
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow-sm">
                      {activeTour.title}
                    </h3>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-xs font-semibold text-white backdrop-blur-md border border-white/20">
                    Watch Full Tour
                  </span>
                </div>

              </div>
            </div>

            {/* Video Playlist Cards (Col 4) */}
            <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Choose Inspection Chapter:
              </span>

              <div className="space-y-3">
                {videoProperties.map((prop, idx) => (
                  <div
                    key={prop.id}
                    onClick={() => setSelectedIdx(idx)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      selectedIdx === idx
                        ? 'bg-amber-500/15 border-amber-400/60 shadow-lg shadow-amber-500/10'
                        : 'bg-[#13192B]/80 border-slate-800/80 hover:border-amber-400/30 hover:bg-[#161F36]'
                    }`}
                  >
                    {/* Tiny Thumbnail */}
                    <div className="relative h-14 w-20 rounded-lg overflow-hidden shrink-0 border border-slate-700">
                      <SafeImage
                        src={prop.coverImage || ''}
                        alt={prop.title}
                        aspectRatioClass="h-full w-full"
                        fallbackGradient={prop.architecturalTheme?.gradient}
                        iconType={prop.architecturalTheme?.iconType}
                        title={prop.title}
                      />
                      <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                        <Play className="h-4 w-4 text-white fill-current" />
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="min-w-0 flex-1 text-xs">
                      <span className="font-semibold text-white block truncate">
                        {prop.title}
                      </span>
                      <span className="text-slate-400 text-[11px] block truncate">
                        {prop.sector} · {prop.locality}
                      </span>
                      <span className="text-amber-400 font-mono text-[10px] font-bold">
                        {prop.videoTour?.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onWatchVideo(activeTour)}
                  className="w-full py-3 text-xs font-bold text-slate-950 gold-gradient-btn rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
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
