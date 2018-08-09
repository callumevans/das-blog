import React from 'react';
import Helmet from "react-helmet";

import styles from './layout.module.scss';

import Headshot from '../components/headshot/headshot';
import SocialIcons from '../components/social-icons/social-icons';
import MainNav from '../components/main-nav/main-nav';
import SiteConfig from '../SiteConfig'

class Layout extends React.Component {
  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        <Helmet
          title={SiteConfig.siteTitle}
          link={[
            { rel: 'stylesheet', href: "https://fonts.googleapis.com/css?family=Arvo|Scope+One" }
          ]}
          script={[
            { src: "https://use.fontawesome.com/releases/v5.0.13/js/brands.js" },
            { src: "https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" }
          ]}
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />

        <div className={styles.mainContainer}>
          <div className={styles.headshotContainer}>
            <Headshot />
          </div>

          <div className={styles.socialIconsContainer}>
            <SocialIcons />
          </div>

          <div className={styles.navMenuContainer}>
            <MainNav />
          </div>

          <main className={styles.contentContainer}>
            {children}
          </main>
        </div>
      </div>
    )
  }
}

export default Layout;