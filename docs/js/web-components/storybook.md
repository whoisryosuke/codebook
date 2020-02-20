---
id: web-components-storybook
title: Storybook for Web Components
sidebar_label: Storybook
---

## Story Examples

### MDX Format

MDX (Markdown + JSX) format for Storybook Docs. Uses lit-html to render components.

> Note this includes the `storybook-addon-web-components-knobs` package which adds knobs for Web Components attributes/properties and CSS custom properties. It uses the `component` parameter in `<Meta>` to grab the correct web component (think getElementById) and read props. If no component is included, an error will be thrown. Remove dependency if you don't need it or use mixed components.

```md
import { html } from "lit-html";
import { Story, Preview, Meta, Props } from "@storybook/addon-docs/blocks";
import { action } from "@storybook/addon-actions";
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs";
import { withKnobs, text, number } from "@storybook/addon-knobs";

import { Box } from "../../../dist/index.js";

<Meta
  title="Components/Box"
  component={Box}
  parameters={{
    component: "sui-box",
    decorators: [withKnobs, withWebComponentsKnobs],
    options: { selectedPanel: "storybookjs/knobs/panel" }
  }}
/>

# &lt;sui-box&gt;

A component used for displaying content inside a box, the building block of layout.

## Features:

- Shadow DOM
- Defaults to `<div>`
- Redefine element using `as` prop

<sui-button bg="gray" p="2" href="#">Source code on Github</sui-button>

## Examples

### Basic

<Preview withToolbar>
  <Story name="Basic">
    {html`
      <sui-box>Blaze it</sui-box>
    `}
  </Story>
</Preview>

### Flex

<Preview withToolbar>
  <Story name="Flex">
    {html`
      <sui-box display="flex">
        <sui-box width="33%">
          1/3 Width
        </sui-box>
        <sui-box width="33%">
          1/3 Width
        </sui-box>
        <sui-box width="33%">
          1/3 Width
        </sui-box>
      </sui-box>
    `}
  </Story>
</Preview>

## API

<Props of="sui-box" />
```

### CSF Format

Component Story Format (CSF) examples of click, passing, data, etc using lit-html. [via: https://github.com/open-wc/open-wc/blob/master/packages/demoing-storybook/demo/stories/demo-wc-card.stories.mdx](https://github.com/open-wc/open-wc/blob/master/packages/demoing-storybook/demo/stories/demo-wc-card.stories.mdx)

```js
import { html } from "lit-html";
import { withKnobs } from "@storybook/addon-knobs";
import { withWebComponentsKnobs } from "storybook-addon-web-components-knobs";

// Import Web Component here
// Or import inside `.storybook/preview.js` for global component use

export default {
  title: "Demo",
  // Web Component Knobs uses this component name to querySelector button and grab props
  component: "sui-button",
  decorators: [withKnobs, withWebComponentsKnobs],
  parameters: { options: { selectedPanel: "storybookjs/knobs/panel" } }
};

export const Heading = () => html`
  <h1>Hello World</h1>
`;

export const Button = () => html`
  <sui-button text="Submit"></sui-button>
`;

export const SettingProperties = () => html`
  <sui-button .data=${{ header: "foo", state: true }}
    >Hello World<sui-button> </sui-button
  ></sui-button>
`;

export const Events = () => html`
  <button @click=${ev => console.log("clicked button")}>
    clicking will get logged to console
  </button>
`;

export const WithFunction = () => {
  const header = "My Header";
  return html`
    <h1>${header}</h1>
  `;
};
```
