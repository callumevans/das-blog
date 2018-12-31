import React from "react";
import Helmet from "react-helmet";
import SiteConfig from "../../SiteConfig";

class Seo extends React.Component {
  render() {
    const title = SiteConfig.siteTitle;
    const description = SiteConfig.siteDescription;

    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: SiteConfig.siteUrl,
        name: title,
        alternateName: ""
      }
    ];

    return (
      <Helmet>
        <meta name="description" content={description} />

        { /* Schema.org */ }
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        <meta name="description" content={SiteConfig.siteDescription} />
        <meta name="keywords" content={SiteConfig.siteKeywords} />
        <meta name="author" content="Callum Evans" />

        { /* OpenGraph */ }
        <meta name="og:url" content={SiteConfig.siteUrl} />
        <meta name="og:site_name" content={SiteConfig.siteTitle} />
        <meta name="og:type" content="article" />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />

        { /* Twitter Cards */ }
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:account_id" content={SiteConfig.twitterAccountId} />
        <meta name="twitter:creator" content={SiteConfig.twitterCreator} />
        <meta name="twitter:site" content={SiteConfig.twitterCreator} />
      </Helmet>
    )
  }
}

export default Seo;
