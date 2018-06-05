import React from 'react';
import Link from 'gatsby-link';
import styles from './post-summary.module.scss';

const PostSummary = ({ title, summary, link, date }) => (
  <article>
    <Link to={link} className={styles.summaryLink}>
      <h1 className={styles.title}>{title}</h1>
      <time className={styles.publishDate}
            dateTime={date}
            itemProp="datePublished">
        {date}
      </time>
      <section className={styles.summary}>
        <p>{summary}</p>
      </section>
      <span className={styles.readMore}>Read more...</span>
    </Link>
  </article>

);

export default PostSummary;