import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const apiReferenceUrl = '/api-reference';

const SparkleIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 3l1.5 5L19 9l-5.5 1L12 15l-1.5-5L5 9l5.5-1L12 3z" />
    <path d="M5 19l1-2 1 2 2 1-2 1-1 2-1-2-2-1 2-1z" />
    <path d="M17 17l.5-1 .5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z" />
  </svg>
);

const CodeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const ShieldIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const highlights = [
  {
    label: 'OpenAPI spec',
    detail: 'Reference stays in lockstep with production',
    icon: <SparkleIcon />,
  },
  {
    label: 'TypeScript SDK',
    detail: 'Typed clients with request/response helpers',
    icon: <CodeIcon />,
  },
  {
    label: 'Sandbox fixtures',
    detail: 'Deterministic data for integration tests',
    icon: <ShieldIcon />,
  },
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
];

const workflows = [
  {
    title: 'Accept a payment',
    detail:
      'Create a charge, confirm, and capture with idempotency guarantees.',
    link: '/docs/getting-started',
  },
  {
    title: 'Handle webhooks',
    detail:
      'Register endpoints, validate signatures, and process retries deterministically.',
    link: '/docs/common-workflows',
  },
  {
    title: 'Reconcile settlements',
    detail: 'Match payouts to ledger entries and export finance-ready reports.',
    link: '/docs/errors',
  },
];

const KeyIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 2l-2 2" />
    <path d="M15 8l-2 2" />
    <path d="M18 5l-7.5 7.5a3 3 0 1 1-4.24-4.24L14 3" />
    <path d="M5 13l-2 2 2 2 2-2" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const BellIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const RocketIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4.5 16.5l4.75-1.75" />
    <path d="M19.5 8.5l-6-6c-6.5 3-9 9-9 9l6 6s6-2.5 9-9z" />
    <path d="M12 12a2 2 0 1 0-2-2 2 2 0 0 0 2 2z" />
    <path d="M4 20l2.5-2.5" />
  </svg>
);

const steps: { title: string; detail: string; icon: React.ReactNode }[] = [
  {
    title: 'Create an API key',
    detail: 'Create an API key in sandbox.',
    icon: <KeyIcon />,
  },
  {
    title: 'Call payments and accounts',
    detail: 'Call payments and accounts endpoints with your credentials.',
    icon: <SendIcon />,
  },
  {
    title: 'Subscribe to webhooks',
    detail: 'Subscribe to webhooks and confirm signatures.',
    icon: <BellIcon />,
  },
  {
    title: 'Move to production',
    detail: 'Move to production with monitoring and alerting built in.',
    icon: <RocketIcon />,
  },
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
            Everything you need to authenticate, move money, subscribe to
            events, and keep finance teams in sync.
          </p>
          <div className={styles.ctaRow}>
            <Link
              className="button button--primary button--lg"
              to="/docs/getting-started"
            >
              Start building
            </Link>
            <Link
              className="button button--secondary button--lg"
              to={apiReferenceUrl}
            >
              View API reference
            </Link>
          </div>
          <div className={styles.highlightStrip}>
            {highlights.map((item) => (
              <div key={item.label} className={styles.highlightItem}>
                <span className={styles.highlightIcon}>{item.icon}</span>
                <div className={styles.highlightCopy}>
                  <span className={styles.highlightLabel}>{item.label}</span>
                  <span className={styles.highlightDetail}>{item.detail}</span>
                </div>
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
              <Heading as="h3" className={styles.cardTitle}>
                {item.title}
              </Heading>
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
          <Heading as="h2" className={styles.sectionTitle}>
            Common workflows
          </Heading>
          <p className={styles.sectionBody}>
            Follow these guides end-to-end, then adapt to your stack.
          </p>
        </div>
        <ol className={styles.stepList}>
          {workflows.map((step) => (
            <li key={step.title} className={styles.stepItem}>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>{step.title}</div>
                <div className={styles.stepDetail}>{step.detail}</div>
              </div>
              <div className={styles.stepLinkRow}>
                <Link className={styles.stepLink} to={step.link}>
                  Guide
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CapabilityGrid() {
  return (
    <section className={styles.sectionAlt}>
      <div className={clsx('container', styles.sectionContainer)}>
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Integration path
          </Heading>
          <p className={styles.sectionBody}>
            The sequence most teams follow from test to prod.
          </p>
        </div>
        <div className={styles.timeline}>
          <ol className={styles.timelineList}>
            {steps.map((step) => (
              <li key={step.title} className={styles.timelineItem}>
                <div className={styles.timelineCard}>
                  <div className={styles.timelineCardHeader}>
                    <span className={styles.timelineIcon}>{step.icon}</span>
                    <div className={styles.timelineCardTitle}>{step.title}</div>
                  </div>
                  <p className={styles.cardBody}>{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="Home"
      description="Selva API Documentation - Build modern payment flows"
    >
      <Hero />
      <main>
        <ModulesSection />
        <WorkflowSection />
        <CapabilityGrid />
      </main>
    </Layout>
  );
}
