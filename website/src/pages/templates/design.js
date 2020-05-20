import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import "./template-styles.css";

const sketchTemplates = [
  {
    link: "http://github.com/whoisryosuke",
    label: "Design Systems",
    title: "JSS Design System Starter",
  },
];

const sketch3rdTemplates = [
  {
    link: "http://github.com/whoisryosuke",
    label: "Typescript",
    title: "tsdx",
  },
];

const figmaTemplates = [
  {
    link: "http://github.com/whoisryosuke",
    label: "Design Systems",
    title: "JSS Design System Starter",
  },
];

const figma3rdTemplates = [
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

function DesignTemplates() {
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
                <h2>Figma Templates</h2>
                <nav class="pagination-nav three">
                  {figmaTemplates &&
                    figmaTemplates.length &&
                    figmaTemplates.map((figmaTemplate) => (
                      <ItemCard {...figmaTemplate} />
                    ))}
                </nav>
              </div>
            </div>
          </div>
          <div className="row margin-vert--md">
            <div className="col">
              <div class="card-container">
                <h2>Sketch Templates</h2>
                <nav class="pagination-nav three">
                  {sketchTemplates &&
                    sketchTemplates.length &&
                    sketchTemplates.map((sketchTemplate) => (
                      <ItemCard {...sketchTemplate} />
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
                <h2>Sketch Templates</h2>
                <nav class="pagination-nav three">
                  {sketch3rdTemplates &&
                    sketch3rdTemplates.map((sketchTemplate) => (
                      <ItemCard {...sketchTemplate} />
                    ))}
                </nav>
              </div>
            </div>
          </div>

          <div className="row margin-vert--md">
            <div className="col">
              <div class="card-container">
                <h2>Figma Templates</h2>
                <nav class="pagination-nav three">
                  {figma3rdTemplates &&
                    figma3rdTemplates.map((figmaTemplate) => (
                      <ItemCard {...figmaTemplate} />
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

export default DesignTemplates;
