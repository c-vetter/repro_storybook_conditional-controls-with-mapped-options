import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

const controlShown = `<abbr className="control-shown" title="Control Shown">⦿</abbr>`
const controlHidden = `<abbr className="control-hidden" title="Control Hidden">⦾</abbr>`
const argApplied = `<abbr className="arg-applied" title="Argument Applied">⊜</abbr>`
const argIgnored = `<abbr className="arg-ignored" title="Argument Ignored">⦶</abbr>`
const same = `<abbr className="same" title="Control and Arg in sync">=</abbr>`
const different = `<abbr className="different" title="Control and Arg out of sync">≠</abbr>`
const good = `<abbr className="good" title="Control and Arg as expected">✔</abbr>`
const bad = `<abbr className="bad" title="Control and Arg wrong">✘</abbr>`

const withControl = {
  true: controlShown,
  false: controlHidden,
}
const withArg = {
  true: argApplied,
  false: argIgnored,
}

const conditions = {
  exists: {
    true: {
      children: {
        undefined: { arg: false, control: true, expect: false },
        null: { arg: true, control: true, expect: true },
        true: { arg: true, control: true, expect: true },
        false: { arg: true, control: true, expect: true },
        string: { arg: true, control: true, expect: true },
        element: { arg: true, control: true, expect: true },
      },
      size: {
        undefined: { arg: false, control: false, expect: false },
        defined: { arg: true, control: true, expect: true },
      },
    },
    false: {
      children: {
        undefined: { arg: true, control: false, expect: true },
        null: { arg: false, control: false, expect: false },
        true: { arg: false, control: false, expect: false },
        false: { arg: false, control: false, expect: false },
        string: { arg: false, control: false, expect: false },
        element: { arg: false, control: false, expect: false },
      },
      size: {
        undefined: { arg: true, control: true, expect: true },
        defined: { arg: false, control: false, expect: false },
      },
    },
  },
  truthy: {
    true: {
      children: {
        undefined: { arg: false, control: true, expect: false },
        null: { arg: false, control: true, expect: false },
        true: { arg: true, control: true, expect: true },
        false: { arg: false, control: true, expect: false },
        string: { arg: true, control: true, expect: true },
        element: { arg: true, control: true, expect: true },
      },
      size: {
        undefined: { arg: false, control: false, expect: false },
        defined: { arg: true, control: true, expect: true },
      },
    },
    false: {
      children: {
        undefined: { arg: true, control: false, expect: true },
        null: { arg: true, control: false, expect: true },
        true: { arg: false, control: false, expect: false },
        false: { arg: true, control: false, expect: true },
        string: { arg: false, control: false, expect: false },
        element: { arg: false, control: false, expect: false },
      },
      size: {
        undefined: { arg: true, control: true, expect: true },
        defined: { arg: false, control: false, expect: false },
      },
    },
  },
  eq: {
    string: {
      children: {
        undefined: { arg: false, control: true, expect: false },
        null: { arg: false, control: false, expect: false },
        true: { arg: false, control: false, expect: false },
        false: { arg: false, control: false, expect: false },
        string: { arg: false, control: false, expect: false },
        element: { arg: false, control: false, expect: false },
      },
      size: {
        undefined: { arg: false, control: false, expect: false },
        defined: { arg: false, control: false, expect: false },
      },
    },
    value: {
      children: {
        undefined: { arg: false, control: true, expect: true },
        null: { arg: false, control: true, expect: false },
        true: { arg: true, control: true, expect: false },
        false: { arg: false, control: true, expect: false },
        string: { arg: true, control: true, expect: false },
        element: { arg: true, control: true, expect: false },
      },
      size: {
        undefined: { arg: false, control: false, expect: true },
        defined: { arg: true, control: true, expect: false },
      },
    },
  },
  neq: {
    string: {
      children: {
        undefined: { arg: true, control: false, expect: true },
        null: { arg: true, control: true, expect: true },
        true: { arg: true, control: true, expect: true },
        false: { arg: true, control: true, expect: true },
        string: { arg: true, control: true, expect: true },
        element: { arg: true, control: true, expect: true },
      },
      size: {
        undefined: { arg: true, control: true, expect: true },
        defined: { arg: true, control: true, expect: true },
      },
    },
    value: {
      children: {
        undefined: { arg: false, control: true, expect: false },
        null: { arg: false, control: true, expect: true },
        true: { arg: true, control: true, expect: true },
        false: { arg: false, control: true, expect: true },
        string: { arg: true, control: true, expect: true },
        element: { arg: true, control: true, expect: true },
      },
      size: {
        undefined: { arg: false, control: false, expect: false },
        defined: { arg: true, control: true, expect: true },
      },
    },
  },
}

const conditionalValues = {
  true: true,
  false: false,
  value: undefined,
  string: `undefined`,
}

const data = Object.entries(conditions)
.flatMap(
  ([operator, x]) => Object.entries(x).map(
    ([value, { children, size }]) => ({
      operator,
      value,
      children,
      size,
    })
  )
)
.map(({ operator, value, children, size }) => ({
  operator,
  value: conditionalValues[value],
  children,
  size,
  argTypeLabel: `${
    operator[0].toUpperCase()
  }${
    operator.slice(1)
  }${
    value[0].toUpperCase()
  }${
    value.slice(1)
  }`,
}))

type D = (typeof data)[number]
type AC = D[`children`|`size`]
type X = AC[keyof AC]

function format ({ control, arg, expect }: X) {
  return `${
    withControl[control.toString()]
  }${
    control === arg
    ? same
    : different
  }${
    withArg[arg.toString()]
  } ${
    (
      (control === expect)
      && (arg === expect)
    )
    ? good
    : bad
  }`
}

const options = [
  `undefined`,
  `null`,
  `true`,
  `false`,
  `string`,
  `element`,
]

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Button",
  component: Button,
  parameters: {
    controls: { sort: 'alpha' },
    docs: { description: { component: `
      | Condition | ${
        ([
          ...options.map(v=>[`children`, v] as const),
          ...[
            `undefined`,
            `defined`,
          ].map(v=>[`size`, v] as const),
        ])
        .map(([prop, value]) => (`<abbr title="${prop}=${value}">${prop[0]}=${value[0]}</abbr>`))
        .join(` | `)
      } |
      |-|
      |${data.map(({ operator, value, children, size }) => [
        `${operator}: ${JSON.stringify(value)}`,
        ...options.map(o => format(children[o])),
        format(size.undefined),
        format(size.defined),
      ].join(` | `)).join(`|\n|`)}|
    `.replace(/^ +/gm, ``) } }
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      defaultValue: `undefined`,
      options,
      mapping: {
        undefined: undefined,
        null: null,
        true: true,
        false: false,
        string: `String`,
        element: <strong>element</strong>,
      },
      control: {
        type: `radio`,
      },
    },
    ...Object.fromEntries(
      data
      .flatMap((entry) => ([
        {
          arg: `children`,
          ...entry,
        },
        {
          arg: `size`,
          ...entry,
        },
      ]))
      .map(({
        arg,
        argTypeLabel,
        operator,
        value,
      }) => ([
        `${arg}${argTypeLabel}`,
        {
          defaultValue: true,
          if: {
            arg,
            [operator]: value,
          }
        },
      ]))
    )
  },
} as ComponentMeta<typeof Button>;

export const Repro: ComponentStory<typeof Button> = (args) => <Button {...args} />
