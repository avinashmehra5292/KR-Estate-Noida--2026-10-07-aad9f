import React, { useState, useMemo } from 'react';
import { Calculator, CheckCircle2, Percent, IndianRupee, Clock } from 'lucide-react';

export const EmiCalculator: React.FC = () => {
  const [loanAmountLakhs, setLoanAmountLakhs] = useState<number>(150); // 1.5 Cr default
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% default
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years default

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const calculation = useMemo(() => {
    const P = loanAmountLakhs * 100000;
    const r = interestRate / (12 * 100);
    const n = tenureYears * 12;

    if (r === 0) {
      const emi = P / n;
      return {
        monthlyEmi: Math.round(emi),
        totalInterest: 0,
        totalPayment: P,
        principalPercent: 100,
        interestPercent: 0,
      };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    const principalPercent = Math.round((P / totalPayment) * 100);
    const interestPercent = 100 - principalPercent;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalPercent,
      interestPercent,
    };
  }, [loanAmountLakhs, interestRate, tenureYears]);

  const formatRupees = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} Lakh`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  return (
    <section id="calculator" className="py-20 lg:py-28 border-b border-slate-200 bg-white/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Financial Planning
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Home Loan & EMI Calculator
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-800">
            Calculate your monthly repayment schedules with competitive interest rates from top institutional lenders in Noida.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Sliders Input Panel (Col 7) */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-300 bg-white/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl space-y-6">
            
            {/* Loan Amount Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <IndianRupee className="h-3.5 w-3.5 text-amber-400" />
                  Loan Amount
                </label>
                <span className="font-mono text-base font-bold text-amber-400 tabular-nums">
                  {formatRupees(loanAmountLakhs * 100000)}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="5"
                value={loanAmountLakhs}
                onChange={(e) => setLoanAmountLakhs(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹10 Lakh</span>
                <span>₹2.5 Cr</span>
                <span>₹5 Cr</span>
                <span>₹10 Cr</span>
              </div>
              {/* Quick Presets */}
              <div className="flex flex-wrap gap-2 mt-2">
                {[50, 100, 150, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setLoanAmountLakhs(amt)}
                    className={`px-2.5 py-1 text-[11px] rounded-md transition-colors cursor-pointer ${
                      loanAmountLakhs === amt
                        ? 'bg-amber-400 text-neutral-950 font-bold'
                        : 'bg-slate-100 text-slate-800 hover:text-slate-900'
                    }`}
                  >
                    {amt >= 100 ? `₹${amt / 100} Cr` : `₹${amt}L`}
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Percent className="h-3.5 w-3.5 text-amber-400" />
                  Interest Rate (% p.a.)
                </label>
                <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                  {interestRate.toFixed(2)}%
                </span>
              </div>
              <input
                type="range"
                min="6.5"
                max="12.0"
                step="0.05"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>6.5%</span>
                <span>8.5% (Typical)</span>
                <span>12.0%</span>
              </div>
            </div>

            {/* Tenure Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  Loan Duration (Tenure)
                </label>
                <span className="font-mono text-base font-bold text-slate-900 tabular-nums">
                  {tenureYears} Years ({tenureYears * 12} Months)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>5 Yrs</span>
                <span>15 Yrs</span>
                <span>20 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>

          </div>

          {/* Results Summary Box (Col 5) */}
          <div className="lg:col-span-5 rounded-3xl border border-amber-500/20 bg-white/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 h-36 w-36 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              Monthly Outflow
            </div>
            
            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-mono text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
                ₹{calculation.monthlyEmi.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-800">/ month</span>
            </div>

            {/* Split breakdown */}
            <div className="space-y-3 pt-4 border-t border-slate-300 text-xs">
              <div className="flex justify-between text-slate-800">
                <span>Principal Loan:</span>
                <span className="font-mono font-bold text-slate-900">{formatRupees(loanAmountLakhs * 100000)}</span>
              </div>
              <div className="flex justify-between text-slate-800">
                <span>Total Interest Payable:</span>
                <span className="font-mono font-bold text-amber-400">{formatRupees(calculation.totalInterest)}</span>
              </div>
              <div className="flex justify-between text-slate-800">
                <span>Total Amount Payable:</span>
                <span className="font-mono font-bold text-slate-900">{formatRupees(calculation.totalPayment)}</span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="mt-6">
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  style={{ width: `${calculation.principalPercent}%` }} 
                  className="bg-amber-400 transition-all duration-300"
                  title={`Principal: ${calculation.principalPercent}%`}
                />
                <div 
                  style={{ width: `${calculation.interestPercent}%` }} 
                  className="bg-neutral-600 transition-all duration-300"
                  title={`Interest: ${calculation.interestPercent}%`}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-800 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Principal ({calculation.principalPercent}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-neutral-600" />
                  Interest ({calculation.interestPercent}%)
                </span>
              </div>
            </div>

            {/* KR Estate Bank Partners Assistance */}
            <div className="mt-6 pt-4 border-t border-slate-300">
              <span className="text-[11px] font-semibold text-slate-800 block mb-2">
                Pre-Approved Banking Partners with KR Estate:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-800">
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-900 font-medium">HDFC Bank</span>
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-900 font-medium">State Bank of India</span>
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-900 font-medium">ICICI Bank</span>
                <span className="px-2 py-1 rounded bg-slate-100 text-slate-900 font-medium">Axis Bank</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-3">
                KR Estate clients receive prioritized loan sanctioning with zero processing surcharges.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
