module.exports = function (eleventyConfig) {
  [
    "styles.css",
    "personal.css",
    "script.js",
    "profile.png",
    "robots.txt",
    "media"
  ].forEach((path) => eleventyConfig.addPassthroughCopy(path));

  eleventyConfig.addCollection("publishedPosts", (collectionApi) =>
    collectionApi
      .getFilteredByTag("posts")
      .filter((item) => item.data.published !== false)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addCollection("workItems", (collectionApi) =>
    collectionApi
      .getFilteredByTag("work")
      .filter((item) => item.data.published !== false)
      .sort((a, b) => (a.data.order || 99) - (b.data.order || 99))
  );

  eleventyConfig.ignores.add("README.md");
  eleventyConfig.ignores.add("QUICK_START.md");
  eleventyConfig.ignores.add("SEO_GUIDE.md");
  eleventyConfig.ignores.add("SITEMAP_INSTRUCTIONS.md");
  eleventyConfig.ignores.add("CMS_GUIDE.md");
  eleventyConfig.ignores.add("blog/_TEMPLATE_GUIDE.md");
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("_site/**");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: false
  };
};
