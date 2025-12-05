import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';

function HomepageHeader() {
  const { i18n } = useDocusaurusContext();
  const isSpanish = i18n.currentLocale === 'es';
  
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {isSpanish 
            ? 'Selva API'
            : 'Selva API'}
        </Heading>
        <p className="hero__subtitle">
          {isSpanish
            ? 'Documentación completa de la API para integrar servicios financieros en sus aplicaciones.'
            : 'Complete API documentation for integrating financial services into your applications.'}
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            {isSpanish ? 'Comenzar - 5min ⏱️' : 'Get Started - 5min ⏱️'}
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/api-reference"
            style={{ marginLeft: '1rem' }}>
            {isSpanish ? 'Referencia de API' : 'API Reference'}
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageFeatures() {
  const { i18n } = useDocusaurusContext();
  const isSpanish = i18n.currentLocale === 'es';
  
  const features = isSpanish ? [
    {
      title: 'Procesamiento de Pagos',
      description: 'Procese pagos, valide transacciones y gestione el historial de pagos con nuestra API de pagos integral.',
    },
    {
      title: 'Gestión de Cuentas',
      description: 'Cree y gestione cuentas, consulte saldos, vea transacciones y acceda a detalles de cuentas mediante programación.',
    },
    {
      title: 'Webhooks',
      description: 'Suscríbase a eventos y reciba notificaciones en tiempo real sobre transacciones y actividades de cuentas.',
    },
  ] : [
    {
      title: 'Payment Processing',
      description: 'Process payments, validate transactions, and manage payment history with our comprehensive payment API.',
    },
    {
      title: 'Account Management',
      description: 'Create and manage accounts, check balances, view transactions, and access account details programmatically.',
    },
    {
      title: 'Webhooks',
      description: 'Subscribe to events and receive real-time notifications about transactions and account activities.',
    },
  ];
  
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--4">
              <div className="text--center padding-horiz--md">
                <Heading as="h3">{feature.title}</Heading>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { i18n } = useDocusaurusContext();
  const isSpanish = i18n.currentLocale === 'es';
  
  return (
    <Layout
      title={isSpanish ? 'Inicio' : 'Home'}
      description={isSpanish 
        ? 'Documentación de la API de Selva - Soluciones Electrónicas Locales de Valor'
        : 'Selva API Documentation - Soluciones Electrónicas Locales de Valor'}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
