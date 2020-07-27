import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

const features = [
  {
    title: <>For non React developers</>,
    imageUrl: "img/undraw_docusaurus_mountain.svg",
    description: (
      <>
        next-mathdoc is designed to be handled by LaTeX users who are not
        familiar with React. Normally, you don&apos;t need to be aware of React.
        On the other hand, it&apos;s also very familiar to developers.
      </>
    ),
  },
  {
    title: <>Pluggable</>,
    imageUrl: "img/undraw_docusaurus_tree.svg",
    description: (
      <>
        next-mathdoc is based on a plugin system. Users can add plug-ins with
        just a few lines and developers can easily extend it.
      </>
    ),
  },
  {
    title: <>Tremendously Typed</>,
    imageUrl: "img/undraw_docusaurus_react.svg",
    description: (
      <>
        next-mathdoc is written in TypeScript, typed tremendously. Usually you
        need not to write any type-assertion.
      </>
    ),
  },
];

const Feature = ({ imageUrl, title, description }) => {
  const imgUrl = useBaseUrl(imageUrl);

  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const Home = () => {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("docs/")}
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
};

export default Home;
