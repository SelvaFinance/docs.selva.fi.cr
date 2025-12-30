import React, { useEffect, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';

export default function ThemeSelector(): React.ReactElement {
  const { colorMode, setColorMode } = useColorMode();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getLocalStorageTheme = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('docusaurus-theme');
    }
    return null;
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
          <SunIcon />
          <span>Light</span>
        </span>
      ),
      onClick: () => setColorMode('light'),
      active: colorMode === 'light',
    },
    {
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MoonIcon />
          <span>Dark</span>
        </span>
      ),
      onClick: () => setColorMode('dark'),
      active: colorMode === 'dark',
    },
    {
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MonitorIcon />
          <span>System</span>
        </span>
      ),
      onClick: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('docusaurus-theme');
          window.location.reload();
        }
      },
      active: colorMode === undefined || getLocalStorageTheme() === null,
    },
  ];

  const icon = colorMode === 'dark' ? <MoonIcon /> : <SunIcon />;

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
