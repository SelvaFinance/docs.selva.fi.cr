import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const LogoMark = () => (
  <div className={styles.logoMark} aria-hidden>
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 12.5c0-3.5 2.8-6.5 7-6.5 1.7 0 3.2.6 4.3 1.6l-2.1 1.7C13.6 8.9 12.9 8.6 12 8.6c-2.3 0-3.9 1.7-3.9 3.9 0 2.2 1.6 3.9 3.9 3.9 1 0 1.9-.3 2.6-.9l2 1.8C15.6 18.3 13.9 19 12 19 7.9 19 5 16 5 12.5Z"
        fill="currentColor"
      />
      <path
        d="M15.8 5.2 13.8 7c1.5.6 2.6 1.9 2.6 3.6 0 1.8-1.1 3.3-2.6 3.9l2 1.8C17.7 15.2 19 13.3 19 11c0-2.5-1.4-4.7-3.2-5.8Z"
        fill="currentColor"
        opacity="0.82"
      />
    </svg>
  </div>
);

const columns = [
  {
    title: 'Product',
    links: [
      { label: 'API reference', to: '/api-reference' },
      { label: 'Release notes', to: '/docs/release-notes' },
      { label: 'MCP (Coming soon)', to: '/docs/mcp' },
    ],
  },
  {
    title: 'Docs',
    links: [
      { label: 'Getting started', to: '/docs/getting-started' },
      { label: 'Common workflows', to: '/docs/common-workflows' },
      { label: 'Authentication', to: '/docs/authentication' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Overview', to: '/docs/overview' },
      { label: 'Errors', to: '/docs/errors' },
      { label: 'Status', href: 'https://status.selvafinance.com', external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'info@selvafinance.com', href: 'mailto:info@selvafinance.com' },
      { label: 'GitHub', href: 'https://github.com/SelvaFinance', external: true },
    ],
  },
];

export default function Footer(): React.ReactElement {
  return (
    <footer className={clsx('footer', styles.footer)}>
      <div className={clsx('container', styles.footerContainer)}>
        <div className={styles.footerGrid}>

          {columns.map((col) => (
            <div key={col.title} className={styles.linkColumn}>
              <div className={styles.columnTitle}>{col.title}</div>
              <ul className={styles.linkList}>
                {col.links.map((link) => (
                  <li key={link.label} className={styles.linkItem}>
                    {link.to ? (
                      <Link className={styles.link} to={link.to}>
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        className={styles.link}
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={styles.bottomRow}>
          <div className={styles.copyright}>Copyright © {new Date().getFullYear()} Selva Finance</div>
          <a className={styles.link} href="mailto:info@selvafinance.com">info@selvafinance.com</a>
        </div>
      </div>
    </footer>
  );
}
