<h1 align="center">
  <img height="300" src="https://github.com/RevereCRE/react-highlights/blob/main/.github/readme_logo.png">
  <br>
  React Highlights
</h1>

<p align="center">
  A self-configuring tutorial library for React.
  <br>
  <a href="https://reverecre.github.io/react-highlights">
    Docs
  </a>&nbsp;&nbsp;<a href="https://reverecre.github.io/react-highlights/docs/intro">
    Demo
  </a>&nbsp;&nbsp;<a href="https://www.npmjs.com/package/react-highlights">
    npm
  </a>
</p>

## Features

- Clean and unobtrusive overlay to highlight the important parts of your app
  inspired by [Chardin.js](https://heelhook.github.io/chardin.js/)
- Lightweight, only depends on React and the highlight component can be
  lazy-loaded
- Uses composable React hooks to build tutorials rather than selectors
- Mobile and desktop support
- Fully typed with TypeScript!

## Getting Started

`react-highlights` comes with everything you need built into the npm package, no
need for integration with bundlers. Install the package with:

```sh
$ npm install react-highlights
```

## Example Usage

```tsx
import { useState } from 'react';
import { Highlights, useHighlight } from 'react-highlights';
import { Highlighter } from 'react-highlights/react-highlighter';

function StatusUpdateInput() {
  const highlightRef = useHighlight('Update your status');

  // ...

  return (
    <div ref={highlightRef}>
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
}
```

## Contributing

To test changes locally run:

```sh
$ npm run build
$ npm run clean
$ cp -r dist website/src/react-highlights
```

You can then see your changes live on the documentation website by running:

```sh
$ cd website
$ npm start
```
