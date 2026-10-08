import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, Car, Clock, Phone, Mail, User, Loader2 } from 'lucide-react';
import { NOIDA_PROPERTIES } from '../data/properties';
import { useSiteSettings } from '../context/SiteSettingsContext';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProject?: string;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  preselectedProject
}) => {
  const { settings } = useSiteSettings();
  const [selectedProject, setSelectedProject] = useState(preselectedProject || NOIDA_PROPERTIES[0].title);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('11:00 AM');
  const [pickupRequired, setPickupRequired] = useState(true);
  const [pickupCity, setPickupCity] = useState('Noida');
  const [customPickupCity, setCustomPickupCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const message = `*New Site Visit Booking*
Name: ${fullName}
Phone: ${phoneNumber}
Email: ${email}
Project: ${selectedProject}
Date: ${preferredDate}
Time Slot: ${timeSlot}
Pickup Required: ${pickupRequired ? `Yes (${pickupCity === 'Others' ? customPickupCity : pickupCity})` : 'No'}`;

    const cleanPhone = (settings.agency.phone || '+91 78704 33580').replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    try {
      await fetch('/api/schedule-visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phoneNumber,
          email,
          project: selectedProject,
          date: preferredDate,
          timeSlot,
          pickupRequired,
          pickupCity: pickupCity === 'Others' ? customPickupCity : pickupCity
        })
      });
    } catch (e) {
      console.error(e);
    }

    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div 
          className="relative w-full max-w-xl rounded-3xl border border-slate-800/90 bg-[#0D121F] shadow-[0_25px_60px_rgba(0,0,0,0.8)] overflow-hidden p-6 sm:p-8 text-white text-left my-8 ring-1 ring-amber-500/20"
          onClick={(e) => e.stopPropagation()}
        >
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="h-10 w-10 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white font-display">
              Site Visit Confirmed
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              We have reserved your visit to <span className="text-amber-400 font-bold">{selectedProject}</span> on <span className="text-white font-semibold">{preferredDate || 'your selected date'} at {timeSlot}</span>.
            </p>
            <div className="p-4 rounded-xl bg-[#111728] border border-slate-800 text-xs text-slate-300 text-left space-y-1.5">
              <div>• You have been redirected to WhatsApp to confirm your booking.</div>
              <div>• You can chat directly with our advisory desk at: <span className="text-amber-400 font-semibold">{settings.agency.phone || '+91 78704 33580'}</span></div>
              {pickupRequired && <div>• Chauffeur coordination details will be confirmed on WhatsApp.</div>}
            </div>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <Calendar className="h-4 w-4 text-amber-400" />
              <span>Complimentary VIP Site Visit</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-white tracking-tight">
              Schedule Your Guided Property Tour
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Includes private walkthrough, masterplan model viewing, and optional complimentary luxury chauffeur pickup across Delhi NCR.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              
              {/* Project Selection */}
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                  Target Project *
                </label>
                <select
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#131A2B] border border-slate-700/80 text-slate-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 cursor-pointer"
                >
                  {NOIDA_PROPERTIES.map((p) => (
                    <option key={p.id} value={p.title} className="bg-[#0D121F] text-slate-100">
                      {p.title} ({p.sector}, {p.locality})
                    </option>
                  ))}
                </select>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#131A2B] border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#131A2B] border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#131A2B] border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                />
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#131A2B] border border-slate-700/80 text-slate-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 [&::-webkit-calendar-picker-indicator]:invert cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#131A2B] border border-slate-700/80 text-slate-100 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 cursor-pointer"
                  >
                    <option value="10:00 AM" className="bg-[#0D121F] text-slate-100">10:00 AM (Morning Session)</option>
                    <option value="12:00 PM" className="bg-[#0D121F] text-slate-100">12:00 PM (Noon)</option>
                    <option value="03:00 PM" className="bg-[#0D121F] text-slate-100">03:00 PM (Afternoon)</option>
                    <option value="05:00 PM" className="bg-[#0D121F] text-slate-100">05:00 PM (Sunset / Evening View)</option>
                  </select>
                </div>
              </div>

              {/* Complimentary Pickup */}
              <div className="p-3.5 rounded-xl bg-[#111728]/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-white flex items-center gap-1.5 cursor-pointer">
                    <Car className="h-4 w-4 text-amber-400" />
                    Complimentary Chauffeur Cab Pick &amp; Drop
                  </label>
                  <input
                    type="checkbox"
                    checked={pickupRequired}
                    onChange={(e) => setPickupRequired(e.target.checked)}
                    className="h-4 w-4 rounded accent-amber-400 cursor-pointer"
                  />
                </div>
                {pickupRequired && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 shrink-0">Pickup Zone:</span>
                      <select
                        value={pickupCity}
                        onChange={(e) => setPickupCity(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-[#131A2B] border border-slate-700 text-slate-100 focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="Noida" className="bg-[#0D121F] text-slate-100">Noida / Greater Noida</option>
                        <option value="South Delhi" className="bg-[#0D121F] text-slate-100">South Delhi (GK, Saket, Vasant Kunj, Def Col)</option>
                        <option value="East Delhi" className="bg-[#0D121F] text-slate-100">East Delhi (Mayur Vihar, Preet Vihar)</option>
                        <option value="Gurgaon" className="bg-[#0D121F] text-slate-100">Gurgaon / Cyber Hub</option>
                        <option value="Ghaziabad" className="bg-[#0D121F] text-slate-100">Ghaziabad / Indirapuram / Vaishali</option>
                        <option value="Others" className="bg-[#0D121F] text-slate-100">Others (Custom Location)</option>
                      </select>
                    </div>
                    {pickupCity === 'Others' && (
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 shrink-0 opacity-0 select-none">Pickup Zone:</span>
                        <input
                          type="text"
                          required
                          placeholder="Enter your exact pickup location"
                          value={customPickupCity}
                          onChange={(e) => setCustomPickupCity(e.target.value)}
                          className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-[#131A2B] border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 disabled:opacity-50 rounded-xl transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.55)] cursor-pointer flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Confirming Site Visit...</span>
                    </>
                  ) : (
                    <span>Confirm Free Site Visit Booking</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
      </div>
    </div>
  );
};
