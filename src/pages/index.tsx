import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const apiReferenceUrl = '/api-reference';

const highlights = [
  { label: 'OpenAPI spec', detail: 'Reference stays in lockstep with production' },
  { label: 'TypeScript SDK', detail: 'Typed clients with request/response helpers' },
  { label: 'Sandbox fixtures', detail: 'Deterministic data for integration tests' },
];

const modules = [
  {
    title: 'Authentication',
    body: 'Exchange client credentials for scoped tokens with predictable expiry.',
    link: '/docs/authentication',
  },
  {
    title: 'Payments',
    body: 'Create, capture, void, and refund charges with idempotency keys.',
    link: '/docs/api-reference',
  },
  {
    title: 'Accounts',
    body: 'Issue accounts, fetch balances, and manage permissions programmatically.',
    link: '/docs/common-workflows',
  },
  {
    title: 'Webhooks',
    body: 'Subscribe, verify signatures, and replay events safely.',
    link: '/docs/common-workflows',
  },
  {
    title: 'Reporting',
    body: 'Export transactions, payouts, and fees to keep finance in sync.',
    link: '/docs/errors',
  },
];

const workflows = [
  {
    title: 'Accept a payment',
    detail: 'Create a charge, confirm, and capture with idempotency guarantees.',
    link: '/docs/getting-started',
  },
  {
    title: 'Handle webhooks',
    detail: 'Register endpoints, validate signatures, and process retries deterministically.',
    link: '/docs/common-workflows',
  },
  {
    title: 'Reconcile settlements',
    detail: 'Match payouts to ledger entries and export finance-ready reports.',
    link: '/docs/errors',
  },
];

const steps = [
  'Create an API key in sandbox.',
  'Call payments and accounts endpoints with your credentials.',
  'Subscribe to webhooks and confirm signatures.',
  'Move to production with monitoring and alerting built in.',
];

function Hero() {
  return (
    <header className={clsx('hero', styles.hero)}>
      <div className={clsx('container', styles.heroContainer)}>
        <div className={styles.heroContent}>
          <Heading as="h1" className={styles.title}>
            Selva API docs
          </Heading>
          <p className={styles.subtitle}>
            Everything you need to authenticate, move money, subscribe to events,
            and keep finance teams in sync.
          </p>
          <div className={styles.ctaRow}>
            <Link className="button button--primary button--lg" to="/docs/getting-started">
              Start building
            </Link>
            <Link className="button button--secondary button--lg" to={apiReferenceUrl}>
              View API reference
            </Link>
          </div>
          <div className={styles.highlightStrip}>
            {highlights.map((item) => (
              <div key={item.label} className={styles.highlightItem}>
                <span className={styles.highlightLabel}>{item.label}</span>
                <span className={styles.highlightDetail}>{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

function ModulesSection() {
  return (
    <section className={styles.band}>
      <div className={clsx('container', styles.bandContainer)}>
        <Heading as="h2" className={styles.sectionTitle}>
          Core modules
        </Heading>
        <div className={styles.cardsGrid}>
          {modules.map((item) => (
            <div key={item.title} className={styles.card}>
              <Heading as="h3" className={styles.cardTitle}>{item.title}</Heading>
              <p className={styles.cardBody}>{item.body}</p>
              <Link className={styles.cardLink} to={item.link}>
                View docs
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className={styles.section}> 
      <div className={clsx('container', styles.sectionContainer)}>
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>Common workflows</Heading>
          <p className={styles.sectionBody}>
            Follow these guides end-to-end, then adapt to your stack.
          </p>
        </div>
        <ol className={styles.stepList}>
          {workflows.map((step) => (
            <li key={step.title} className={styles.stepItem}>
              <strong>{step.title}:</strong> {step.detail}{' '}
              <Link className={styles.inlineLink} to={step.link}>
                Guide
              </Link>
            </li>
          ))}
        </ol>
        <div className={styles.stepActions}>
          <Link className="button button--primary" to="/docs/getting-started">
            Quickstart
          </Link>
          <Link className="button button--secondary" to={apiReferenceUrl}>
            API reference
          </Link>
        </div>
      </div>
    </section>
  );
}

function CapabilityGrid() {
  return (
    <section className={styles.sectionAlt}>
      <div className={clsx('container', styles.sectionContainer)}>
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>Integration path</Heading>
          <p className={styles.sectionBody}>
            The sequence most teams follow from test to prod.
          </p>
        </div>
        <div className={styles.cardsGrid}>
          {steps.map((item) => (
            <div key={item} className={styles.cardSmall}>
              <p className={styles.cardBody}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


export default function Home(): React.ReactElement {
  return (
    <Layout title="Home" description="Selva API Documentation - Build modern payment flows">
      <Hero />
      <main>
        <ModulesSection />
        <WorkflowSection />
        <CapabilityGrid />
      </main>
    </Layout>
  );
}


