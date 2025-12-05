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
          Inclusión financiera para toda Costa Rica
        </Heading>
        <p className="hero__subtitle">
          Servicios financieros innovadores, seguros y sostenibles para comunidades rurales, costeras y expatriados. 
          Pague como un local, crezca con Selva.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started">
            Get Started - 5min ⏱️
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/docs/api-reference"
            style={{ marginLeft: '1rem' }}>
            API Reference
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://selvafinance.com"
            style={{ marginLeft: '1rem' }}>
            Visit Selva Finance →
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
              <Heading as="h3">Interfaz Unificada de Pagos</Heading>
              <p>
                Gestione múltiples cuentas bancarias, transfiera fondos y pague servicios 
                desde una sola aplicación diseñada para todos.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Diseño Inclusivo</Heading>
              <p>
                Compatible con dispositivos de gama baja y fácil de usar, garantizando 
                acceso para todos los costarricenses.
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Enfoque B2B</Heading>
              <p>
                Soluciones especializadas para negocios en comunidades rurales y expatriados 
                que necesitan pagos eficientes.
              </p>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: '2rem' }}>
          <div className="col col--6">
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Cumplimiento Regulatorio Integral</Heading>
              <p>
                Aseguramos el pleno cumplimiento de las obligaciones regulatorias, equilibrando 
                privacidad y seguridad con nuestro modelo de 'Cumplimiento Regulatorio Integral'.
              </p>
            </div>
          </div>
          <div className="col col--6">
            <div className="text--center padding-horiz--md">
              <Heading as="h3">Para Expatriados y Comunidades Locales</Heading>
              <p>
                Ya sea que sea un expatriado buscando pagar como un local o una empresa rural 
                necesitando acceso a servicios financieros, Selva está aquí para usted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
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



