module.exports = {
  layout: "layouts/article.njk",
  tags: ["posts"],
  eleventyComputed: {
    permalink: (data) => `blog/${data.slug}.html`
  }
};
