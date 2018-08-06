import React from "react"
import PostSummary from "../components/post-summary/post-summary"

import "prismjs/themes/prism-okaidia.css"

const IndexPage = ({ data }) => {
  const { allMarkdownRemark } = data;
  const { edges } = allMarkdownRemark;

  return (
    <div>
      {edges.map((edge, i) =>
        <PostSummary
          key={i}
          title={edge.node.frontmatter.title}
          summary={edge.node.excerpt}
          link={edge.node.frontmatter.slug}
          date={edge.node.frontmatter.date}
        />
      )}
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery($limit: Int = 10) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: $limit, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
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