import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Selva API Documentation
        </Heading>
        <p className="hero__subtitle">
          Soluciones Electrónicas Locales de Valor
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            Get Started - 5min ⏱️
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/api-reference"
            style={{ marginLeft: '1rem' }}>
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Payment Processing</Heading>
              <p>
                Process payments, validate transactions, and manage payment history
                with our comprehensive payment API.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Account Management</Heading>
              <p>
                Create and manage accounts, check balances, view transactions,
                and access account details programmatically.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Webhooks</Heading>
              <p>
                Subscribe to events and receive real-time notifications about
                transactions and account activities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Home"
      description="Selva API Documentation - Soluciones Electrónicas Locales de Valor">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}


