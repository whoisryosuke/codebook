import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import "./template-styles.css";

const templatePages = [
  {
    link: 'templates/code',
    label: 'Frontend / Backend / Design Ops',
    title: 'Code Templates',
  },
  {
    link: 'templates/design',
    label: 'Sketch / Figma / XD',
    title: 'Design Templates',
  }
]

function ItemCard({link, label, title}) {
  return (
    <div class="pagination-nav__item"><Link class="pagination-nav__link" to={link}><h5 class="pagination-nav__link--sublabel">{label}</h5><h4 class="pagination-nav__link--label">{title}</h4></Link></div>
  );
}

function TemplateIndex() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Templates - ${siteConfig.title}`}
      description="Templates, starter kits, and boilerplates for code and design">
      <main>
        <section className="container">
          <div className="row">
            <h1 class="margin-vert--lg">Templates Pages</h1>
            <div class="card-container">
              <nav class="pagination-nav">
                {
                  templatePages && templatePages.length && templatePages.map(templatePage => <ItemCard {...templatePage} />)
                }
              </nav>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default TemplateIndex;
