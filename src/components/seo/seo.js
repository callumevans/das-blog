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

        { /* OpenGraph */ }
        <meta property="og:url" content={SiteConfig.siteUrl} />
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

export default Seo;