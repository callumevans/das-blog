const SiteConfig = require('./src/SiteConfig')

module.exports = {
  siteMetadata: {
    siteUrl: 'https://callums.blog',
    title: 'Callum\'s Blog'
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: SiteConfig.googleTrackingId,
        head: true,
        anonymize: true,
        respectDNT: true
      },
    },
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts'
      }
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              inlineCodeMarker: '›'
            }
          }
        ]
      }
    }
  ]
}
