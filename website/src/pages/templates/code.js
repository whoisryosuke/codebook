import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import "./template-styles.css";

const reactTemplates = [
  {
    link: 'http://github.com/whoisryosuke',
    label: 'Design Systems',
    title: 'JSS Design System Starter',
  }
]

const react3rdTemplates = [
  {
    link: 'http://github.com/whoisryosuke',
    label: 'Typescript',
    title: 'tsdx',
  }
]

function ItemCard({link, label, title}) {
  return (
    <div class="pagination-nav__item"><Link class="pagination-nav__link" to={link}><h5 class="pagination-nav__link--sublabel">{label}</h5><h4 class="pagination-nav__link--label">{title}</h4></Link></div>
  );
}

function PersonalTemplates() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Code Templates - ${siteConfig.title}`}
      description="Templates, starter kits, and boilerplates for JS, PHP, and more">
      <main>
        <section className="container">
          <div className="row">
            <h1 class="margin-vert--lg">Personal Templates</h1>
            <div class="card-container">
              <h2>React Templates</h2>
              <nav class="pagination-nav">
                {
                  reactTemplates && reactTemplates.length && reactTemplates.map(reactTemplate => <ItemCard {...reactTemplate} />)
                }
              </nav>
            </div>
          </div>
          <div className="row">
            <h1 class="margin-vert--lg">3rd Party Templates</h1>
            <div class="card-container">
              <h2>React Templates</h2>
              <nav class="pagination-nav">
                {
                  react3rdTemplates && react3rdTemplates.map(reactTemplate => <ItemCard {...reactTemplate} />)
                }
              </nav>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default PersonalTemplates;
