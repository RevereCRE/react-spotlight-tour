import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import styles from './HomepageCodeExample.module.css';

export default function HomescreenCodeExample() {
  return (
    <div className={styles.codeBlockContainer}>
      <CodeBlock title="Basic Usage" className="tsx">
        {`import { AutoTutorial, useAutoTutorial } from 'autotutorial';
import { Tutorial } from 'autotutorial/tutorial';

function StatusUpdateInput() {
  const tutorialRef = useAutoTutorial('Update your status');

  // ...

  return (
    <div ref={tutorialRef}>
      <textarea />
      <button>Update status</button>
    </div>
  );
}

function HomePage() {
  const [seenTutorials, markSeen] = useSeenTutorials();

  return (
    <AutoTutorial
      name="docs:v1"
      seenTutorials={seenTutorials}
      markSeen={markSeen}
      Tutorial={Tutorial}
    >
      <StatusUpdateInput />
    </AutoTutorial>
  );
}`}
      </CodeBlock>
    </div>
  );
}
