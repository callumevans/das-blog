import React from 'react';
import styles from './headshot.module.scss';
import headshot from '../../assets/headshot.png';

const Headshot = () => (
  <img src={headshot} className={styles.headshot} alt="Callum Evans" />
);

export default Headshot;
