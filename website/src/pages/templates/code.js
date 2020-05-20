import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./template-styles.css";

const reactTemplates = [
  {
    link: "https://github.com/whoisryosuke/design-system-jss",
    label: "Design Systems",
    title: "JSS Design System Starter",
  },
  {
    link: "https://github.com/whoisryosuke/stencil-markdown-starter",
    label: "Web Components",
    title: "Stencil Markdown Starter",
  },
  {
    link: "https://github.com/whoisryosuke/next-mdx-boilerplate",
    label: "MDX",
    title: "NextJS MDX Boilerplate",
  },
  {
    link: "https://github.com/whoisryosuke/nextjs-semantic",
    label: "NextJS",
    title: "NextJS + Semantic UI",
  },
  {
    link: "https://github.com/whoisryosuke/nextjs-oauth2-cookie-auth",
    label: "NextJS",
    title: "NextJS OAuth2 with Cookies",
  },
  {
    link: "https://github.com/whoisryosuke/next-mdx-deck",
    label: "NextJS",
    title: "NextJS MDX Deck",
  },
  {
    link: "https://github.com/whoisryosuke/gatsby-documentation-starter",
    label: "GatsbyJS",
    title: "Gatsby Documentation Starter",
  },
  {
    link: "https://github.com/whoisryosuke/semantic-ui-docs-gatsby",
    label: "GatsbyJS",
    title: "Gatsby Semantic UI Documentation",
  },
];

const react3rdTemplates = [
  {
    link: "http://github.com/whoisryosuke",
    label: "Typescript",
    title: "tsdx",
  },
];

function ItemCard({ link, label, title }) {
  return (
    <div class="pagination-nav__item">
      <Link class="pagination-nav__link" to={link}>
        <h5 class="pagination-nav__link--sublabel">{label}</h5>
        <h4 class="pagination-nav__link--label">{title}</h4>
      </Link>
    </div>
  );
}

function PersonalTemplates() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Code Templates - ${siteConfig.title}`}
      description="Templates, starter kits, and boilerplates for JS, PHP, and more"
    >
      <main>
        <section className="container">
          <div className="row margin-vert--md">
            <div className="col">
              <h1 class="margin-vert--lg">Personal Templates</h1>
            </div>
          </div>
          <div className="row margin-vert--md">
            <div className="col">
              <div class="card-container">
                <h2>React Templates</h2>
                <nav class="pagination-nav three">
                  {reactTemplates &&
                    reactTemplates.length &&
                    reactTemplates.map((reactTemplate) => (
                      <ItemCard {...reactTemplate} />
                    ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="row margin-vert--md">
            <div className="col">
              <h1 class="margin-vert--lg">3rd Party Templates</h1>
            </div>
          </div>
          <div className="row margin-vert--md">
            <div className="col">
              <div class="card-container">
                <h2>React Templates</h2>
                <nav class="pagination-nav three">
                  {react3rdTemplates &&
                    react3rdTemplates.map((reactTemplate) => (
                      <ItemCard {...reactTemplate} />
                    ))}
                </nav>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default PersonalTemplates;
