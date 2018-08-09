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
    const image = "https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png";
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
              name: title,
              image
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
        image: {
          "@type": "ImageObject",
          url: image
        },
        description
      }
    ];

    return (
      <Helmet>
        <meta name="description" content={description} />
        {/*<meta name="image" content={image} />*/}

        { /* Schema.org */ }
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        { /* OpenGraph */ }
        <meta property="og:url" content={postSeo ? postUrl : SiteConfig.siteUrl} />
        { postSeo && <meta property="og:type" content="article" /> }
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {/*<meta property="og:image" content={image} />*/}
        { SiteConfig.facebookAppId && <meta property="fb:app_id" content={SiteConfig.facebookAppId} /> }

        { /* Twitter Cards */ }
        <meta name="twitter:card" content="summary_large_image" />
        { SiteConfig.twitterUserId && <meta name="twitter:creator" content={SiteConfig.twitterUserId} /> }
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {/*<meta name="twitter:image" content={image} />*/}
      </Helmet>
    )
  }
}

export default PostSeo;