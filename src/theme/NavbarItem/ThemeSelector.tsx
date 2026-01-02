import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';

type ThemeChoice = 'system' | 'light' | 'dark';

const THEME_CHOICE_KEY = 'selva-theme-choice';
const DOCUSAURUS_THEME_KEY = 'theme';
const LEGACY_DOCUSAURUS_THEME_KEY = 'docusaurus-theme';

export default function ThemeSelector(): React.ReactElement {
  const { colorMode, setColorMode } = useColorMode();
  const [isClient, setIsClient] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [themeChoice, setThemeChoice] = useState<ThemeChoice>('system');

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || initialized) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applySystemMode = () => {
      setColorMode(mediaQuery.matches ? 'dark' : 'light');

      localStorage.removeItem(DOCUSAURUS_THEME_KEY);
      localStorage.removeItem(LEGACY_DOCUSAURUS_THEME_KEY);
    };

    const storedChoice = localStorage.getItem(THEME_CHOICE_KEY);

    if (storedChoice === 'light' || storedChoice === 'dark') {
      setThemeChoice(storedChoice);
      setColorMode(storedChoice);
    } else {
      setThemeChoice('system');
      localStorage.removeItem(THEME_CHOICE_KEY);
      applySystemMode();
    }

    setInitialized(true);

    return undefined;
  }, [isClient, initialized, setColorMode]);

  useEffect(() => {
    if (!isClient || !initialized) {
      return undefined;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applySystemMode = () => {
      setColorMode(mediaQuery.matches ? 'dark' : 'light');
      localStorage.removeItem(DOCUSAURUS_THEME_KEY);
      localStorage.removeItem(LEGACY_DOCUSAURUS_THEME_KEY);
    };

    if (themeChoice === 'system') {
      applySystemMode();
      mediaQuery.addEventListener('change', applySystemMode);

      return () => {
        mediaQuery.removeEventListener('change', applySystemMode);
      };
    }

    return undefined;
  }, [themeChoice, initialized, isClient, setColorMode]);

  const handleThemeChange = (mode: ThemeChoice) => {
    setThemeChoice(mode);

    if (mode === 'system') {
      localStorage.removeItem(THEME_CHOICE_KEY);
      localStorage.removeItem(DOCUSAURUS_THEME_KEY);
      localStorage.removeItem(LEGACY_DOCUSAURUS_THEME_KEY);
      return;
    }

    localStorage.setItem(THEME_CHOICE_KEY, mode);
    setColorMode(mode);
  };

  const SunIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="M4.93 4.93l1.41 1.41"></path>
      <path d="M17.66 17.66l1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="M6.34 17.66l-1.41 1.41"></path>
      <path d="M19.07 4.93l-1.41 1.41"></path>
    </svg>
  );

  const MoonIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
  );

  const MonitorIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
    </svg>
  );

  const items = [
    {
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MonitorIcon />
          <span>System</span>
        </span>
      ),
      to: '#',
      onClick: (e) => {
        e.preventDefault();
        handleThemeChange('system');
      },
      className:
        themeChoice === 'system' ? 'dropdown__link--active' : undefined,
    },
    {
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <SunIcon />
          <span>Light</span>
        </span>
      ),
      to: '#',
      onClick: (e) => {
        e.preventDefault();
        handleThemeChange('light');
      },
      className: themeChoice === 'light' ? 'dropdown__link--active' : undefined,
    },
    {
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MoonIcon />
          <span>Dark</span>
        </span>
      ),
      to: '#',
      onClick: (e) => {
        e.preventDefault();
        handleThemeChange('dark');
      },
      className: themeChoice === 'dark' ? 'dropdown__link--active' : undefined,
    },
  ];

  const icon =
    themeChoice === 'system' ? (
      <MonitorIcon />
    ) : colorMode === 'dark' ? (
      <MoonIcon />
    ) : (
      <SunIcon />
    );

  return (
    <DropdownNavbarItem
      items={items}
      className="theme-selector-dropdown"
      position="right"
      label={
        <span className="theme-selector-trigger">
          <span className="theme-selector-icon">{icon}</span>
        </span>
      }
    />
  );
}
