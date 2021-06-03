import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageCodeExample from '../components/HomepageCodeExample';
import HomepageFeatures from '../components/HomepageFeatures';
import { Highlights, useHighlight } from '../react-highlights';
import { Highlighter } from '../react-highlights/highlighter';
import { useMediaQuery, LT_MEDIUM } from '../media_query';

function HomepageHeader() {
  const isSmall = useMediaQuery(LT_MEDIUM);
  const headerRef = useHighlight('Tap anywhere to dismiss', 'bottom');
  const headingRef = useHighlight('This is a demo of', 'left');
  const subheadingRef = useHighlight("that's pretty awesome", 'right');
  const buttonRef = useHighlight(
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

  return (
    <Highlights
      open={isOpen}
      onClose={() => setOpen(false)}
      Highlighter={Highlighter}
    >
      <Layout description="Description will go into a meta tag in <head />">
        <HomepageHeader />
        <main>
          <HomepageFeatures />
          <HomepageCodeExample />
        </main>
      </Layout>
    </Highlights>
  );
}
