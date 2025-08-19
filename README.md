# @esmkit/colors

The tiniest and the fastest library for terminal output formatting with ANSI colors

- **No dependencies.**
- Node.js v6+ & browsers support. Support for both CJS and ESM projects.
- TypeScript type declarations included.

## Installation

```bash
bun add @esmkit/colors
```

## Usage

```ts
import colors from "@esmkit/colors"
console.log(
  colors.green(`How are ${colors.italic(`you`)} doing?`)
)
```

The object also includes following background color modifier functions: `bgBlack`, `bgRed`, `bgGreen`, `bgYellow`, `bgBlue`, `bgMagenta`, `bgCyan`, `bgWhite` and bright variants `bgBlackBright`, `bgRedBright`, `bgGreenBright`, `bgYellowBright`, `bgBlueBright`, `bgMagentaBright`, `bgCyanBright`, `bgWhiteBright`.

```ts
import colors from "@esmkit/colors"
console.log(
  colors.bgBlack(
    colors.white(`Tom appeared on the sidewalk with a bucket of whitewash and a long-handled brush.`)
  )
)
```

Besides colors, the object includes following formatting functions: `dim`, `bold`, `hidden`, `italic`, `underline`, `strikethrough`, `reset`, `inverse` and bright variants `blackBright`, `redBright`, `greenBright`, `yellowBright`, `blueBright`, `magentaBright`, `cyanBright`, `whiteBright`.

```ts
import colors from "@esmkit/colors"
for (let task of tasks) {
  console.log(`${colors.bold(task.name)} ${colors.dim(task.durationMs + "ms")}`)
}
```

The library provides additional utilities to ensure the best results for the task:

- `isColorSupported` — boolean, explicitly tells whether or not the colors or formatting appear on the screen

  ```javascript
  import colors from "@esmkit/colors"

  if (colors.isColorSupported) {
    console.log("Yay! This script can use colors and formatters")
  }
  ```

`createColors(enabled)` — a function that returns a new API object with manually defined color support configuration

```javascript
import colors from "@esmkit/colors"

let { red, bgWhite } = colors.createColors(options.enableColors)
```

## Motivation

With `@esmkit/colors` we are trying to draw attention to the `node_modules` size
problem and promote performance-first culture.

## License

MIT © BILLGO. See LICENSE for details.
