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

## Theming

Colors and typography are contained in `/website/siteConfig.js`. Custom CSS overrides are contained in `/website/static/css/custom.css`.
