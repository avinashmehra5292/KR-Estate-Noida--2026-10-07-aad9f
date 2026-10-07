import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteSettings } from '../types';
import defaultSettingsData from '../data/siteSettings.json';
import { getAdminAuthHeaders } from '../utils/adminAuth';

const defaultSettings: SiteSettings = defaultSettingsData as SiteSettings;

interface SiteSettingsContextType {
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<{ success: boolean; error?: string }>;
  loading: boolean;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
  settings: defaultSettings,
  updateSettings: async () => ({ success: false, error: 'Context not initialized' }),
  loading: false,
});

export const SiteSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/site-settings');
        if (res.ok) {
          const data = await res.json();
          if (data && data.agency) {
            setSettings(data);
          }
        }
      } catch (e) {
        // Fallback to defaultSettings
      }
    };
    fetchSettings();
  }, []);

  const updateSettings = async (newSettings: Partial<SiteSettings>): Promise<{ success: boolean; error?: string }> => {
    setLoading(true);
    try {
      const merged = {
        ...settings,
        ...newSettings,
        agency: { ...settings.agency, ...(newSettings.agency || {}) },
        hero: { ...settings.hero, ...(newSettings.hero || {}) },
        seo: { ...settings.seo, ...(newSettings.seo || {}) },
        stats: newSettings.stats || settings.stats,
      };

      const res = await fetch('/api/admin/site-settings', {
        method: 'POST',
        headers: getAdminAuthHeaders({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify(merged),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSettings(merged);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Failed to save settings' };
      }
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error saving settings' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <SiteSettingsContext.Provider value={{ settings, updateSettings, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export const useSiteSettings = () => useContext(SiteSettingsContext);
