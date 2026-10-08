import React, { useState, useMemo } from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface PropertyGridProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
  onScheduleVisit: (propertyName: string) => void;
  onWatchVideo?: (video: any) => void;
  searchFilterParams: { sector: string; type: string; budget: string };
  onResetFilters: () => void;
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  onSelectProperty,
  onScheduleVisit,
  onWatchVideo,
  searchFilterParams,
  onResetFilters
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'featured' | 'price_low' | 'price_high' | 'greens'>('featured');
  const [keyword, setKeyword] = useState('');

  // Category filter mapping
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Keyword search (title, developer, sector, locality)
      if (keyword.trim()) {
        const q = keyword.toLowerCase();
        const match =
          prop.title.toLowerCase().includes(q) ||
          (prop.developer || '').toLowerCase().includes(q) ||
          (prop.sector || '').toLowerCase().includes(q) ||
          (prop.locality || '').toLowerCase().includes(q);
        if (!match) return false;
      }

      // 2. Category tab
      if (activeCategory === 'luxury' && prop.propertyType !== 'luxury_apartment' && prop.propertyType !== 'penthouse') {
        return false;
      }
      if (activeCategory === 'commercial' && prop.propertyType !== 'commercial') {
        return false;
      }
      if (activeCategory === 'plots' && prop.propertyType !== 'plots') {
        return false;
      }
      if (activeCategory === 'expressway' && !(prop.locality || '').toLowerCase().includes('expressway')) {
        return false;
      }

      // 3. Search parameters from Hero (if active)
      if (searchFilterParams.sector !== 'all') {
        const secMatch = (prop.sector || '').toLowerCase().includes(searchFilterParams.sector.toLowerCase());
        const locMatch = (prop.locality || '').toLowerCase().includes(searchFilterParams.sector.toLowerCase());
        if (!secMatch && !locMatch) {
          return false;
        }
      }
      if (searchFilterParams.type !== 'all') {
        if (prop.propertyType !== searchFilterParams.type) {
          return false;
        }
      }
      if (searchFilterParams.budget !== 'all') {
        const pNum = prop.priceNumInCrores || 0;
        if (searchFilterParams.budget === 'under_1cr' && (pNum <= 0 || pNum >= 1.0)) return false;
        if (searchFilterParams.budget === '1cr_3cr' && (pNum < 1.0 || pNum > 3.0)) return false;
        if (searchFilterParams.budget === '3cr_6cr' && (pNum < 3.0 || pNum > 6.0)) return false;
        if (searchFilterParams.budget === 'above_6cr' && pNum < 6.0) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price_low') return (a.priceNumInCrores || 0) - (b.priceNumInCrores || 0);
      if (sortOption === 'price_high') return (b.priceNumInCrores || 0) - (a.priceNumInCrores || 0);
      if (sortOption === 'greens') return (b.openGreensPercentage || 0) - (a.openGreensPercentage || 0);
      return 0; // featured order
    });
  }, [properties, activeCategory, sortOption, keyword, searchFilterParams]);

  const hasActiveFilters =
    activeCategory !== 'all' ||
    keyword !== '' ||
    searchFilterParams.sector !== 'all' ||
    searchFilterParams.type !== 'all' ||
    searchFilterParams.budget !== 'all';

  return (
    <section id="properties" className="py-20 lg:py-28 border-b border-slate-800/80 bg-[#070A10]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              Verified Portfolios
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Curated Properties in Noida &amp; Jewar Corridor
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Hand-vetted residential landmarks and commercial assets with clean land titles, RERA approvals, and institutional developer track records.
            </p>
          </div>

          {/* Active Result Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Showing <span className="font-mono font-bold text-amber-400 tabular-nums text-sm">{filteredProperties.length}</span> of {properties.length} listings
            </span>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setKeyword('');
                  onResetFilters();
                }}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 font-medium underline cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800/80">
          
          {/* Functional Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0D121F]/80 rounded-2xl border border-slate-800/90 shadow-lg">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-xs rounded-xl transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setActiveCategory('luxury')}
              className={`px-4 py-2 text-xs rounded-xl transition-all cursor-pointer ${
                activeCategory === 'luxury'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium'
              }`}
            >
              Luxury Condos
            </button>
            <button
              onClick={() => setActiveCategory('expressway')}
              className={`px-4 py-2 text-xs rounded-xl transition-all cursor-pointer ${
                activeCategory === 'expressway'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium'
              }`}
            >
              Expressway Hub
            </button>
            <button
              onClick={() => setActiveCategory('commercial')}
              className={`px-4 py-2 text-xs rounded-xl transition-all cursor-pointer ${
                activeCategory === 'commercial'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium'
              }`}
            >
              Commercial Retail
            </button>
            <button
              onClick={() => setActiveCategory('plots')}
              className={`px-4 py-2 text-xs rounded-xl transition-all cursor-pointer ${
                activeCategory === 'plots'
                  ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-slate-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.35)]'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50 font-medium'
              }`}
            >
              Airport Plots &amp; Villas
            </button>
          </div>

          {/* Search + Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search builder, sector..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#0D121F]/90 border border-slate-700/80 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="h-4 w-4 text-amber-400 shrink-0 hidden sm:block" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="w-full sm:w-auto px-3.5 py-2 text-xs rounded-xl bg-[#0D121F] border border-slate-700/80 text-slate-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 cursor-pointer"
              >
                <option value="featured" className="bg-[#0D121F] text-slate-100">Featured Curations</option>
                <option value="price_low" className="bg-[#0D121F] text-slate-100">Price: Low to High</option>
                <option value="price_high" className="bg-[#0D121F] text-slate-100">Price: High to Low</option>
                <option value="greens" className="bg-[#0D121F] text-slate-100">Maximum Greenery %</option>
              </select>
            </div>
          </div>

        </div>

        {/* Listings Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property, idx) => (
              <div 
                key={property.id} 
                className="animate-in fade-in zoom-in-95 slide-in-from-bottom-8 duration-700 fill-mode-both"
                style={{ animationDelay: `${Math.min(idx * 150, 1500)}ms` }}
              >
                <PropertyCard
                  property={property}
                  onSelectProperty={onSelectProperty}
                  onScheduleVisit={onScheduleVisit}
                  onWatchVideo={onWatchVideo}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="p-16 rounded-3xl border border-slate-800 bg-[#0D121F]/80 text-center max-w-xl mx-auto shadow-2xl">
            <h3 className="text-lg font-bold text-white">No properties match your current filters</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Try adjusting your sector, budget, or keyword criteria, or contact KR Estate directly for unlisted off-market options.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setKeyword('');
                onResetFilters();
              }}
              className="mt-6 px-5 py-2.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl hover:from-amber-300 hover:to-amber-400 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
