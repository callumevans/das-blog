import React from "react";
import Helmet from "react-helmet";
import SiteConfig from "../../SiteConfig";

class PostSeo extends React.Component {
  render() {
    const {
      postNode,
      postPath
    } = this.props;

    const postMeta = postNode.markdownRemark.frontmatter;

    const title = postMeta.title;
    const description = postMeta.description;
    const postUrl = `${SiteConfig.siteUrl}/${postPath}`;

    return (
      <Helmet>
        <title>{`${title} - ${SiteConfig.siteTitle}`}</title>

        <meta name="description" content={description} />

        { /* OpenGraph */ }
        <meta name="og:url" content={postUrl} />
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

export default PostSeo;
