import React from 'react'
import Seo from '../components/seo/seo'
import PostSummary from "../components/post-summary/post-summary"

import 'prismjs/themes/prism-okaidia.css'
import Layout from '../layouts/layout'

const IndexPage = ({ data }) => {
  const { allMarkdownRemark } = data;
  const { edges } = allMarkdownRemark;

  return (
    <Layout>
      <Seo />
      {edges.map((edge, i) =>
        <PostSummary
          key={i}
          title={edge.node.frontmatter.title}
          summary={edge.node.excerpt}
          link={edge.node.frontmatter.slug}
          date={edge.node.frontmatter.date}
        />
      )}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery($limit: Int = 10) {
    allMarkdownRemark(limit: $limit, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            slug
          }
        }
      }
    }
  }
`;