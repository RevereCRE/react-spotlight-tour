---
sidebar_position: 2
---

# Lazy Loading

React Spotlight Tour is designed with codesplitting in mind; if you don't need
to load the tour it won't be loaded. Because there is no one standard way of
code splitting the `SpotlightTour` component can't assume the environment it is
in or how to dynamically load the `Spotlight` component. Allowing API consumers
to specify the (possibly) lazy-loaded component via the `Spotlight` prop solves
this issue.

## No Code Splitting

```tsx {2,10}
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

## `React.lazy`

```tsx {3,11}
import { SpotlightTour } from 'react-spotlight-tour';

const Spotlight = React.lazy(() => import('react-spotlight-tour/spotlight'));

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

## `next/dynamic`

```tsx {3-5,13}
import { SpotlightTour } from 'react-spotlight-tour';

const Spotlight = dynamic(() => import('react-spotlight-tour/spotlight'), {
  ssr: false,
});

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
