import React from 'react';
import styles from './social-icons.module.scss';

const SocialIcons = () => (
  <section className={styles.socialIcons}>
<a href="https://www.facebook.com/callumevans.1992" className={styles.facebook}>
    <i className="fab fa-facebook-f" />
</a>

<a href="https://twitter.com/callum_evans" className={styles.twitter}>
    <i className="fab fa-twitter" />
    </a>

<a href="https://github.com/callumevans" className={styles.github}>
    <i className="fab fa-github-alt" />
</a>

<a href="https://www.linkedin.com/in/callum-evans-2a5420b7" className={styles.linkedin}>
    <i className="fab fa-linkedin-in" />
    </a>

<a href="https://stackoverflow.com/users/2850457/callum-evans" className={styles.stackoverflow}>
    <i className="fab fa-stack-overflow" />
</a>
</section>
);

export default SocialIcons;
