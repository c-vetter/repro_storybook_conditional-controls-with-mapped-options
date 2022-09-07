import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Button } from "./Button";

const controlShown = `<abbr className="control-shown" title="Control Shown">⦿</abbr>`
const controlHidden = `<abbr className="control-hidden" title="Control Hidden">⦾</abbr>`
const argApplied = `<abbr className="arg-applied" title="Argument Applied">⊜</abbr>`
const argIgnored = `<abbr className="arg-ignored" title="Argument Ignored">⦶</abbr>`
const good = `<abbr className="good" title="Control and Arg in sync">✔</abbr>`
const bad = `<abbr className="bad" title="Control and Arg out of sync">✘</abbr>`

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
        undefined: { arg: false, control: true },
        null: { arg: true, control: true },
        true: { arg: true, control: true },
        false: { arg: true, control: true },
        string: { arg: true, control: true },
        element: { arg: true, control: true },
      },
      size: {
        undefined: { arg: false, control: false },
        set: { arg: true, control: true },
      },
    },
    false: {
      children: {
        undefined: { arg: true, control: false },
        null: { arg: false, control: false },
        true: { arg: false, control: false },
        false: { arg: false, control: false },
        string: { arg: false, control: false },
        element: { arg: false, control: false },
      },
      size: {
        undefined: { arg: true, control: true },
        set: { arg: false, control: false },
      },
    },
  },
  truthy: {
    true: {
      children: {
        undefined: { arg: false, control: true },
        null: { arg: false, control: true },
        true: { arg: true, control: true },
        false: { arg: false, control: true },
        string: { arg: true, control: true },
        element: { arg: true, control: true },
      },
      size: {
        undefined: { arg: false, control: false },
        set: { arg: true, control: true },
      },
    },
    false: {
      children: {
        undefined: { arg: true, control: false },
        null: { arg: true, control: false },
        true: { arg: false, control: false },
        false: { arg: true, control: false },
        string: { arg: false, control: false },
        element: { arg: false, control: false },
      },
      size: {
        undefined: { arg: true, control: true },
        set: { arg: false, control: false },
      },
    },
  },
  eq: {
    string: {
      children: {
        undefined: { arg: false, control: true },
        null: { arg: false, control: false },
        true: { arg: false, control: false },
        false: { arg: false, control: false },
        string: { arg: false, control: false },
        element: { arg: false, control: false },
      },
      size: {
        undefined: { arg: false, control: false },
        set: { arg: false, control: false },
      },
    },
    value: {
      children: {
        undefined: { arg: false, control: true },
        null: { arg: false, control: true },
        true: { arg: true, control: true },
        false: { arg: false, control: true },
        string: { arg: true, control: true },
        element: { arg: true, control: true },
      },
      size: {
        undefined: { arg: false, control: false },
        set: { arg: true, control: true },
      },
    },
  },
  neq: {
    string: {
      children: {
        undefined: { arg: true, control: false },
        null: { arg: true, control: true },
        true: { arg: true, control: true },
        false: { arg: true, control: true },
        string: { arg: true, control: true },
        element: { arg: true, control: true },
      },
      size: {
        undefined: { arg: true, control: true },
        set: { arg: true, control: true },
      },
    },
    value: {
      children: {
        undefined: { arg: false, control: true },
        null: { arg: false, control: true },
        true: { arg: true, control: true },
        false: { arg: false, control: true },
        string: { arg: true, control: true },
        element: { arg: true, control: true },
      },
      size: {
        undefined: { arg: false, control: false },
        set: { arg: true, control: true },
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

function format ({ control, arg }: X) {
  return `${withControl[control.toString()]}${withArg[arg.toString()]} ${control === arg ? good : bad}`
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
            `set`,
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
        format(size.set),
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
