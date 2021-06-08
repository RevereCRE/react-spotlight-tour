import clsx from 'clsx';
import React from 'react';
import { useSpotlight } from '../react-spotlight-tour';
import { LT_MEDIUM, useMediaQuery } from '../media_query';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Easy to Integrate',
    spotlightText: 'Spotlight tours\nmake it easy',
    spotlightPosition: 'bottom',
    Svg: require('../../static/img/undraw_start_building.svg').default,
    description: (
      <>
        React Spotlight Tour focues on ease of integration. It's just an{' '}
        <code>npm install</code> away and works with any React framework, no CSS
        required!
      </>
    ),
  },
  {
    title: 'Create Beautiful Tutorials',
    spotlightText: 'To call attention',
    Svg: require('../../static/img/undraw_mobile_marketing.svg').default,
    description: (
      <>
        Traditional tours and tutorials can overwhelm your users and cause them
        to drop out halfway through. React Spotlight Tour lets you call
        attention to what matters without all the steps.
      </>
    ),
  },
  {
    title: 'First-Class React Support',
    spotlightText: 'Without\noverwhelming\nyour users',
    Svg: require('../../static/img/undraw_react.svg').default,
    description: (
      <>
        Other libraries require you to add selectors everywhere and initialize
        the library manually. React Spotlight Tour gives you easy to use React
        hooks that can be used anywhere in your app!
      </>
    ),
  },
];

function Feature({
  Svg,
  title,
  description,
  spotlightText,
  spotlightPosition,
}) {
  const isSmall = useMediaQuery(LT_MEDIUM);
  const titleRef = useSpotlight(spotlightText, spotlightPosition ?? 'top');

  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>
          <span ref={isSmall ? titleRef : undefined}>{title}</span>
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
