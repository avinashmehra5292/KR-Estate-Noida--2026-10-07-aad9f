import React, { useState } from 'react';
import { Building, CheckCircle2, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import { ValuationSubmission } from '../types';
import { useSiteSettings } from '../context/SiteSettingsContext';

export const ValuationForm: React.FC = () => {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState<ValuationSubmission>({
    ownerName: '',
    phoneNumber: '',
    email: '',
    sector: '',
    societyName: '',
    propertyType: 'apartment',
    configuration: '3 BHK',
    superAreaSqFt: 1650,
    expectedPrice: '',
    intent: 'sell',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const message = `*New Resale / Valuation Request*
• *Owner Name:* ${formData.ownerName}
• *Phone:* ${formData.phoneNumber}
• *Email:* ${formData.email}
• *Intent:* ${formData.intent === 'sell' ? 'Sell Property' : 'Rent Out Property'}
• *Property Type:* ${formData.propertyType} (${formData.configuration})
• *Society / Sector:* ${formData.societyName || 'Noida'}, ${formData.sector}
• *Area:* ${formData.superAreaSqFt} sq.ft
• *Expected Price:* ${formData.expectedPrice || 'Open for valuation appraisal'}`;

    const cleanPhone = (settings.agency.phone || '+91 78704 33580').replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    try {
      await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      // Ensure positive user experience even if offline
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="valuation" className="py-20 lg:py-28 border-b border-slate-200 bg-[#FDFBF7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-3xl border border-slate-300 bg-gradient-to-b from-neutral-900 to-[#FDFBF7] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Narrative (Col 5) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                Owners & Investors Desk
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Selling or Renting Your Property in Noida?
              </h2>
              <p className="text-sm text-slate-800 leading-relaxed">
                Connect with KR Estate’s dedicated resale and leasing desk. We provide institutional valuation grounded in actual circle rates, active transaction velocity, and verified NRI & domestic buyer pools.
              </p>

              <div className="space-y-3 pt-4 border-t border-slate-300 text-xs text-slate-800">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>Free certified market valuation within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>Pre-qualified corporate tenant matching & legal documentation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>Direct escrow & bank loan assistance for prospective buyers</span>
                </div>
              </div>

              <div className="pt-2 text-xs text-slate-400">
                Inquiries routed directly to: <span className="text-slate-800 font-mono">{settings.agency.email || 'avinashmehra5292@gmail.com'}</span>
              </div>
            </div>

            {/* Right Form (Col 7) */}
            <div className="lg:col-span-7 rounded-2xl bg-[#FDFBF7]/80 border border-slate-300 p-6 sm:p-8 backdrop-blur-xl">
              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                  <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Valuation Request Received</h3>
                  <p className="text-xs sm:text-sm text-slate-800 max-w-md mx-auto">
                    Thank you, {formData.ownerName}. Our senior valuation analyst has received your details for {formData.societyName || formData.sector} and will contact you at {formData.phoneNumber} with a comprehensive valuation report.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        ownerName: '',
                        phoneNumber: '',
                        email: '',
                        sector: '',
                        societyName: '',
                        propertyType: 'apartment',
                        configuration: '3 BHK',
                        superAreaSqFt: 1650,
                        expectedPrice: '',
                        intent: 'sell',
                      });
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 cursor-pointer"
                  >
                    Submit Another Property
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-medium text-slate-800 block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Vikram Sharma"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-800 block mb-1">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-medium text-slate-800 block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-800 block mb-1">
                        I Want To *
                      </label>
                      <select
                        value={formData.intent}
                        onChange={(e) => setFormData({ ...formData, intent: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="sell">Sell Property</option>
                        <option value="rent">Rent Out Property</option>
                        <option value="valuation_only">Get Market Valuation Only</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-medium text-slate-800 block mb-1">
                        Sector / Location *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sector 137"
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-800 block mb-1">
                        Society / Project Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Purvanchal Royal Park"
                        value={formData.societyName}
                        onChange={(e) => setFormData({ ...formData, societyName: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-800 block mb-1">
                        Configuration
                      </label>
                      <select
                        value={formData.configuration}
                        onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-400 cursor-pointer"
                      >
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                        <option value="Penthouse">Penthouse</option>
                        <option value="Plot / Villa">Plot / Villa</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-medium text-slate-800 block mb-1">
                        Super Area (Sq.Ft)
                      </label>
                      <input
                        type="number"
                        placeholder="1650"
                        value={formData.superAreaSqFt || ''}
                        onChange={(e) => setFormData({ ...formData, superAreaSqFt: Number(e.target.value) })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-800 block mb-1">
                        Expected Price (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ₹1.85 Cr"
                        value={formData.expectedPrice}
                        onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Free Certified Valuation</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
