# Resonate.js
### A modern minimalist cursor-based animation library for the Javascript ecosystem.
<div align="center">
  
[![Npm version](https://img.shields.io/npm/v/@resonatejs/react?style=for-the-badge&logo=npm)](www.npmjs.com/package/@resonatejs/react)
[![Downloads](https://img.shields.io/npm/dw/@resonatejs/react?style=for-the-badge)](www.npmjs.com/package/@resonatejs/react)
[![Top](https://img.shields.io/github/languages/top/ATLAS2002/resonatejs?style=for-the-badge&label=Top%20Languages)](https://github.com/ATLAS2002/resonatejs)
[![Size](https://img.shields.io/bundlephobia/min/@resonatejs/react?style=for-the-badge)](www.npmjs.com/package/@resonatejs/react)
<br/>
[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ATLAS2002/resonatejs?logo=github&style=for-the-badge)](https://github.com/ATLAS2002/resonatejs) 
[![GitHub last commit](https://img.shields.io/github/last-commit/ATLAS2002/resonatejs?style=for-the-badge&logo=git)](https://github.com/ATLAS2002/resonatejs)
[![Languages](https://img.shields.io/github/languages/count/ATLAS2002/resonatejs?style=for-the-badge)](https://github.com/ATLAS2002/resonatejs)
[![Issues](https://img.shields.io/github/issues/ATLAS2002/resonatejs?style=for-the-badge&label=Issues)](https://github.com/ATLAS2002/resonatejs)
[![LICENSE](https://img.shields.io/npm/l/@resonatejs/react?style=for-the-badge)](https://github.com/ATLAS2002/resonatejs)
</div>

https://github.com/ATLAS2002/resonatejs/assets/123821746/bc1e7b71-77a5-42bc-9ce5-5ab475658e91

## Table of Contents 📖
- [Features](#features-)
- [Installation](#installation-)
- [Usage](#usage-)
- [Architecture](#architecture-)

## Features 🚀
- 🧩 **Ease of use :** write less, do more.
- ✨ **Modern :** get support for your modern frameworks.
- 💼 **Customisation :** have complete control over the code.
- 🛍️ **Presets :** use popular presets right out of the box.
- 💻 **API :** offering a comprehensive interface to work with the DOM.
- 💉 **Injectable :** use Resonate without changing existing code.
- 🛡️ **Typescript :** get full typescript support.
- 🪶 **Zero Dependancies :** don't waste a byte on some code you don't need.

## Installation 📦
##### via [NPM](https://docs.npmjs.com/cli/v10/commands/npm-install)
```sh
npm install --save @resonate/react
```
##### via [Yarn](https://classic.yarnpkg.com/lang/en/docs/cli/add)
```sh
yarn add @resonate/react
```
##### via [PNPM](https://pnpm.io/cli/add)
```sh
pnpm add @resonate/react
```
##### via [Bun](https://bun.sh/docs/cli/add)
```sh
bun add @resonate/react
```

## Usage 🔌
### Presets
```tsx
import { tilt, glare, useResonate, ResonateContainer } from "@resonatejs/react";

export const Card: React.FC = () => {
  const trackers = useResonate({
    presets: [glare(), tilt(), ...] // all your presets go here
  });

  return (
    <ResonateContainer
      className="..."
      trackers={trackers}
    >
      Try it out!
    </ResonateContainer>
  );
}

```

### Listeners
```tsx
import { useResonate, ResonateContainer } from "@resonatejs/react";

export const Card: React.FC = () => {
  const trackers = useResonate({
    // access the rich API
    listeners: ({ getCenterPosition }) => {
      const { x, y } = getCenterPosition();
      // return all the event listeners
      return {
        mousemove({ clientX, clientY }) {
          console.log(clientX - x, clientY - y);
        },
      };
    },
  });

  return (
    <ResonateContainer
      className="h-full w-full py-24 text-zinc-300 ring-2 ring-zinc-600 text-center text-7xl text-wrap rounded-xl font-mono bg-zinc-900"
      trackers={trackers}
    >
      Try it out!
    </ResonateContainer>
  );
};

```
