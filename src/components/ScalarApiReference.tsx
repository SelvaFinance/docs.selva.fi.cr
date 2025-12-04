import React from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function ScalarApiReference(): JSX.Element {
  return (
    <BrowserOnly>
      {() => {
        // The Scalar Docusaurus plugin creates a route at /scalar
        // We'll embed it using an iframe
        const baseUrl = window.location.origin + window.location.pathname.split('/docs')[0];
        const scalarUrl = `${baseUrl}/scalar`;
        
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

