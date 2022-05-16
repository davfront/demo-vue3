# demo-vue3

Demo to show basics of a vue3 project

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) (and disable Vetur)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Questions about the test

#### How long did it take you to complete this assignment?

In total, I spent approximately 10 hours on the test.

It took me 2 hours to find a tool for unit tests which works properly with vue3+vite. I tried **Jest** then **Cypress** with no success. I finally installed [Vitest](https://vitest.dev/).

#### What would you do if you had more time?

With more time, I would:

- add more unit tests,
- do the second part of the test:
  - adding a function to load more pages,
  - displaying a loader on the bottom of the list: the loader would be observed with the intersection observer api. When the loader would appear in the viewport, the function to load more pages would be called.
- rework the ui components (Button, Input) to make them more customizable,
- add an Icon component based on iconify (with a custom icon set),
- update the design:
  - adding a search icon to the input
  - redesigning the layout when no search has been launched yet (with a more centered input)
- do some manual tests on different devices/browsers with browserstack.

#### What is your feedback on the assignment?

It is interesting to be free for the design and the solutions.

I have done some choices to make the app as small as possible, but for a bigger project, using a UI framework (for example [Quasar](https://quasar.dev/)) would be a better choice.
