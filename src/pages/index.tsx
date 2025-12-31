import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const { i18n } = useDocusaurusContext();
  const apiReferenceUrl = 'https://docs.selva.fi.cr/api-reference';

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="theme.Homepage.SelvaAPIDocumentation">Selva API Documentation</Translate>
        </Heading>
        <p className="hero__subtitle">
          Soluciones Electrónicas Locales de Valor
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            <Translate id="theme.Homepage.GetStarted">Get Started - 5min ⏱️</Translate>
          </Link>
          <a
            className="button button--primary button--lg"
            href={apiReferenceUrl}>
            <Translate id="theme.Homepage.APIReference">API Reference</Translate>
          </a>
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
              <Heading as="h3">
                <Translate id="theme.Homepage.PaymentProcessing">Payment Processing</Translate>
              </Heading>
              <p>
                <Translate id="theme.Homepage.ProcessPayments">
                  Process payments, validate transactions, and manage payment history
                  with our comprehensive payment API.
                </Translate>
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <Heading as="h3">
                <Translate id="theme.Homepage.AccountManagement">Account Management</Translate>
              </Heading>
              <p>
                <Translate id="theme.Homepage.ManageAccounts">
                  Create and manage accounts, check balances, view transactions,
                  and access account details programmatically.
                </Translate>
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <Heading as="h3">
                <Translate id="theme.Homepage.Webhooks">Webhooks</Translate>
              </Heading>
              <p>
                <Translate id="theme.Homepage.SubscribeToEvents">
                  Subscribe to events and receive real-time notifications about
                  transactions and account activities.
                </Translate>
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


