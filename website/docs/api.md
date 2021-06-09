---
sidebar_position: 3
---

# API Reference

## `SpotlightTour`

```tsx
import { SpotlightTour } from 'react-spotlight-tour';
import Spotlight from 'react-spotlight-tour/spotlight';

function Feed() {
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
```

See the [lazy loading](/docs/lazy-loading) docs for alternative usages of
`Spotlight`.

### Props

- **`open: boolean`**
- **`onClose: () => void`**
- **`Spotlight: typeof Spotlight`**

## `useSpotlight`

```tsx
import { useSpotlight } from 'react-spotlight-tour';

function CommentInputBox({ onSubmit }) {
  const [commentText, setCommentText] = useState('');
  const spotlightRef = useSpotlight('Click to add a comment', 'right');

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
```

### Arguments

- **`text: string`**: Help text to render next to the component. To add new
  lines and accomidate different screensizes React Spotlight Tour accepts
  newline (`\n`) characters in the help text.
- **`placement?: 'bottom' | 'left' | 'right' | 'top'`**: Where to render the
  help text. Defualts to `'bottom'`.

### Returns

- `React.RefCallback<HTMLElement | null>`
