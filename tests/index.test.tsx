import { describe, expect, test } from "bun:test";
import { colors } from "../src";

const FMT = {
  reset: ["\x1b[0m", "\x1b[0m"],
  bold: ["\x1b[1m", "\x1b[22m"],
  dim: ["\x1b[2m", "\x1b[22m"],
  italic: ["\x1b[3m", "\x1b[23m"],
  underline: ["\x1b[4m", "\x1b[24m"],
  inverse: ["\x1b[7m", "\x1b[27m"],
  hidden: ["\x1b[8m", "\x1b[28m"],
  strikethrough: ["\x1b[9m", "\x1b[29m"],

  black: ["\x1b[30m", "\x1b[39m"],
  red: ["\x1b[31m", "\x1b[39m"],
  green: ["\x1b[32m", "\x1b[39m"],
  yellow: ["\x1b[33m", "\x1b[39m"],
  blue: ["\x1b[34m", "\x1b[39m"],
  magenta: ["\x1b[35m", "\x1b[39m"],
  cyan: ["\x1b[36m", "\x1b[39m"],
  white: ["\x1b[37m", "\x1b[39m"],
  gray: ["\x1b[90m", "\x1b[39m"],

  bgBlack: ["\x1b[40m", "\x1b[49m"],
  bgRed: ["\x1b[41m", "\x1b[49m"],
  bgGreen: ["\x1b[42m", "\x1b[49m"],
  bgYellow: ["\x1b[43m", "\x1b[49m"],
  bgBlue: ["\x1b[44m", "\x1b[49m"],
  bgMagenta: ["\x1b[45m", "\x1b[49m"],
  bgCyan: ["\x1b[46m", "\x1b[49m"],
  bgWhite: ["\x1b[47m", "\x1b[49m"],

  blackBright: ["\x1b[90m", "\x1b[39m"],
  redBright: ["\x1b[91m", "\x1b[39m"],
  greenBright: ["\x1b[92m", "\x1b[39m"],
  yellowBright: ["\x1b[93m", "\x1b[39m"],
  blueBright: ["\x1b[94m", "\x1b[39m"],
  magentaBright: ["\x1b[95m", "\x1b[39m"],
  cyanBright: ["\x1b[96m", "\x1b[39m"],
  whiteBright: ["\x1b[97m", "\x1b[39m"],

  bgBlackBright: ["\x1b[100m", "\x1b[49m"],
  bgRedBright: ["\x1b[101m", "\x1b[49m"],
  bgGreenBright: ["\x1b[102m", "\x1b[49m"],
  bgYellowBright: ["\x1b[103m", "\x1b[49m"],
  bgBlueBright: ["\x1b[104m", "\x1b[49m"],
  bgMagentaBright: ["\x1b[105m", "\x1b[49m"],
  bgCyanBright: ["\x1b[106m", "\x1b[49m"],
  bgWhiteBright: ["\x1b[107m", "\x1b[49m"],
} as const;

describe("picocolors compatibility", () => {
  test("color matching", () => {
    for (const format of Object.keys(FMT) as (keyof typeof FMT)[]) {
      expect(typeof colors[format]).toBe("function");
      expect(colors[format]("string")).toBe(FMT[format][0] + "string" + FMT[format][1]);
    }
  });

  test("format/color nesting", () => {
    expect(colors.bold(`BOLD ${colors.red(`RED ${colors.dim("DIM")} RED`)} BOLD`)).toBe(FMT.bold[0] + "BOLD " + FMT.red[0] + "RED " + FMT.dim[0] + "DIM" + FMT.dim[1] + FMT.bold[0] + " RED" + FMT.red[1] + " BOLD" + FMT.bold[1]);
  });

  test("proper wrapping", () => {
    expect(colors.red(colors.bold("==TEST=="))).toBe(FMT.red[0] + FMT.bold[0] + "==TEST==" + FMT.bold[1] + FMT.red[1]);
  });

  test("complex case of wrapping", () => {
    expect(colors.bold(colors.yellow(colors.bgRed(colors.italic("==TEST=="))))).toBe(FMT.bold[0] + FMT.yellow[0] + FMT.bgRed[0] + FMT.italic[0] + "==TEST==" + FMT.italic[1] + FMT.bgRed[1] + FMT.yellow[1] + FMT.bold[1]);

    expect(colors.cyan(colors.bold(colors.underline("==TEST==")))).toBe(FMT.cyan[0] + FMT.bold[0] + FMT.underline[0] + "==TEST==" + FMT.underline[1] + FMT.bold[1] + FMT.cyan[1]);
  });

  test("close sequence replacement", () => {
    expect(colors.red(`foo ${colors.yellow("bar")} baz`)).toBe(FMT.red[0] + "foo " + FMT.yellow[0] + "bar" + FMT.red[0] + " baz" + FMT.red[1]);

    expect(colors.bold(`foo ${colors.red(colors.dim("bar"))} baz`)).toBe(FMT.bold[0] + "foo " + FMT.red[0] + FMT.dim[0] + "bar" + FMT.dim[1] + FMT.bold[0] + FMT.red[1] + " baz" + FMT.bold[1]);

    expect(colors.yellow(`foo ${colors.red(colors.bold("red"))} bar ${colors.cyan("cyan")} baz`)).toBe(FMT.yellow[0] + "foo " + FMT.red[0] + FMT.bold[0] + "red" + FMT.bold[1] + FMT.yellow[0] + " bar " + FMT.cyan[0] + "cyan" + FMT.yellow[0] + " baz" + FMT.yellow[1]);
  });

  test("non-string input", () => {
    expect(colors.red()).toBe(FMT.red[0] + "undefined" + FMT.red[1]);
    expect(colors.red(undefined)).toBe(FMT.red[0] + "undefined" + FMT.red[1]);
    expect(colors.red(0)).toBe(FMT.red[0] + "0" + FMT.red[1]);
    expect(colors.red(Number.NaN)).toBe(FMT.red[0] + "NaN" + FMT.red[1]);
    expect(colors.red(null)).toBe(FMT.red[0] + "null" + FMT.red[1]);
    expect(colors.red(true)).toBe(FMT.red[0] + "true" + FMT.red[1]);
    expect(colors.red(false)).toBe(FMT.red[0] + "false" + FMT.red[1]);
    expect(colors.red(Number.POSITIVE_INFINITY)).toBe(FMT.red[0] + "Infinity" + FMT.red[1]);
  });

  test("shouldn't overflow when coloring already colored large text", () => {
    expect(() => {
      colors.blue(colors.red("x").repeat(10_000));
    }).not.toThrow();
  });
});
