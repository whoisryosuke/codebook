<p style="text-align:center">
  <h1>📓 Codebook</h1>
</p>

A collection of notes and snippets about code.

Created using [Docusaurus](https://docusaurus.io/).

## Getting Started

`cd website && yarn && yarn start`

Navigate to the `/website` directory, install dependencies, and run the start script.

### Build / Deployment

`yarn build`

#### [Hosting on Netlify](https://docusaurus.io/docs/en/publishing#hosting-on-netlify)

Steps to configure your Docusaurus-powered site on Netlify.

1.  Select **New site from Git**

2.  Connect to your preferred Git provider.

3.  Select the branch to deploy. Default is `master`

4.  Configure your build steps:

    - For your build command enter: `cd website; npm install; npm run build;`
    - For publish directory: `website/build/<projectName>` (use the `projectName` from your `siteConfig`)

5.  Click **Deploy site**

You can also configure Netlify to rebuild on every commit to your repository, or only `master` branch commits.

## Writing

1. Create a new Markdown file in `/docs`.

> Slug is based on the folder structure and filename (e.g. `/react/react-snippets.md` would be `/docs/react/react-snippets/`).

2. Add the following frontmatter:

```md
---
id: css-snippets
title: CSS Snippets
sidebar_label: Snippets
---
```

> `id` is internal slug, `sidebar_label` is optional and sets different title in Sidebar.

3. Optionally add the new "docs" to the Sidebar (`/website/sidebars.json`).

## Writing Components

### Embedding React Components

Since Docusaurus uses MDX, you can define React components on the top of your MDX file, then use them anywhere in the content.

```mdx
export const Highlight = ({children, color}) => (
  <span
    style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: '#fff',
      padding: '0.2rem',
    }}>
    {children}
  </span>
);

<Highlight color="#25c2a0">Docusaurus green</Highlight> and <Highlight color="#1877F2">Facebook blue</Highlight> are my favorite colors.

I can write **Markdown** alongside my _JSX_!
```

You can also import components from NPM or other libraries:

```mdx
import Highlight from "component-library";

<Highlight color="#25c2a0">Docusaurus green</Highlight> and <Highlight color="#1877F2">Facebook blue</Highlight> are my favorite colors.

I can write **Markdown** alongside my _JSX_!
```

### Line Highlighting

To draw attention to certain lines of code you can add the line number in brackets next to the language/syntax name.

  ```jsx {3}
  function HighlightSomeText(highlight) {
    if (highlight) {
      return 'This text is highlighted!';
    }

    return 'Nothing highlighted';
  }
  ```

Highlighting multiple lines

  ```jsx {1,4-6,11}
  import React from 'react';

  function MyComponent(props) {
    if (props.isBar) {
      return <div>Bar</div>;
    }

    return <div>Foo</div>;
  }

  export default MyComponent;
  ```

### Multi-language Code Blocks

Docusaurus v2 uses MDX to parse it's Markdown content, allowing you to use React components. They provide default components that create a tabbed navigation and separate code examples.

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="js">

```js
function helloWorld() {
  console.log('Hello, world!');
}
```

</TabItem>
<TabItem value="py">

```py
def hello_world():
  print 'Hello, world!'
```

</TabItem>
<TabItem value="java">

```java
class HelloWorld {
  public static void main(String args[]) {
    System.out.println("Hello, World");
  }
}
```

</TabItem>
</Tabs>
```

### Tips

Docusaurus uses [remark-admonitions](https://github.com/elviswolcott/remark-admonitions) to add support for 

```md
:::tip Title
The content and title *can* include markdown.
:::
```

The default keywords are:

- `important` - Blue
- `tip` - Green
- `note` - Gray
- `warning` - Yellow
- `danger` - Red

You can also use these aliases instead:

- `info` => `important`
- `success` => `tip`
- `secondary` => `note`
- `danger` => `warning`

## Theming

Colors and typography are contained in `/website/siteConfig.js`. Custom CSS overrides are contained in `/website/static/css/custom.css`.
