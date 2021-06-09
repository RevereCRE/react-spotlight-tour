import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageCodeExample from '../components/HomepageCodeExample';
import HomepageFeatures from '../components/HomepageFeatures';
import { SpotlightTour, useSpotlight } from '../react-spotlight-tour';
import Spotlight from '../react-spotlight-tour/spotlight';
import { useMediaQuery, LT_MEDIUM } from '../media_query';

function HomepageHeader() {
  const isSmall = useMediaQuery(LT_MEDIUM);
  const headerRef = useSpotlight('Tap to dismiss', 'bottom');
  const headingRef = useSpotlight('This is a demo of', 'left');
  const subheadingRef = useSpotlight("that's pretty awesome", 'right');
  const buttonRef = useSpotlight(
    'Check out the docs\nor scroll down to\nsee more',
    'bottom'
  );

  const { siteConfig } = useDocusaurusContext();

  return (
    <header
      ref={isSmall ? headerRef : undefined}
      className={clsx('hero hero--primary', styles.heroBanner)}
    >
      <div className="container">
        <h1 className="hero__title">
          <span ref={isSmall ? undefined : headingRef}>{siteConfig.title}</span>
        </h1>
        <p className="hero__subtitle">
          <span ref={isSmall ? undefined : subheadingRef}>
            {siteConfig.tagline}
          </span>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            <span ref={isSmall ? undefined : buttonRef}>Documentation</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [isOpen, setOpen] = useState([]);

  useEffect(() => {
    // Workaround for https://github.com/facebook/docusaurus/issues/4826
    document.querySelector('nav').style.zIndex = 20;
  }, []);

  return (
    <SpotlightTour
      open={isOpen}
      onClose={() => setOpen(false)}
      Spotlight={Spotlight}
    >
      <Layout description="Description will go into a meta tag in <head />">
        <HomepageHeader />
        <main>
          <HomepageFeatures />
          <HomepageCodeExample />
        </main>
      </Layout>
    </SpotlightTour>
  );
}
