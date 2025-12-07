# Personal Website & Blog

A clean, minimalist personal website and blog inspired by edwarddonner.com, built with static HTML/CSS/JS for optimal SEO and performance.

## 🌟 Features

- **Clean, minimalist design** - Focus on content, not clutter
- **SEO-optimized** - Each blog post is a separate HTML file with proper meta tags
- **Fast loading** - Pure HTML/CSS/JS, no frameworks or build steps
- **Responsive** - Works beautifully on desktop, tablet, and mobile
- **Easy to maintain** - Simple file structure, no dependencies
- **Free hosting ready** - Deploy to GitHub Pages, Netlify, or any static host

## 📁 File Structure

```
personalsite/
├── index.html              # Homepage with intro and about
├── blog.html              # Blog listing page
├── styles.css             # All styles for the site
├── script.js              # JavaScript for interactions
├── LICENSE                # License file
└── blog/                  # Blog posts directory
    ├── _template.html                           # Template for new posts
    ├── _TEMPLATE_GUIDE.md                       # Guide for creating posts
    ├── building-scalable-cloud-solutions-aws.html
    ├── art-of-devops-beyond-buzzwords.html
    ├── dotnet-framework-to-core-migration.html
    └── infrastructure-as-code-cloudformation.html
```

## 🚀 Quick Start

### Viewing Locally

1. Clone or download this repository
2. Open `index.html` in your browser
3. Navigate using the menu (Home, About, Posts)

### Creating a New Blog Post

1. Copy `blog/_template.html` to a new file in the `blog/` folder
2. Name it with URL-friendly format: `my-post-title.html`
3. Fill in all the `[PLACEHOLDERS]` in the template
4. Add your content following the structure
5. Update `blog.html` to include a link to your new post
6. See `blog/_TEMPLATE_GUIDE.md` for detailed instructions

## 🎨 Customization

### Update Your Information

**Homepage (`index.html`):**
- Update the intro paragraphs with your story
- Change social media links in the sidebar
- Update email address

**Blog Listing (`blog.html`):**
- Add/remove blog post entries
- Update sidebar links

**All Pages:**
- Change "Hasham Ahmad" to your name
- Update social media URLs
- Modify the color scheme in `styles.css` (see CSS Variables section)

### Color Scheme

Edit the CSS variables in `styles.css`:

```css
:root {
  --text-primary: #333;
  --text-secondary: #666;
  --link-color: #0066cc;
  --link-hover: #004499;
  --border-color: #ddd;
  --bg-primary: #fff;
  --bg-secondary: #f8f9fa;
  --header-bg: #1a1a1a;
}
```

## 📝 Content Guidelines

### Blog Posts Should Include:

- **SEO meta tags** - Title, description, keywords
- **Compelling title** - Clear and specific (50-60 chars)
- **Meta description** - Concise summary (150-160 chars)
- **Reading time** - Estimated minutes to read
- **Clear structure** - Introduction, sections, key takeaways, conclusion
- **Tags** - 3-5 relevant tags for categorization
- **Personal insights** - Real experiences and examples

### Writing Tips:

- Write conversationally but professionally
- Share real-world examples from your experience
- Include code snippets when relevant
- Keep paragraphs short and scannable
- Use headings to break up content
- End with a call to action or question

## 🌐 Deployment

### GitHub Pages (Free)

1. Push your code to a GitHub repository
2. Go to Settings → Pages
3. Select branch (usually `main`) and root folder
4. Your site will be live at `https://yourusername.github.io/repository-name`

### Netlify (Free)

1. Create account at netlify.com
2. Drag and drop your folder or connect to GitHub
3. Site will be live with auto-deploy on changes
4. Get a free SSL certificate automatically

### Custom Domain

Both GitHub Pages and Netlify support custom domains:
- Add your domain in the settings
- Update DNS records (CNAME or A record)
- SSL/HTTPS is automatic

## 🔧 Technical Details

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with graceful degradation)

### Performance
- No JavaScript frameworks = fast load times
- Minimal CSS (under 10KB)
- Optimized for Core Web Vitals

### SEO Features
- Semantic HTML5 markup
- Proper heading hierarchy
- Meta descriptions for all pages
- Clean URLs (no query parameters)
- Mobile responsive
- Fast loading times

## 📊 Analytics (Optional)

Add Google Analytics or similar by adding the tracking code to all HTML files before the closing `</head>` tag.

## 🤝 Contributing

This is a personal website template, but feel free to:
- Fork it for your own use
- Submit issues if you find bugs
- Suggest improvements

## 📄 License

See the LICENSE file for details.

## 🎯 Best Practices

### When Writing Blog Posts:

1. **Research keywords** - What would people search for?
2. **Write for humans first** - SEO second
3. **Link to related posts** - Keep readers engaged
4. **Update regularly** - Fresh content performs better
5. **Share on social media** - Drive traffic to your posts
6. **Respond to feedback** - Engage with your readers

### Maintenance:

- Review and update old posts periodically
- Fix broken links
- Update outdated information
- Add new posts regularly (aim for 1-2 per month)
- Monitor which posts perform well

## 📧 Contact

- Email: hasham87@gmail.com
- LinkedIn: [hashamahmad](https://www.linkedin.com/in/hashamahmad/)
- GitHub: [hassham](https://github.com/hassham)

---

Built with ❤️ using plain HTML, CSS, and JavaScript. No frameworks, no build tools, just simple, fast, and effective.
