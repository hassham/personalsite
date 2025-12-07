# Blog Post Template Guide

## How to Create a New Blog Post

### 1. Copy the Template
Copy `_template.html` to a new file in the `blog/` directory with a URL-friendly name:
```
blog/your-post-title-here.html
```

**Naming convention:** Use lowercase, hyphens between words, no special characters.
Examples:
- `getting-started-with-kubernetes.html`
- `five-tips-for-better-code-reviews.html`

### 2. Fill in the Template

Replace all placeholders marked with `[BRACKETS]`:

#### In the `<head>` section:
- `[POST TITLE]` - Your blog post title
- `[Brief description for SEO]` - 150-160 characters describing the post
- `[keyword1, keyword2, keyword3]` - Comma-separated keywords for SEO

#### In the post header:
- `[Month Day, Year]` - Publication date (e.g., "December 7, 2025")
- `[X] min read` - Estimated reading time (e.g., "5 min read")
- `[POST TITLE]` - Same as above

#### In the post content:
Replace all section placeholders with your actual content. Use the existing structure as a guide.

#### In the footer:
- `[Tag1]`, `[Tag2]`, `[Tag3]` - 3-5 relevant tags for the post

### 3. Update blog.html

Add a new entry to `blog.html` in the posts section:

```html
<article class="post-card">
  <p class="post-meta">[Date]</p>
  <h2 class="post-title"><a href="blog/your-post-title-here.html">[Title]</a></h2>
  <p class="post-excerpt">[Excerpt - 2-3 sentences summarizing the post]</p>
  <a href="blog/your-post-title-here.html" class="read-more">Read more →</a>
</article>
```

**Important:** Add new posts at the TOP of the list (most recent first).

### 4. Update Related Posts

In other blog posts' sidebars, consider adding a link to your new post in the "More Posts" section.

## Content Guidelines

### Writing Style
- **Conversational but professional** - Write like you're explaining to a colleague
- **Personal experience** - Share real examples from your work
- **Actionable insights** - Give readers something they can use
- **Clear structure** - Use headings to break up content

### Post Length
- **Short posts:** 800-1,200 words (3-5 min read)
- **Medium posts:** 1,500-2,500 words (6-10 min read)
- **Long posts:** 2,500+ words (10+ min read)

### SEO Best Practices
1. **Title:** 50-60 characters, include main keyword
2. **Meta description:** 150-160 characters, compelling summary
3. **Headings:** Use H2 for main sections, H3 for subsections
4. **Keywords:** Use naturally, don't stuff
5. **Links:** Link to relevant internal posts and authoritative external sources
6. **Images:** Use descriptive alt text (when you add images)

### Structure Template

**Introduction** (1-2 paragraphs)
- Hook the reader
- State what the post is about
- Explain why it matters

**Main Content** (3-5 major sections)
- Each section should have a clear H2 heading
- Use subsections (H3) to break down complex topics
- Include examples, code snippets, or real-world scenarios

**Key Takeaways** (bullet points)
- 3-7 main points readers should remember
- Keep them actionable and specific

**Conclusion** (1-2 paragraphs)
- Summarize the main points
- Call to action (connect on LinkedIn, try something, share experiences)

## Code Examples

Use the `<pre><code>` tags for code blocks:

```html
<pre><code>const example = "formatted code";
console.log(example);</code></pre>
```

For inline code, use `<code>`:
```html
Use the <code>git commit</code> command to save changes.
```

## Publishing Checklist

Before publishing your post, make sure:

- [ ] All `[PLACEHOLDERS]` are replaced
- [ ] Title is compelling and SEO-friendly
- [ ] Meta description is 150-160 characters
- [ ] Reading time is estimated
- [ ] All links work (test them!)
- [ ] Code examples are properly formatted
- [ ] Tags are relevant
- [ ] Post is added to blog.html
- [ ] Spelling and grammar checked
- [ ] Headings are in logical order (H2, H3, not skipping levels)

## File Organization

```
personalsite/
├── index.html           # Homepage
├── blog.html           # Blog listing page
├── styles.css          # All styles
├── script.js           # JavaScript
└── blog/               # Blog posts directory
    ├── _template.html  # THIS TEMPLATE
    ├── _TEMPLATE_GUIDE.md  # This guide
    ├── post-1.html
    ├── post-2.html
    └── ...
```

## Tips for Success

1. **Write regularly** - Consistency matters more than perfection
2. **Share personal experiences** - Readers connect with real stories
3. **Be specific** - "How to optimize Lambda functions" beats "Cloud tips"
4. **Include examples** - Show, don't just tell
5. **Engage readers** - Ask questions, encourage comments/connections
6. **Proofread** - Use Grammarly or similar tools
7. **Update old posts** - Keep content fresh and relevant

## Need Help?

- Look at existing posts for examples
- Keep the conversational, technical style
- Don't overthink it—just start writing!

Happy blogging! 🚀
