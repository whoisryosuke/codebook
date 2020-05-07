---
id: mdx
title: MDX - NextJS
sidebar_label: MDX
---

# Using MDX with Next

MDX is an extension of the Markdown language and adds the ability to write Javascript and JSX (aka React components) inside your files alongside Markdown syntax context. 

As of writing, Next has [a plugin for MDX](https://www.npmjs.com/package/@next/mdx) that allow for authoring pages as MDX files. So rather than creating a page as `/pages/your-page.jsx`, you create a `/pages/your-page.mdx` file. Combined with Next's static building, it becomes an excellent option for creating blogs, docs, or even landing pages. 

# Example projects

I setup a new NextJS project (v9.3.4) with MDX and created branches for each stage of the development. That way if you want the most base install possible, you can use that branch. Or if you're interested in using Styled Components, there's a branch progressed to that stage as well. You can also go through each step and it's commits to see what's integral for each integration.

## [Basic install](https://github.com/whoisryosuke/next-mdx-boilerplate/tree/basic-install)

[🛠 Test it out on CodeSandbox](https://codesandbox.io/s/github/whoisryosuke/next-mdx-boilerplate/tree/basic-install)

- Write content as MDX. Either directly in `/pages/` or import MDX into React pages.

## [Custom Components](https://github.com/whoisryosuke/next-mdx-boilerplate/tree/custom-components)

[🛠 Test it out on CodeSandbox](https://codesandbox.io/s/github/whoisryosuke/next-mdx-boilerplate/tree/custom-components)

- Pass custom components into the MDX Provider (e.g. swap `<h1>` with a React component)

## [Basic example](https://github.com/whoisryosuke/next-mdx-boilerplate/tree/master)

[🛠 Test it out on CodeSandbox](https://codesandbox.io/s/github/whoisryosuke/next-mdx-boilerplate/tree/master)

- Merges "Basic Install" and "Custom Components"

## [Basic layouts](https://github.com/whoisryosuke/next-mdx-boilerplate/tree/basic-layouts)

[🛠 Test it out on CodeSandbox](https://codesandbox.io/s/github/whoisryosuke/next-mdx-boilerplate/tree/basic-layouts)

- Example of using different post layouts

## [Styled Components](https://github.com/whoisryosuke/next-mdx-boilerplate/tree/styled-components)

[🛠 Test it out on CodeSandbox](https://codesandbox.io/s/github/whoisryosuke/next-mdx-boilerplate/tree/styled-components)

- Integrated with Styled Components.
- App is wrapped with a custom theme
- Dynamic stylesheets are written on build and updated client-side

## [Prettier + ESLint](https://github.com/whoisryosuke/next-mdx-boilerplate/tree/prettier)

[🛠 Test it out on CodeSandbox](https://codesandbox.io/s/github/whoisryosuke/next-mdx-boilerplate/tree/prettier)

- Prettier integrated
- Prettier configured for NextJS
- ESLint integrated.
- ESLint configured with Airbnb as base, and NextJS custom rules on top.
    - Accessibility rules (jsx-a11y) included
- Prettier and ESLint integrated together.

## Styled + Prettier

[🛠 Test it out on CodeSandbox](https://codesandbox.io/s/github/whoisryosuke/next-mdx-boilerplate/tree/styled-and-prettier)

- Merges "Styled Components" and "Prettier + ESLint" branches

## [Typescript](https://github.com/whoisryosuke/next-mdx-boilerplate/tree/typescript)

[🛠 Test it out on CodeSandbox](https://codesandbox.io/s/github/whoisryosuke/next-mdx-boilerplate/tree/typescript)

- Same features as basic install
- Integrates Typescript
- Adds `package.json` script for linting TS/TSX files

## [Typescript + Linting](https://github.com/whoisryosuke/next-mdx-boilerplate/tree/typescript-and-prettier)

[🛠 Test it out on CodeSandbox](https://codesandbox.io/s/github/whoisryosuke/next-mdx-boilerplate/tree/typescript-and-prettier)

- Same features as Typescript
- Kinda merges Prettier branch, but swaps `babel-eslint` for Typescript specific parsers
- Includes `tsconfig.json`
- Properly typed (complete with MDX types)

## [Chakra UI](https://github.com/whoisryosuke/next-mdx-boilerplate/tree/chakra-ui)

[🛠 Test it out on CodeSandbox](https://codesandbox.io/s/github/whoisryosuke/next-mdx-boilerplate/tree/chakra-ui)

- Merges "Styled Components" and "Prettier + ESLint" branches
- Integrated Chakra UI
- Use any Chakra UI components inside MDX without imports
- Replaced Styled Components with Emotion ([with proper NextJS integration](https://github.com/zeit/next.js/blob/canary/examples/with-emotion/pages/index.js))
- Added a sample `<Header />` component (from Chakra UI recipes) to the sample layout

## [Chakra UI + Framer Motion](https://github.com/whoisryosuke/next-mdx-boilerplate/tree/chakra-motion)

- Same features as Chakra UI
- Integrates framer-motion library
- Page transition animations (exiting and entering)
- Component-level transition animations (entering and hovering)

# How does it work?

- NextJS has a plugin for MDX. The plugin detects most MDX files in the project and processes them.

```js
const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
})
```

- In order to detect MDX files in pages directory (where NextJS picks up React page component automatically), you have to add MDX to the page file extensions in the config:

```js
module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'mdx'],
})
```

- MDX page content is loaded automatically into the NextJS [app wrapper](https://nextjs.org/docs/advanced-features/custom-app). You can customize this by adding a `_app.js` file to your project. In this file, you can change the page layout, usually by wrapping the content in a layout component. In this case, we also provide MDX with more components using it's context provider:

```js
import React from 'react'
import {MDXProvider} from '@mdx-js/react'

const mdComponents = {
    h1: props => <h1 style={{color: 'tomato'}} {...props} />
}

export default ({Component, pageProps}) => (
    <MDXProvider components={mdComponents}>
    <Component {...pageProps} />
    </MDXProvider>
)
```

- You should have a NextJS site setup where you can write MDX files inside the pages directory and display them on the frontend (ideally with different layouts based on page).

## Creating MDX pages

### `/pages/` directory

Place MDX files directly in `/pages/` for them to show.

### Import MDX files

Import the MDX files like you would any other React component or NPM dependency. This gives you a parsed version of the MDX courtesy of Webpack on build. Great for authoring content as MDX and importing into React pages.

```js
import About from "./about.mdx"

const TestPage = () => {

    return (
        <div>
            <div>Test</div>
            <About />
        </div>
    )
}
export default TestPage
```

# Common Issues

## Page layouts

Previously when integrating Markdown with NextJS, you'd parse the Markdown content, check the frontmatter, see if there was a "section" or "layout" parameter, and swap the layout based off that. This all would happen inside a dynamic page component (like `/pages/blog/[slug].js`) where you'd use the the NodeJS filesystem (`fs`) to query for the content (and inevitably parse it).

With MDX, it's a much simpler process. You import the layout component and wrap you MDX content in it:

```mdx
import AboutPage from "../layouts/AboutPage"

<AboutPage>

# About

A test MDX page.

</AboutPage>
```

This is much simpler than the alternative, where you're forced to parse the MDX (see below).

## Frontmatter is a problem

By default, the MDX plugin for Next doesn't support frontmatter. If you include it inside your MDX file, it'll print out inside the content area of the post. If you're migrating an existing content library to Next, and you have to use MDX, make sure you're not using frontmatter (or have an efficient way to convert it).

The way you handle frontmatter in MDX is a little different. Since MDX allows you to write Javascript inside your files, like importing and using React components, you can also export data. According to the MDX docs, this is how it looks like:

```js
import { sue, fred } from '../data/authors'
export const metadata = {
    authors: [sue, fred]
}
# Post about MDX
MDX is a JSX in Markdown loader, parser, and renderer for ambitious projects.
```

And when you want to use the metadata (i.e. frontmatter), you import it as a module alongside the post content:

```js
import React from 'react'
import MDXContent, {metadata} from 'posts/post.mdx'
export default () => (
    <>
    <MDXContent />
    <footer>
        <p>By: {metadata.authors.map(author => author.name).join(', ') + '.'}</p>
    </footer>
    </>
)
```

The only issue? You can't get this dynamically, since MDX files require Webpack parsing to access the metadata like this. Instead, it's recommend you load the data using Node's filesystem, then parse the MDX file manually using [MDX AST](https://mdxjs.com/advanced/ast). Then you can walk through the tree to find the metadata object. 

```json
{
    "type": "root",
    "children": [
    {
        "type": "import",
        "value": "import { sue, fred } from '../data/authors'\n",
        "position": {
        "start": {
            "line": 1,
            "column": 1,
            "offset": 0
        },
        "end": {
            "line": 2,
            "column": 1,
            "offset": 44
        },
        "indent": [
            1
        ]
        }
    },
    {
        "type": "export",
        "value": "export const metadata = {\n  authors: [sue, fred]\n}",
        "position": {
        "start": {
            "line": 2,
            "column": 1,
            "offset": 44
        },
        "end": {
            "line": 4,
            "column": 2,
            "offset": 94
        },
        "indent": [
            1,
            1
        ]
        }
    },
```

It's not clear how to get the AST however? The docs don't make it clear anywhere how to parse MDX manually without some sort of plugin for a framework (like CRA or Next).

### Post Archives / Post Summaries

The basic process for creating post archives:

- You use the getStaticProps method in your page (like a blog archive). In the method, you use Node's fs method to access the MDX content directory. Then you can loop over the posts however you need. 
- Since you will likely need frontmatter, you'll need to parse the MDX as an AST and navigate it to find that. Here you can also try to pull a blog summary by avoiding any JS that may be at the top of the MDX.

The major issue with this is the amount of processing required. Each page that references the MDX content will be required to parse it separately, since each page executes it's own `getStaticProps` lifecycle. You could try to cache the results? But at this point, you might want to explore options like Gatsby that create a unified data layer with GraphQL.

**Example of an archive page:**

```js
export async function getStaticProps({ params }) {
    const postsDirectory = path.join(process.cwd(), 'posts')
    const mdxFiles = fs.readdirSync(postsDirectory)
    // const mdxFiles = fs.readdirSync("posts")
    // Loop through all post files and create array of slugs (to create links)
    const paths = files.map(filename => ({ slug: filename.replace(".mdx", "") }));

    // Optionally loop through files, get content, and parse frontmatter
    const postsWithFrontmatter = files.map(filename => {
        const postContent = fs.readFileSync(path.join("posts", params.slug + ".mdx")).toString();

        // Dont do this.
        // const frontmatter = matter(postContent)

        // Parse the MDX as an AST instead
        // Use the MDX library to parse here "server-side"
        // Pass the parsed data back to page component below

        return ({
            slug: filename.replace(".mdx", ""),
            frontmatter
        })
    })

    return {
        props: {
            posts: paths
            // or posts: postsWithFrontmatter
        }
    }
}
```

**Example of a single page:**

Here we use the `@next/dynamic` library to dynamically load the MDX data using Webpack (since Webpack parses the content for us, and without it we'd have a giant unparsed string of MDX).

```js
import fs from 'fs'
import path from 'path'
import dynamic from 'next/dynamic'

const BlogPostPage = ({ filename }) => {
    console.log('the filename', filename)
    const MDXContent = dynamic(() => import(`../../../${filename}`))
    const MDXMetadata = dynamic(() => import(`../../../${filename}`).then(mod => mod.metadata))
    console.log('the content', MDXMetadata)
    return (
        <div>
            <h1>Blog</h1>
            <MDXContent />
            <h2>Blog Title: {MDXMetadata.title}</h2>
            <h2>Date: {MDXMetadata.date}</h2>
        </div>
    )
}

export async function getStaticProps({ params }) {
    const filename = path.join("content/blog", params.slug + ".mdx")

    // const frontmatter = matter(mdxPost)

    return {
        props: {
            filename
        },
    }
}

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'content/blog')
    const mdxFiles = fs.readdirSync(postsDirectory)
    console.log('the queried pages', mdxFiles)
	// Loop through all post files and create array of slugs (to create links)
	const paths = mdxFiles.map(filename => ({
        params: {
            slug: filename.replace(".mdx", "")
        }
	}));

	return {
        paths,
        fallback: false
	}
}

export default BlogPostPage
```

## Linting MDX

Writing MDX is great, but with any declarative syntax it can be easy to make a small mistake that breaks the entire code. [MDX supports linting using ESLint](https://github.com/mdx-js/eslint-mdx), which statically analyzes your MDX content and checks if it passes predetermined rules. This works great for detecting small issues while writing.

    yarn add -D eslint-plugin-mdx

However, it breaks when you try to use MDX for what it's for. For example, when you want to wrap a page in a certain layout, you just wrap the entire MDX file's content in a React component that contains the layout (see above "Page Layouts"). 

```js
<PageLayout>

# MDX Page

This content prints correctly. But linting will fail at the code block.

```js
const TestComponent = () => {
    return(<div>Test</div>)
}
```

All this content will look improperly colored in the code editor now.

</PageLayout>
```

The issue with this style of writing is that we're mixing Markdown and JSX. There's usually not an issue with it, but it has some odd edge cases that you'll encounter quickly. Ideally if you write JSX, you shouldn't place Markdown inside it. It works, the MDX parser will convert Markdown inside React components into HTML. But the linter, on the other hand, has some issues parsing the data according to it's rules. 

If you include a code example that uses Javascript inside your MDX using "code fences" (or the three tildes followed by the language) it will break the linter. The issue lies with the way our MDX file is setup. We wrap the Markdown/MDX content in a React component, which triggers the JSX linting rules. Because of this, ESLint now checks our Markdown content for JSX that may break it. It doesn't stop until the component is closed, which is an issue, since it has to wrap the whole page.

This doesn't seem like a big issue, but it defeats the purpose of using MDX. The point is to be able to mix Markdown and JSX. If you can't do simple things like page layouts and you're forced back into full JSX (when using JSX), it ruins the authoring experience. It discourages the use of JSX since the author will have to format all nested content in JSX or HTML, which is the tedium we sought to escape with MDX.

Thankfully this is simply the linting process, which can be improved. The code works, just fails testing, which isn't a deal breaker for smaller projects.

## Displaying 404 for pages that don't exist

If you use the `getStaticPaths` method in any dynamic pages, NextJS will keep a static map of all your dynamic routes (like blog posts). If a page isn't included in the static path method, a 404 will  be displayed.

If for whatever reason the component doesn't receive the post data it needs to render, like a slug, you can return NextJS' error page:

```js
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

const router = useRouter()
if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
}
```

## Handling emojis and image URLs

MDX supports remark plugins, so you can use plugins like [remark-images](https://github.com/remarkjs/remark-images) and [remark-emoji](https://github.com/rhysd/remark-emoji). 

Images allows you to write image URLs directly (e.g. "http://my.domain.app/image.png") and it converts it to a Markdown friendly image syntax. The emoji plugin allows you to write emojis in the Markdown syntax (e.g. `:dog:` becomes 🐶).

```js
const images = require('remark-images')
const emoji = require('remark-emoji')

const withMDX = require('@next/mdx')({
    extension: /\.mdx?$/,
    options: {
    mdPlugins: [images, emoji]
    }
})
```

# References

- [https://mdxjs.com/getting-started/next](https://mdxjs.com/getting-started/next)
- [https://nextjs.org/docs/advanced-features/static-html-export](https://nextjs.org/docs/advanced-features/static-html-export)
- [https://nextjs.org/docs/advanced-features/custom-app](https://nextjs.org/docs/advanced-features/custom-app)
- [https://github.com/hashicorp/next-mdx-enhanced](https://github.com/hashicorp/next-mdx-enhanced)
    - Plugin that takes MDX to next level with NextJS
        - Allows you to use different layouts
        - Lets you use frontmatter (since by default it doesn't work)
- [https://github.com/zeit/next.js/issues/8857](https://github.com/zeit/next.js/issues/8857)
    - NextJS issue asking for frontmatter support for MDX
    - Points people to [MDX export example](https://mdxjs.com/getting-started#exports)
    - [https://spectrum.chat/mdx/general/how-do-i-read-only-mdx-exports-without-parsing-the-mdx-itself~3c6313de-4943-43c6-9d19-e22395f9df57?m=MTU3NzkwMTQ1NTkzNQ==](https://spectrum.chat/mdx/general/how-do-i-read-only-mdx-exports-without-parsing-the-mdx-itself~3c6313de-4943-43c6-9d19-e22395f9df57?m=MTU3NzkwMTQ1NTkzNQ==)
        - Talks about not being able to load MDX frontmatters/exported metadata from files. Solution? Use [MDX AST](https://mdxjs.com/advanced/ast) - parse MDX into an AST and find the exports inside. LOL
- [https://github.com/IanChen83/next-mdx-frontmatter](https://github.com/IanChen83/next-mdx-frontmatter)
    - Old plugin that provides frontmatter support to MDX
- [Static Site Generation with NextJS by Ben Awad](https://www.youtube.com/watch?v=pY0vWYLDDco)
    - Covers using Node `fs` and NextJS `getStaticPaths` method for querying dynamic page data.
    - Example of doing things manually. Rather than using MDX plugin, manually parses Markdown. Similar to [NextJS official example for Markdown blogs](https://github.com/zeit/next.js/blob/canary/examples/blog-starter/pages/posts/%5Bslug%5D.js).
    - Not good example for MDX, since you shouldn't manually parse it (little more complex than just parsing, needs Webpack bundling for deps and whatnot).
- [https://github.com/zeit/next.js/tree/canary/examples/with-mdx](https://github.com/zeit/next.js/tree/canary/examples/with-mdx)
    - Hyper basic example.
- [https://github.com/mdx-js/mdx/tree/master/examples/next](https://github.com/mdx-js/mdx/tree/master/examples/next)
    - Shows how to pass components using MDXProvider
- [https://github.com/lorenseanstewart/nextjs-mdx-blog-kit](https://github.com/lorenseanstewart/nextjs-mdx-blog-kit)
    - A little old. Bad practices (dev deps in deps).
    - One of the few examples I could find of [querying page/post data](https://github.com/lorenseanstewart/nextjs-mdx-blog-kit/blob/master/utils/blog-engine.js) in [the layout](https://github.com/lorenseanstewart/nextjs-mdx-blog-kit/blob/master/pages/_app.js#L27) (important for things like changing layout based on post type).
- [https://github.com/gregsantos/next-mdx-starter](https://github.com/gregsantos/next-mdx-starter)
    - 2 years old
- [https://github.com/zeit/next.js/blob/canary/examples/with-emotion/pages/index.js](https://github.com/zeit/next.js/blob/canary/examples/with-emotion/pages/index.js)
- [https://chakra-ui.com/getting-started](https://chakra-ui.com/getting-started)
- [https://www.youtube.com/watch?v=zIDpZi-36Qs&list=WL&index=12&t=0s](https://www.youtube.com/watch?v=zIDpZi-36Qs&list=WL&index=12&t=0s)
    - Video tutorial that covers adding Framer Motion to NextJS
- [https://github.com/zeit/next.js/tree/canary/examples/with-typescript](https://github.com/zeit/next.js/tree/canary/examples/with-typescript)
- [https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project](https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project)
    - Guide I used for setting up TS + Linting version
- [https://github.com/typescript-cheatsheets/react-typescript-cheatsheet](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)
- [https://www.typescriptlang.org/docs/handbook/modules.html](https://www.typescriptlang.org/docs/handbook/modules.html)
- [https://github.com/mdx-js/mdx/pull/811/files](https://github.com/mdx-js/mdx/pull/811/files)
    - Pull request in v2 where I found out they had types
- [https://github.com/mdx-js/mdx/blob/v2/packages/react/types/index.d.ts](https://github.com/mdx-js/mdx/blob/v2/packages/react/types/index.d.ts)
    - Types for MDX React in v2
- [https://github.com/zeit/next.js/issues/7515](https://github.com/zeit/next.js/issues/7515)
    - How to properly type `_app.js`
- [https://github.com/mdx-js/eslint-mdx](https://github.com/mdx-js/eslint-mdx)
    - Adds linting support for MDX to ESLint when running `eslint` command
- [https://github.com/mdx-js/vscode-mdx](https://github.com/mdx-js/vscode-mdx)
    - Integrates MDX linting with ESLint in VSCode to show errors in output