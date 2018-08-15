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
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Arvo|Scope+One' },

            { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
            { rel: 'manifest', href: '/site.webmanifest' },
            { rel: 'mask-icon', href: 'safari-pinned-tab.svg', color: '#454545' },
            { name: 'msapplication-TileColor', content: '#00a300' },
            { name: 'theme-color', content: '#f5f5f5' }
          ]}
          script={[
            { src: 'https://use.fontawesome.com/releases/v5.0.13/js/brands.js', async: true },
            { src: 'https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js', async: true }
          ]}
          meta={[
            { name: 'description', content: SiteConfig.siteDescription }
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