require('dotenv').config();

console.log(process.env.GATSBY_ENABLE_AUTH)

module.exports = {
  siteMetadata: {
    title: "Youth For Our Planet",
    landing_page: {
      title: 'Youth For Our Planet',
      subtitle: 'Build your online course with open source',
      videoID: 'jvgEOFKppAM',
    },
  },
  plugins: [
    {
      resolve: `@coursemaker/gatsby-theme-coursemaker`,
      options: {
        useStrapi: false,
      },
    },
  ],
};
