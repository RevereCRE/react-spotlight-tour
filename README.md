<h1 align="center">
  <img height="300" src="https://github.com/RevereCRE/autotutorial/blob/main/.github/readme_logo.png">
  <br>
  Autotutorial
</h1>

<p align="center">
  A self-configuring tutorial library for React.
  <br>
  <a href="https://reverecre.github.io/autotutorial">
    Docs
  </a>

&nbsp;

  <a href="http://localhost:3000/docs/intro">
    Demo
  </a>
</p>

## Features

- Clean and unobtrusive overlay to highlight the important parts of your app
  inspired by [Chardin.js](https://heelhook.github.io/chardin.js/)
- Uses composable React hooks to build tutorials rather than selectors
- Unopinionated persistence for seen tutorials
- Mobile and desktop support
- Fully typed with TypeScript!

## Example Usage

```tsx
import { AutoTutorial, useAutoTutorial } from 'autotutorial';
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
}
```
