import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = 'en' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.scanner': 'Scanner',
    'nav.dashboard': 'Dashboard',
    'nav.history': 'History',
    'nav.safety': 'Safety Tips',
    'nav.settings': 'Settings',
    
    // Landing
    'landing.title': 'AI Digital Shield',
    'landing.subtitle': 'Protecting women and girls from digital harassment',
    'landing.cta': 'Start Scanning',
    'landing.login': 'Login',
    'landing.signup': 'Sign Up',
    'landing.activism': '16 Days of Activism Against Gender-Based Violence',
    
    // Scanner
    'scanner.title': 'Message Scanner',
    'scanner.placeholder': 'Paste the message you want to analyze here...',
    'scanner.analyze': 'Analyze Message',
    'scanner.analyzing': 'Analyzing...',
    'scanner.score': 'Toxicity Score',
    'scanner.categories': 'Detected Categories',
    'scanner.rewrite': 'Get Safer Version',
    'scanner.advice': 'Get Safety Advice',
    'scanner.save': 'Save to History',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.recent': 'Recent Scans',
    'dashboard.chart': 'Toxicity Trend',
    
    // History
    'history.title': 'Scan History',
    'history.export': 'Export PDF',
    'history.delete': 'Delete',
    
    // Safety Tips
    'safety.title': 'Safety Tips Library',
    'safety.search': 'Search tips...',
    
    // Settings
    'settings.title': 'Settings',
    'settings.darkMode': 'Dark Mode',
    'settings.language': 'Language',
    'settings.dangerZone': 'Danger Zone',
    'settings.deleteAccount': 'Delete Account',
  },
  sw: {
    // Navigation
    'nav.scanner': 'Skana',
    'nav.dashboard': 'Dashibodi',
    'nav.history': 'Historia',
    'nav.safety': 'Vidokezo vya Usalama',
    'nav.settings': 'Mipangilio',
    
    // Landing
    'landing.title': 'Ngao ya Dijitali ya AI',
    'landing.subtitle': 'Kulinda wanawake na wasichana dhidi ya udhalimu wa kidijitali',
    'landing.cta': 'Anza Kuskana',
    'landing.login': 'Ingia',
    'landing.signup': 'Jisajili',
    'landing.activism': 'Siku 16 za Utetezi dhidi ya Unyanyasaji wa Kijinsia',
    
    // Scanner
    'scanner.title': 'Skana ya Ujumbe',
    'scanner.placeholder': 'Bandika ujumbe unaotaka kuchanganua hapa...',
    'scanner.analyze': 'Changanuza Ujumbe',
    'scanner.analyzing': 'Inachanganua...',
    'scanner.score': 'Alama ya Sumu',
    'scanner.categories': 'Aina Zilizogunduliwa',
    'scanner.rewrite': 'Pata Toleo Salama',
    'scanner.advice': 'Pata Ushauri wa Usalama',
    'scanner.save': 'Hifadhi kwenye Historia',
    
    // Dashboard
    'dashboard.title': 'Dashibodi',
    'dashboard.recent': 'Uchunguzi wa Hivi Karibuni',
    'dashboard.chart': 'Mwenendo wa Sumu',
    
    // History
    'history.title': 'Historia ya Uchunguzi',
    'history.export': 'Hamisha PDF',
    'history.delete': 'Futa',
    
    // Safety Tips
    'safety.title': 'Maktaba ya Vidokezo vya Usalama',
    'safety.search': 'Tafuta vidokezo...',
    
    // Settings
    'settings.title': 'Mipangilio',
    'settings.darkMode': 'Hali ya Giza',
    'settings.language': 'Lugha',
    'settings.dangerZone': 'Eneo la Hatari',
    'settings.deleteAccount': 'Futa Akaunti',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from('user_settings')
      .select('language')
      .eq('user_id', session.user.id)
      .single();

    if (data?.language) {
      setLanguageState(data.language as Language);
    }
  };

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang);
    
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      await supabase
        .from('user_settings')
        .update({ language: lang })
        .eq('user_id', session.user.id);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};