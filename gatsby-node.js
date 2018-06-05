const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const blogPost = path.resolve('./src/components/post/post.js');

  return new Promise((resolve, reject) => {
    resolve(
      graphql(`
        {
          allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
            edges {
              node {
                frontmatter {
                  title
                  slug
                }
              }
            }
          }
        }
      `).then(result => {

        if (result.errors) {
          console.error(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        posts.map((post, i) => {
          const previous = i === posts.length - 1 ? null : posts[i + 1].node;
          const next = i === 0 ? null : posts[i - 1].node;
          const slug = post.node.frontmatter.slug;

          createPage({
            path: post.node.frontmatter.slug,
            component: blogPost,
            context: {
              slug: slug,
              previous,
              next
            }
          });
        });
    }))
  })
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === 'MarkdownRemark') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      name: 'slug',
      node,
      value
    });
  }
}