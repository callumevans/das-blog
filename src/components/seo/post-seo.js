import React from "react";
import Helmet from "react-helmet";
import SiteConfig from "../../SiteConfig";

class PostSeo extends React.Component {
  render() {
    const {
      postSeo,
      postNode,
      postPath
    } = this.props;

    const postMeta = postNode.markdownRemark.frontmatter;

    const title = postMeta.title;
    const description = postMeta.description;
    const postUrl = `${SiteConfig.siteUrl}/${postPath}`;

    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: SiteConfig.siteUrl,
        name: title,
        alternateName: ""
      },
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": postUrl,
              name: title
            }
          }
        ]
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: SiteConfig.siteUrl,
        name: title,
        alternateName: "",
        headline: title,
        description
      }
    ];

    return (
      <Helmet>
        <title>{`${title} - ${SiteConfig.siteTitle}`}</title>
        <meta name="description" content={description} />

        { /* Schema.org */ }
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        { /* OpenGraph */ }
        <meta property="og:url" content={postSeo ? postUrl : SiteConfig.siteUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        { SiteConfig.facebookAppId && <meta property="fb:app_id" content={SiteConfig.facebookAppId} /> }

        { /* Twitter Cards */ }
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        { SiteConfig.twitterUserId && <meta name="twitter:creator" content={SiteConfig.twitterUserId} /> }
      </Helmet>
    )
  }
}

export default PostSeo;