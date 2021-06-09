import React, { useState } from 'react';
import { SpotlightTour, useSpotlight } from '../react-spotlight-tour';
import Spotlight from '../react-spotlight-tour/spotlight';
import { useMediaQuery, LT_MEDIUM } from '../media_query';

function CommentInputBox({ onSubmit }) {
  const [commentText, setCommentText] = useState('');
  const isSmall = useMediaQuery(LT_MEDIUM);
  const spotlightRef = useSpotlight(
    `Click to add${isSmall ? '\n' : ' '}a comment`,
    isSmall ? 'bottom' : 'right'
  );

  return (
    <div ref={spotlightRef} style={{ display: 'flex', width: 'max-content' }}>
      <input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />

      <button onClick={onSubmit}>+</button>
    </div>
  );
}

function StoryFeedItem({ title, text, addComment }) {
  return (
    <div
      style={{
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
      }}
    >
      <h1 style={{ textAlign: 'center' }}>{title}</h1>
      <p>{text}</p>

      <CommentInputBox onSubmit={addComment} />
    </div>
  );
}

export default function Demo() {
  const [isOpen, setOpen] = useState(true);
  return (
    <SpotlightTour
      open={isOpen}
      onClose={() => setOpen(false)}
      Spotlight={Spotlight}
    >
      <StoryFeedItem
        title="How-to: Great Product Tours"
        text="Use React Spotlight Tour!"
      />
    </SpotlightTour>
  );
}
