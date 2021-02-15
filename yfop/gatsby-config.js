module.exports = {
  siteMetadata: {
    title: "WWF Youth Leadership Online Academy",
    landing_page: {
      title: 'WWF Youth Leadership Online Academy',
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
