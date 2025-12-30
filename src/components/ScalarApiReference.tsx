import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function ScalarApiReference(): React.ReactElement {
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;

  return (
    <BrowserOnly>
      {() => {
        // The Scalar Docusaurus plugin creates a route at /api-reference
        // We'll embed it using an iframe
        // Use the baseUrl from Docusaurus config to construct the correct URL
        // baseUrl already includes leading slash, so we need to handle it properly
        const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        const scalarUrl = `${window.location.origin}${normalizedBaseUrl}api-reference`;

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
              title="API Reference"
            />
          </div>
        );
      }}
    </BrowserOnly>
  );
}

