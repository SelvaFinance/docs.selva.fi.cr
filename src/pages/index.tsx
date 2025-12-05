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
            ? 'Inclusión financiera para toda Costa Rica'
            : 'Financial Inclusion for All of Costa Rica'}
        </Heading>
        <p className="hero__subtitle">
          {isSpanish
            ? 'Servicios financieros innovadores, seguros y sostenibles para comunidades rurales, costeras y expatriados. Pague como un local, crezca con Selva.'
            : 'Innovative, secure, and sustainable financial services for rural, coastal communities, and expatriates. Pay like a local, grow with Selva.'}
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
      title: 'Interfaz Unificada de Pagos',
      description: 'Gestione múltiples cuentas bancarias, transfiera fondos y pague servicios desde una sola aplicación diseñada para todos.',
    },
    {
      title: 'Diseño Inclusivo',
      description: 'Compatible con dispositivos de gama baja y fácil de usar, garantizando acceso para todos los costarricenses.',
    },
    {
      title: 'Enfoque B2B',
      description: 'Soluciones especializadas para negocios en comunidades rurales y expatriados que necesitan pagos eficientes.',
    },
    {
      title: 'Cumplimiento Regulatorio Integral',
      description: 'Aseguramos el pleno cumplimiento de las obligaciones regulatorias, equilibrando privacidad y seguridad con nuestro modelo de \'Cumplimiento Regulatorio Integral\'.',
    },
    {
      title: 'Para Expatriados y Comunidades Locales',
      description: 'Ya sea que sea un expatriado buscando pagar como un local o una empresa rural necesitando acceso a servicios financieros, Selva está aquí para usted.',
    },
  ] : [
    {
      title: 'Unified Payment Interface',
      description: 'Manage multiple bank accounts, transfer funds, and pay for services from a single application designed for everyone.',
    },
    {
      title: 'Inclusive Design',
      description: 'Compatible with low-end devices and easy to use, ensuring access for all Costa Ricans.',
    },
    {
      title: 'B2B Focus',
      description: 'Specialized solutions for businesses in rural communities and expatriates who need efficient payments.',
    },
    {
      title: 'Comprehensive Regulatory Compliance',
      description: 'We ensure full compliance with regulatory obligations, balancing privacy and security with our \'Comprehensive Regulatory Compliance\' model.',
    },
    {
      title: 'For Expatriates and Local Communities',
      description: 'Whether you are an expatriate looking to pay like a local or a rural business needing access to financial services, Selva is here for you.',
    },
  ];
  
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="col col--4">
              <div className="text--center padding-horiz--md">
                <Heading as="h3">{feature.title}</Heading>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="row" style={{ marginTop: '2rem' }}>
          {features.slice(3).map((feature, idx) => (
            <div key={idx} className="col col--6">
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



