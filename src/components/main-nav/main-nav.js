import React from 'react'
import Link from 'gatsby-link'
import styles from './main-nav.module.scss';

const MainNav = () => (
  <nav className={styles.nav}>
    <Link to="/">Home</Link>
  </nav>
);

export default MainNav;