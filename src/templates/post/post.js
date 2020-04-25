import React from 'react'
import styles from './post.module.scss'
import Layout from '../../layouts/layout'
import PostSeo from '../../components/seo/post-seo'

const Post = ({ data }) => (
  <Layout>
    <PostSeo postPath={data.markdownRemark.frontmatter.slug} postNode={data} postSeo />
    <article>
      <header>
        <h1 className={styles.title}>{data.markdownRemark.frontmatter.title}</h1>
        <time className={styles.publishDate}
              dateTime={data.markdownRemark.frontmatter.date}
              itemProp="datePublished">
          {data.markdownRemark.frontmatter.date}
        </time>
      </header>
      <section dangerouslySetInnerHTML={{ __html: data.markdownRemark.html}} />
    </article>
    <div id="commento" />
  </Layout>
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
        description
      }
    }
  }
`
