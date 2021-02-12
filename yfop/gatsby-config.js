module.exports = {
  siteMetadata: {
    title: "WWF Youth Leadership Online Academy",
    landing_page: {
      title: 'WWF Youth Leadership Online Academy',
      subtitle: 'Build your online course with open source',
      videoID: 'ts8c0FjkHDk',
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
