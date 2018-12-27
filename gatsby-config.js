const SiteConfig = require('./src/SiteConfig')

module.exports = {
  siteMetadata: {
    siteUrl: SiteConfig.siteUrl,
    title: SiteConfig.siteTitle
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-twitter',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: SiteConfig.googleTrackingId,
        head: true,
        anonymize: true,
        respectDNT: true
      },
    },
    {
        resolve: `gatsby-plugin-canonical-urls`,
        options: {
            siteUrl: SiteConfig.siteUrl,
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
