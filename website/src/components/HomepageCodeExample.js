import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './HomepageCodeExample.module.css';

export default function HomescreenCodeExample() {
  return (
    <div className={styles.codeBlockContainer}>
      <CodeBlock title="Basic Usage" className="tsx">
        {`import { useState } from 'react';
import { SpotlightTour, useSpotlight } from 'react-spotlight-tour';
import { Spotlight } from 'react-spotlight-tour/spotlight';

function StatusUpdateInput() {
  const spotlightRef = useSpotlight('Update your status');

  // ...

  return (
    <div ref={spotlightRef}>
      <textarea />
      <button>Update status</button>
    </div>
  );
}

function HomePage() {
  const [isOpen, setOpen] = useState(false);

  return (
    <SpotlightTour
      open={isOpen}
      onClose={() => setOpen(false)}
      Spotlight={HighlSpotlightghter}
    >
      <StatusUpdateInput />
    </SpotlightTour>
  );
}`}
      </CodeBlock>
    </div>
  );
}
