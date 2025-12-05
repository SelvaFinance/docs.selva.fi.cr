import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function ScalarApiReference(): JSX.Element {
  const { siteConfig, i18n } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;
  const currentLocale = i18n.currentLocale;
  
  return (
    <BrowserOnly>
      {() => {
        // The Scalar Docusaurus plugin creates a route at /scalar
        // We'll embed it using an iframe
        // Use the baseUrl from Docusaurus config to construct the correct URL
        // baseUrl already includes leading slash, so we need to handle it properly
        const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        // Scalar plugin creates route at /scalar for default locale only
        // For non-default locales, we need to use the default locale's scalar route
        // or construct a relative path that works
        // Since Scalar is embedded in an iframe, we can use the default locale route
        // and pass language preference via hash
        const scalarRoute = currentLocale === 'es' ? 'scalar' : `../scalar`;
        const scalarUrl = `${window.location.origin}${normalizedBaseUrl}${scalarRoute}#lang=${currentLocale}`;
        
        return (
          <div
            style={{
              width: '100%',
              height: '800px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              margin: '2rem 0',
              overflow: 'hidden',
            }}
          >
            <iframe
              src={scalarUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
              }}
              title={currentLocale === 'es' ? 'Referencia de API' : 'API Reference'}
            />
          </div>
        );
      }}
    </BrowserOnly>
  );
}

