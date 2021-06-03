import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './HomepageCodeExample.module.css';

export default function HomescreenCodeExample() {
  return (
    <div className={styles.codeBlockContainer}>
      <CodeBlock title="Basic Usage" className="tsx">
        {`import { useState } from 'react';
import { Highlights, useHighlight } from 'react-highlights';
import { Highlighter } from 'react-highlights/react-highlighter';

function StatusUpdateInput() {
  const tutorialRef = useHighlight('Update your status');

  // ...

  return (
    <div ref={tutorialRef}>
      <textarea />
      <button>Update status</button>
    </div>
  );
}

function HomePage() {
  const [isOpen, setOpen] = useState(false);

  return (
    <Highlights
      open={isOpen}
      onClose={() => setOpen(false)}
      Highlighter={Highlighter}
    >
      <StatusUpdateInput />
    </Highlights>
  );
}`}
      </CodeBlock>
    </div>
  );
}
