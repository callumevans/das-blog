import React from 'react';
import styles from './post.module.scss';

const Post = ({ data }) => (
  <article>
    <h1 className={styles.title}>{data.markdownRemark.frontmatter.title}</h1>
    <time className={styles.publishDate}
          dateTime={data.markdownRemark.frontmatter.date}
          itemProp="datePublished">
      {data.markdownRemark.frontmatter.date}
    </time>
    <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html}} />
  </article>
)

export default Post;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY")
        title
        slug
      }
    }
  }
`