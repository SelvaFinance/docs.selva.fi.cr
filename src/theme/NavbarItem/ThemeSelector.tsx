import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import DropdownNavbarItem from '@theme/NavbarItem/DropdownNavbarItem';

export default function ThemeSelector(): React.ReactElement {
  const { colorMode, setColorMode } = useColorMode();

  const items = [
    {
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ☀️ Light
        </span>
      ),
      onClick: () => setColorMode('light'),
      active: colorMode === 'light',
    },
    {
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🌙 Dark
        </span>
      ),
      onClick: () => setColorMode('dark'),
      active: colorMode === 'dark',
    },
    {
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🖥️ System
        </span>
      ),
      onClick: () => {
        localStorage.removeItem('docusaurus-theme');
        window.location.reload();
      },
      active: colorMode === undefined || localStorage.getItem('docusaurus-theme') === null,
    },
  ];

  const icon = colorMode === 'dark' ? '🌙' : '☀️';

  return (
    <DropdownNavbarItem
      items={items}
      label={icon}
    />
  );
}
