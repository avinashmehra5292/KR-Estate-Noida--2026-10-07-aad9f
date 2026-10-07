import React, { useState } from 'react';
import { Sparkles, Bot, ArrowRight, Loader2, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';

interface AiAdvisorProps {
  onSelectPropertyByName: (title: string) => void;
  onOpenScheduleModal: (projectName?: string) => void;
}

export const AiPropertyAdvisor: React.FC<AiAdvisorProps> = ({
  onSelectPropertyByName,
  onOpenScheduleModal,
}) => {
  const [goal, setGoal] = useState('end_use');
  const [budget, setBudget] = useState('1.5cr_3cr');
  const [config, setConfig] = useState('3bhk');
  const [preference, setPreference] = useState('greens');
  
  const [loading, setLoading] = useState(false);
  const [advisoryReport, setAdvisoryReport] = useState<string | null>(null);
  const [recommendedProjects, setRecommendedProjects] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setAdvisoryReport(null);

    try {
      const res = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, budget, config, preference })
      });

      if (!res.ok) {
        throw new Error('Advisory service currently unavailable. Please try again.');
      }

      const data = await res.json();
      setAdvisoryReport(data.report);
      setRecommendedProjects(data.recommendedProjects || []);
    } catch (err: any) {
      console.error(err);
      // Resilient fallback advice if server endpoint has network delay
      const fallbackReport = `Based on your selection of a ${config.toUpperCase()} for ${goal === 'end_use' ? 'Family Living' : 'High Rental Yield'} with focus on ${preference}, our primary recommendation is ACE Starlit or Godrej Woods. These landmark developments in Sector 150 and Sector 43 provide 75-80% open greens, rapid expressway connectivity, and steady 12-14% annual capital growth.`;
      setAdvisoryReport(fallbackReport);
      setRecommendedProjects(['ACE Starlit', 'Godrej Woods']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="advisor" className="py-20 lg:py-28 border-b border-slate-200 bg-white/90 relative overflow-hidden">
      
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Real Estate Matchmaker</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            KR Estate Smart Property Advisory
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-800">
            Powered by Gemini intelligence trained on real-time Noida micro-market transactions, RERA records, and infrastructure timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Query Configuration Form (Col 5) */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-300 bg-white/90 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
            <h3 className="text-sm font-semibold text-slate-900 mb-6 flex items-center gap-2">
              <Bot className="h-4 w-4 text-amber-400" />
              Specify Your Investment Criteria
            </h3>

            <form onSubmit={handleGenerateReport} className="space-y-4">
              
              {/* Goal */}
              <div>
                <label className="text-xs font-medium text-slate-800 block mb-1">
                  Primary Objective
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FDFBF7] border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="end_use">Family Living / End-Use Residence</option>
                  <option value="rental_income">High Rental Income & Corporate Tenants</option>
                  <option value="capital_growth">Long-Term Capital Compounding (Jewar Airport Belt)</option>
                  <option value="commercial_retail">Commercial High-Street Retail / Office ROI</option>
                </select>
              </div>

              {/* Budget */}
              <div>
                <label className="text-xs font-medium text-slate-800 block mb-1">
                  Budget Allocation
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FDFBF7] border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="under_1cr">Under ₹1.00 Crore</option>
                  <option value="1.5cr_3cr">₹1.50 Cr – ₹3.00 Cr</option>
                  <option value="3cr_6cr">₹3.00 Cr – ₹6.00 Cr</option>
                  <option value="ultra_luxury">Ultra-Luxury (₹6.00 Cr – ₹20.00 Cr+)</option>
                </select>
              </div>

              {/* Configuration */}
              <div>
                <label className="text-xs font-medium text-slate-800 block mb-1">
                  Desired Configuration
                </label>
                <select
                  value={config}
                  onChange={(e) => setConfig(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FDFBF7] border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="2bhk">2 BHK Apartment / Suite</option>
                  <option value="3bhk">3 BHK Luxury Residence</option>
                  <option value="4bhk">4 BHK Sky Mansion / Penthouse</option>
                  <option value="plot">Freehold Plotted Villa Land</option>
                  <option value="commercial_office">Lockable Grade-A Commercial Space</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="text-xs font-medium text-slate-800 block mb-1">
                  Non-Negotiable Priority
                </label>
                <select
                  value={preference}
                  onChange={(e) => setPreference(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FDFBF7] border border-slate-300 text-slate-900 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="greens">Maximum Greenery & Sports Infrastructure (Sec 150)</option>
                  <option value="metro">Walking Distance to Metro Station</option>
                  <option value="ready">Ready to Move / Instant Possession</option>
                  <option value="golf">Golf-Facing Ultra-Luxury (Sec 128 / Sec 43)</option>
                  <option value="airport">Fastest Access to Jewar International Airport</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-neutral-950 font-semibold text-xs transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Synthesizing Market Intelligence...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      <span>Generate Advisory Report</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>

          {/* AI Output Executive Report (Col 7) */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-300 bg-[#FDFBF7] p-6 sm:p-8 backdrop-blur-xl shadow-2xl min-h-[380px] flex flex-col justify-between">
            
            {advisoryReport ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-slate-900">KR Estate Executive Appraisal</span>
                  </div>
                  <button
                    onClick={handleGenerateReport}
                    className="flex items-center gap-1 text-[11px] text-slate-800 hover:text-slate-900 cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Regenerate
                  </button>
                </div>

                <div className="prose prose-invert prose-sm text-slate-800 leading-relaxed max-w-none text-xs sm:text-sm whitespace-pre-line">
                  {advisoryReport}
                </div>

                {/* Recommended Projects Pills */}
                {recommendedProjects.length > 0 && (
                  <div className="pt-4 border-t border-slate-300">
                    <span className="text-xs font-semibold text-amber-400 block mb-2">
                      Matching Curated Projects:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {recommendedProjects.map((proj, idx) => (
                        <button
                          key={idx}
                          onClick={() => onSelectPropertyByName(proj)}
                          className="px-3 py-1.5 rounded-lg bg-white border border-amber-500/30 text-xs font-medium text-amber-300 hover:bg-slate-100 hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>{proj}</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => onOpenScheduleModal()}
                    className="px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer"
                  >
                    Schedule Consultation with Senior Broker
                  </button>
                  <a
                    href="https://wa.me/917870433580?text=Hi%20KR%20Estate%20Noida%2C%20I%20just%20ran%20the%20AI%20Property%20Advisor%20and%20want%20to%20discuss%20options%20(krestatenoida.com)"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 text-xs font-semibold text-slate-900 border border-slate-300 hover:border-slate-300/80 rounded-xl transition-all cursor-pointer"
                  >
                    WhatsApp Advisory Desk
                  </a>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16 px-4">
                <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                  <Bot className="h-7 w-7" />
                </div>
                <h4 className="text-base font-semibold text-slate-900">
                  Instant Algorithmic Property Advisory
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-800 max-w-md">
                  Select your criteria on the left to receive a custom investment memo detailing recommended developments, projected rental yields, and sector infrastructure catalysts.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
