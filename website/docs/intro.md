---
sidebar_position: 1
---

# Usage

## Getting Started

Install React Spotlight Tour using npm or your favorite package manager:

```sh
$ npm install react-spotlight-tour
```

and you're ready to roll! There's no external CSS or anything to include.

## Adding a Spotlight

React Spotlight Tour is designed to be _composable_ — there's very little
page-level config. Any component under `SpotlightTour` can use the
`useSpotlight` hook to add an element to the tour. Compared to other libraries
this means less centralized config and less "changing this selector over here
silently breaks the tour.

Let's start by adding a tour to a small existing app. Lines added to integrate
React Spotlight Tour are highlighted in green.

```tsx {4,7,32-36,41}
// feed.js
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

function StoryFeedItem({ title, text, addComment }) {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>{title}</h1>
      <p>{text}</p>

      <CommentInputBox onSubmit={addComment} />
    </div>
  );
}

export default function Feed() {
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

[Demo ➡️](/demo)

In the example above we see that `SpotlightTour` doesn't need to know what
elements are included in the tour, it only knows if it should be open or not. To
add more elements to our tour all we need to do is call `useSpotlight` in more
child components. This approach makes it easy to:

1. Re-use components that should be highlighted
2. Keep tour changes localized

## Rendering Options

In the above call to `useSpotlight` we passed two arguments:

1. **`text: string`**: Help text to render next to the component. To add new
   lines and accomidate different screensizes React Spotlight Tour accepts
   newline (`\n`) characters in the help text.
2. **`placement: string?`**: Where to render the help text. One of `'top'`,
   `'bottom'`, `'left'`, or `'right'`. Defualts to `'bottom'`.

See the [lazy loading docs](/docs/lazy-loading) for information about the
`Spotlight` prop. See the [API reference](/docs/api) for additional information.

## Controlling Open State

Generally you only want to show product tours like this to new users. React
Spotlight Tour is unopinionated about how it is rendered; the two props that
control this are `open` on `onClose`. There are many ways to control this
behavior but one successfull approach we have seen is:

1. Give a string name to each tour, such as `'home:v1'`.
1. Embed a list of product tours the user has already seen in the initial HTML.
1. When a user lands on the page containing a tutorial check if the name appears
   in the already seen list. If it doesn't set `open={true}`, otherwise `false`.
   When closing the open tutorial add the tutorial name to the list of seen
   tutorials and send an HTTP request to your server persisting this state.

Example implementation:

```tsx
function useSpotlightOpenState(name, initialSeenTutorials) {
  const [seenTutorials, setSeenTutorials] = useState(
    initialSeenTutorials ?? []
  );

  const isOpen = useMemo(() => {
    return user != null && !seenTutorials.includes(name);
  }, [user, name, seenTutorials]);

  const markSeen = useCallback(() => {
    if (seenTutorials.includes(name)) return;

    const nextSeenTutorials = [...seenTutorials, name];
    setSeenTutorials(nextSeenTutorials);

    // We don't need the reponse here, just need to make sure the server sees this.
    // If this request fails the next tutorial request will include this tutorial.
    fetch(`/api/user/tutorial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        seenTutorials: nextSeenTutorials,
      }),
    });
  }, [seenTutorials, name]);

  return [isOpen, markSeen];
}

function HomePage() {
  // ...
  const [isSpotlightOpen, closeSpotlight] = useSpotlightOpenState(
    'home:v1',
    window.initialSeenTutorials
  );

  return (
    <SpotlightTour
      open={isSpotlightOpen}
      onClose={closeSpotlight}
      Spotlight={Spotlight}
    >
      {/* ... */}
    </SpotlightTour>
  );
}
```
