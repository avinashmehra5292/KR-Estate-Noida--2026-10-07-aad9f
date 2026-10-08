import React, { useState, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Calendar, ShieldCheck, Compass } from 'lucide-react';
import { NOIDA_PROPERTIES } from '../data/properties';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVideo?: {
    title: string;
    videoUrl: string;
    duration: string;
    description: string;
  };
  onOpenScheduleModal: (projectName?: string) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  initialVideo,
  onOpenScheduleModal
}) => {
  if (!isOpen) return null;

  const defaultVideo = initialVideo || NOIDA_PROPERTIES[0].videoTour || {
    title: 'Noida Expressway & Sector 150 Drone Flythrough',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    duration: '02:45',
    description: 'Aerial drone survey across the Expressway growth corridor and masterplan developments.'
  };

  const [activeVideo, setActiveVideo] = useState(defaultVideo);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl rounded-3xl border border-amber-500/30 bg-[#0A0E18] shadow-[0_25px_70px_rgba(0,0,0,0.85)] ring-1 ring-amber-500/20 overflow-hidden flex flex-col text-slate-100 max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0D121F]/90">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 drop-shadow-sm">
              4K Drone Aerial Survey & Virtual Walkthrough
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black group overflow-hidden">
          {activeVideo.videoUrl?.includes('youtube.com') || activeVideo.videoUrl?.includes('youtu.be') ? (
            <iframe
              src={activeVideo.videoUrl.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              ref={videoRef}
              src={activeVideo.videoUrl}
              autoPlay
              playsInline
              controls
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="w-full h-full object-cover"
            />
          )}

          {/* Telemetry HUD Overlay (Drone inspection feel) */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none flex flex-col gap-1 text-[11px] font-mono text-slate-200 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/30 shadow-lg">
            <div className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Compass className="h-3.5 w-3.5 text-amber-400" />
              <span>ALT: 210M AGL · 4K 60FPS</span>
            </div>
            <span className="text-slate-300 truncate max-w-[280px]">
              NOIDA SECTOR SURVEY · KR ESTATE
            </span>
          </div>

          {/* Custom Overlay Player Controls */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-full gold-gradient-btn text-slate-950 font-bold transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
              </button>
              
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>

              <div className="text-xs text-white">
                <span className="font-semibold block">{activeVideo.title}</span>
                <span className="text-[11px] text-slate-300">{activeVideo.duration}</span>
              </div>
            </div>

            <button
              onClick={handleFullscreen}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Playlist Selector & Schedule Site Visit */}
        <div className="p-6 bg-[#0D121F]/95 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 overflow-x-auto">
          
          <div className="flex-1 w-full">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-2">
              Select Corridor or Property Drone Tour:
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {NOIDA_PROPERTIES.filter(p => p.videoTour).map((prop) => (
                <button
                  key={prop.id}
                  onClick={() => {
                    if (prop.videoTour) {
                      setActiveVideo(prop.videoTour);
                      setIsPlaying(true);
                      if (videoRef.current) {
                        videoRef.current.src = prop.videoTour.videoUrl;
                        videoRef.current.play();
                      }
                    }
                  }}
                  className={`px-3 py-2 text-xs font-medium rounded-xl border transition-all cursor-pointer whitespace-nowrap text-left ${
                    activeVideo.title === prop.videoTour?.title
                      ? 'gold-gradient-btn text-slate-950 font-bold border-amber-400 shadow-md shadow-amber-500/20'
                      : 'bg-[#13192B] text-slate-300 border-slate-800 hover:border-amber-400/40 hover:text-white'
                  }`}
                >
                  <span className="block truncate">{prop.title}</span>
                  <span className="text-[10px] opacity-75 font-mono">{prop.sector}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenScheduleModal(activeVideo.title.split(' ')[0]);
              }}
              className="w-full md:w-auto px-5 py-2.5 text-xs font-bold text-slate-950 gold-gradient-btn rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              <span>Book Site Visit for this Project</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
