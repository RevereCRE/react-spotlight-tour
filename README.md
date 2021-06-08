<h1 align="center">
  <img height="300" src="https://github.com/RevereCRE/react-spotlight-tour/blob/main/.github/readme_logo.png">
  <br>
  React Spotlight Tour
</h1>

<p align="center">
  A self-configuring tutorial library for React.
  <br>
  <a href="https://reverecre.github.io/react-spotlight-tour">
    Docs
  </a>&nbsp;&nbsp;<a href="https://reverecre.github.io/react-spotlight-tour/docs/intro">
    Demo
  </a>&nbsp;&nbsp;<a href="https://www.npmjs.com/package/react-spotlight-tour">
    npm
  </a>
</p>

## Features

- Clean and unobtrusive overlay to highlight the important parts of your app
  inspired by [Chardin.js](https://heelhook.github.io/chardin.js/)
- Lightweight, only depends on React and the `Spotlight` component can be
  lazy-loaded
- Uses composable React hooks to build tutorials rather than selectors
- Mobile and desktop support
- Fully typed with TypeScript!

## Getting Started

`react-spotlight-tour` comes with everything you need built into the npm
package, no need for integration with bundlers. Install the package with:

```sh
$ npm install react-spotlight-tour
```

## Example Usage

```tsx
import { useState } from 'react';
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
}
```

## Contributing

To test changes locally run:

```sh
$ npx tsc --module es2015 --outDir website/src/react-spotlight-tour
```

You can then see your changes live on the documentation website by running:

```sh
$ cd website
$ npm start
```
