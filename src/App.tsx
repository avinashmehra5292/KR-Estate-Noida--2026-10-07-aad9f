/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PropertyGrid } from './components/PropertyGrid';
import { LocalityGuide } from './components/LocalityGuide';
import { EmiCalculator } from './components/EmiCalculator';
import { AiPropertyAdvisor } from './components/AiPropertyAdvisor';
import { ValuationForm } from './components/ValuationForm';
import { Footer } from './components/Footer';
import { PropertyModal } from './components/PropertyModal';
import { VideoModal } from './components/VideoModal';
import { NoidaExpresswayClientVideoModal } from './components/NoidaExpresswayClientVideoModal';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { DomainSetupModal } from './components/DomainSetupModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { NOIDA_PROPERTIES } from './data/properties';
import { Property } from './types';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { verifyAdminAuthSession } from './utils/adminAuth';

export default function App() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [preselectedProjectForVisit, setPreselectedProjectForVisit] = useState<string | undefined>(undefined);
  const [domainModalOpen, setDomainModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [clientVideoModalOpen, setClientVideoModalOpen] = useState(false);
  const [adminFormOpen, setAdminFormOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [clientNameParam, setClientNameParam] = useState<string>('Mr. & Mrs. R. Kapoor');
  const [activeVideoTour, setActiveVideoTour] = useState<any>(undefined);

  // Auto-detect client, expressway tour, or /admin URL params
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const client = urlParams.get('client');
      const expresswayTour = urlParams.get('expresswayTour');
      if (client || expresswayTour === 'true') {
        if (client) {
          setClientNameParam(client);
        }
        setClientVideoModalOpen(true);
      }

      // Detect /admin route or ?admin=true query
      const isPathAdmin = window.location.pathname === '/admin' || window.location.pathname === '/admin/';
      const isSearchAdmin = urlParams.get('admin') === 'true';
      const isHashAdmin = window.location.hash === '#admin';

      if (isPathAdmin || isSearchAdmin || isHashAdmin) {
        verifyAdminAuthSession().then((isValid) => {
          if (isValid) {
            setAdminFormOpen(true);
          } else {
            setAdminLoginOpen(true);
          }
        });
      }
    } catch {
      // safe fallback
    }
  }, []);

  // Keyboard shortcut listener for Developer Admin Form (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        const isAlreadyOnAdmin = window.location.pathname.startsWith('/admin') || window.location.search.includes('admin=true');
        const isValid = await verifyAdminAuthSession();
        if (isAlreadyOnAdmin) {
          if (isValid) {
            setAdminFormOpen(true);
          } else {
            setAdminLoginOpen(true);
          }
        } else {
          if (isValid) {
            window.open('/admin', '_blank');
          } else {
            setAdminLoginOpen(true);
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search parameters passed from Hero to PropertyGrid
  const [searchFilterParams, setSearchFilterParams] = useState({
    sector: 'all',
    type: 'all',
    budget: 'all',
  });

  const handleOpenScheduleModal = (projectName?: string) => {
    setPreselectedProjectForVisit(projectName);
    setScheduleModalOpen(true);
  };

  const handleOpenVideoTour = (video?: any) => {
    if (video) {
      setActiveVideoTour(video);
    } else {
      setActiveVideoTour(NOIDA_PROPERTIES[0].videoTour);
    }
    setVideoModalOpen(true);
  };

  const handleSelectPropertyByName = (title: string) => {
    const found = NOIDA_PROPERTIES.find((p) => p.title.toLowerCase().includes(title.toLowerCase()));
    if (found) {
      setSelectedProperty(found);
    }
  };

  const handleSelectLocalityFilter = (sectorName: string) => {
    setSearchFilterParams({
      sector: sectorName,
      type: 'all',
      budget: 'all',
    });
  };

  const handleAdminLoginSuccess = () => {
    const isAlreadyOnAdminRoute = 
      window.location.pathname === '/admin' || 
      window.location.pathname === '/admin/' || 
      window.location.search.includes('admin=true') ||
      window.location.hash === '#admin';

    if (isAlreadyOnAdminRoute) {
      setAdminFormOpen(true);
    } else {
      // Open Admin Panel in a new browser tab
      const adminUrl = `${window.location.origin}/admin`;
      const newTab = window.open(adminUrl, '_blank');
      // If browser blocked popup window, open in current tab as fallback
      if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
        setAdminFormOpen(true);
      }
    }
  };

  return (
    <SiteSettingsProvider>
      <div className="min-h-screen bg-[#FDFBF7] text-slate-900 flex flex-col font-sans-body selection:bg-amber-500/20 selection:text-amber-200 relative">
      
      {/* Decorative ambient background mesh for glassmorphism */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-amber-400/10 blur-[120px] mix-blend-multiply animate-pulse" />
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-blue-400/10 blur-[120px] mix-blend-multiply" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-rose-400/10 blur-[120px] mix-blend-multiply" style={{ animationDelay: '4s' }} />
      </div>

      {/* Strict 3-zone Header */}
      <Navbar
        onOpenScheduleModal={() => handleOpenScheduleModal()}
        onOpenDomainModal={() => setDomainModalOpen(true)}
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearch={(params) => setSearchFilterParams(params)}
          onOpenScheduleModal={() => handleOpenScheduleModal()}
          onWatchVideo={() => handleOpenVideoTour(NOIDA_PROPERTIES[0].videoTour)}
          onOpenClientVideoModal={() => setClientVideoModalOpen(true)}
        />

        {/* Curated Properties Portfolio with High-Res Photos & Badges */}
        <PropertyGrid
          properties={NOIDA_PROPERTIES}
          onSelectProperty={(prop) => setSelectedProperty(prop)}
          onScheduleVisit={(title) => handleOpenScheduleModal(title)}
          onWatchVideo={(video) => handleOpenVideoTour(video)}
          searchFilterParams={searchFilterParams}
          onResetFilters={() =>
            setSearchFilterParams({ sector: 'all', type: 'all', budget: 'all' })
          }
        />

        {/* Sector & Growth Corridor Guides */}
        <LocalityGuide
          onSelectLocalityFilter={handleSelectLocalityFilter}
        />

        {/* EMI & Financial Investment Calculator */}
        <EmiCalculator />

        {/* AI-Powered Smart Property Matchmaker (Gemini 3.8 Flash) */}
        <AiPropertyAdvisor
          onSelectPropertyByName={handleSelectPropertyByName}
          onOpenScheduleModal={handleOpenScheduleModal}
        />

        {/* Owners & Resale Property Valuation Desk */}
        <ValuationForm />
      </main>

      {/* Authority Footer */}
      <Footer
        onOpenScheduleModal={() => handleOpenScheduleModal()}
        onOpenDomainModal={() => setDomainModalOpen(true)}
      />

      {/* Modals & Overlays */}
      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onOpenScheduleModal={(title) => handleOpenScheduleModal(title)}
        onWatchVideo={(video) => handleOpenVideoTour(video)}
      />

      {/* 4K Drone Aerial & Walkthrough Video Player Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        initialVideo={activeVideoTour}
        onOpenScheduleModal={handleOpenScheduleModal}
      />

      {/* Bespoke Real Estate Noida Expressway Video Studio & Client Presentation Reel */}
      <NoidaExpresswayClientVideoModal
        isOpen={clientVideoModalOpen}
        onClose={() => setClientVideoModalOpen(false)}
        onOpenScheduleModal={handleOpenScheduleModal}
        initialClientName={clientNameParam}
      />

      <ScheduleVisitModal
        isOpen={scheduleModalOpen}
        onClose={() => {
          setScheduleModalOpen(false);
          setPreselectedProjectForVisit(undefined);
        }}
        preselectedProject={preselectedProjectForVisit}
      />

      <DomainSetupModal
        isOpen={domainModalOpen}
        onClose={() => setDomainModalOpen(false)}
      />

      {/* Instant Floating WhatsApp Advisory Connect */}
      <WhatsAppButton />

      {/* Admin Authentication Modal */}
      {adminLoginOpen && (
        <AdminLoginModal 
          onClose={() => setAdminLoginOpen(false)} 
          onSuccess={handleAdminLoginSuccess} 
        />
      )}

      {/* Developer Admin Form Modal (Triggered via Login or /admin) */}
      {adminFormOpen && (
        <AdminDashboard 
          onClose={() => {
            setAdminFormOpen(false);
            try {
              localStorage.removeItem('kr_admin_auth');
            } catch {}
            if (window.location.pathname === '/admin' || window.location.pathname === '/admin/' || window.location.search.includes('admin=true')) {
              window.history.replaceState({}, '', '/');
            }
          }} 
        />
      )}
      </div>
    </SiteSettingsProvider>
  );
}
