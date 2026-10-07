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
    <section id="properties" className="py-20 lg:py-28 border-b border-slate-200 bg-[#FDFBF7]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
              Verified Portfolios
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Curated Properties in Noida & Jewar Corridor
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-800 max-w-2xl">
              Hand-vetted residential landmarks and commercial assets with clean land titles, RERA approvals, and institutional developer track records.
            </p>
          </div>

          {/* Active Result Count */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-800">
              Showing <span className="font-mono font-bold text-amber-400 tabular-nums">{filteredProperties.length}</span> of {properties.length} listings
            </span>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setKeyword('');
                  onResetFilters();
                }}
                className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" />
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar & Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-300">
          
          {/* Functional Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white/90 rounded-xl border border-slate-300">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-md'
                  : 'text-slate-800 hover:text-slate-900'
              }`}
            >
              All Listings
            </button>
            <button
              onClick={() => setActiveCategory('luxury')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'luxury'
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-md'
                  : 'text-slate-800 hover:text-slate-900'
              }`}
            >
              Luxury Condos
            </button>
            <button
              onClick={() => setActiveCategory('expressway')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'expressway'
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-md'
                  : 'text-slate-800 hover:text-slate-900'
              }`}
            >
              Expressway Hub
            </button>
            <button
              onClick={() => setActiveCategory('commercial')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'commercial'
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-md'
                  : 'text-slate-800 hover:text-slate-900'
              }`}
            >
              Commercial Retail
            </button>
            <button
              onClick={() => setActiveCategory('plots')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                activeCategory === 'plots'
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-md'
                  : 'text-slate-800 hover:text-slate-900'
              }`}
            >
              Airport Plots & Villas
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
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-900 placeholder-neutral-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="h-4 w-4 text-slate-800 shrink-0 hidden sm:block" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="w-full sm:w-auto px-3 py-2 text-xs rounded-xl bg-white border border-slate-300 text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="greens">Maximum Greenery %</option>
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
          <div className="p-16 rounded-3xl border border-slate-300 bg-white/90 text-center max-w-xl mx-auto">
            <h3 className="text-lg font-semibold text-slate-900">No properties match your current filters</h3>
            <p className="text-xs text-slate-800 mt-2">
              Try adjusting your sector, budget, or keyword criteria, or contact KR Estate directly for unlisted off-market options.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setKeyword('');
                onResetFilters();
              }}
              className="mt-6 px-4 py-2 text-xs font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
