---
title: "Creating a Brochure from a URL Using an LLM"
slug: creating-brochure-from-url-using-llm
description: "A practical automation pattern combining web extraction, structured prompts and document generation to create a brochure from website content."
category: "Applied AI"
date: 2025-12-14
dateDisplay: "December 14, 2025"
readTime: "12 min read"
published: true
topicTags:
  - "AI"
  - "LLMs"
  - "Automation"
  - "Document generation"
---
<p class="article-note">This is an educational technical note. Example scenarios and figures are illustrative unless explicitly identified as measured production results.</p>
          <p>Ever needed to create a professional brochure from a company's website but dreaded the manual copy-paste process? Large Language Models (LLMs) have made this task remarkably simple. In this guide, I'll show you how to automatically extract website content and generate a polished brochure using AI.</p>

          <h2>Why This Matters</h2>
          
          <p>A common consulting task is quickly understanding a business and creating clear presentation material. Manually browsing websites, extracting key information and formatting brochures is time-consuming. With LLMs, we can:</p>

          <ul>
            <li><strong>Save hours of manual work</strong> - Automate content extraction and formatting</li>
            <li><strong>Ensure consistency</strong> - Use the same structure across all brochures</li>
            <li><strong>Focus on what matters</strong> - Spend time on strategy, not copy-paste</li>
            <li><strong>Generate multiple versions</strong> - Easily create variations for different audiences</li>
          </ul>

          <h2>The Architecture</h2>

          <p>Here's the high-level approach we'll use:</p>

          <ol>
            <li><strong>Fetch website content</strong> - Extract HTML from the URL</li>
            <li><strong>Parse and clean</strong> - Remove scripts, styles, and navigation</li>
            <li><strong>Extract key information</strong> - Use LLM to identify important content</li>
            <li><strong>Generate brochure</strong> - Format into a professional layout</li>
            <li><strong>Export</strong> - Output as PDF, Markdown, or HTML</li>
          </ol>

          <h2>Tools We'll Use</h2>

          <ul>
            <li><strong>Python</strong> - Our programming language</li>
            <li><strong>BeautifulSoup</strong> - HTML parsing and content extraction</li>
            <li><strong>OpenAI API</strong> - GPT-4 for content analysis and generation</li>
            <li><strong>Requests</strong> - HTTP requests to fetch web pages</li>
            <li><strong>Markdown/HTML</strong> - Output formats</li>
          </ul>

          <h2>Step 1: Fetching Website Content</h2>

          <p>First, we need to retrieve the HTML content from the URL:</p>

          <pre><code>import requests
from bs4 import BeautifulSoup

def fetch_website_content(url):
    """Fetch and parse website content."""
    try:
        # Send GET request with headers to mimic a browser
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Remove unwanted elements
        for tag in soup(['script', 'style', 'nav', 'footer', 'header']):
            tag.decompose()
        
        return soup
    
    except requests.RequestException as e:
        print(f"Error fetching URL: {e}")
        return None</code></pre>

          <h3>Key Points:</h3>
          <ul>
            <li><strong>User-Agent header</strong> - Some websites block requests without it</li>
            <li><strong>Timeout</strong> - Prevent hanging on slow websites</li>
            <li><strong>Remove noise</strong> - Strip scripts, styles, and navigation elements</li>
          </ul>

          <h2>Step 2: Extracting Structured Content</h2>

          <p>Now let's extract the meaningful text while preserving structure:</p>

          <pre><code>def extract_structured_content(soup):
    """Extract main content with structure preserved."""
    content = {
        'title': '',
        'headings': [],
        'paragraphs': [],
        'lists': []
    }
    
    # Get page title
    title_tag = soup.find('title')
    content['title'] = title_tag.get_text().strip() if title_tag else ''
    
    # Extract headings
    for heading in soup.find_all(['h1', 'h2', 'h3']):
        content['headings'].append({
            'level': heading.name,
            'text': heading.get_text().strip()
        })
    
    # Extract paragraphs
    for p in soup.find_all('p'):
        text = p.get_text().strip()
        if len(text) > 20:  # Filter out short snippets
            content['paragraphs'].append(text)
    
    # Extract lists
    for ul in soup.find_all(['ul', 'ol']):
        items = [li.get_text().strip() for li in ul.find_all('li')]
        if items:
            content['lists'].append(items)
    
    return content</code></pre>

          <h2>Step 3: Using LLM to Analyze Content</h2>

          <p>Here's where the magic happens. We'll use GPT-4 to understand the website and extract key information:</p>

          <pre><code>import openai
import json

def analyze_with_llm(content, api_key):
    """Use LLM to analyze and extract key information."""
    openai.api_key = api_key
    
    # Prepare the content for analysis
    text_content = f"""
Website Title: {content['title']}

Headings:
{chr(10).join([f"{h['level']}: {h['text']}" for h in content['headings'][:10]])}

Main Content:
{chr(10).join(content['paragraphs'][:15])}
"""
    
    # Create the prompt
    prompt = f"""Analyze this website content and extract key information for a professional brochure.

{text_content}

Please provide the following in JSON format:
1. company_name: The company or website name
2. tagline: A compelling one-line description
3. overview: 2-3 sentence overview of what they do
4. key_features: List of 4-6 main features/services
5. benefits: List of 3-5 key benefits
6. call_to_action: Suggested CTA text

Respond ONLY with valid JSON."""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": "You are a professional marketing analyst who extracts key information from websites."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1000
        )
        
        # Parse the JSON response
        result = json.loads(response.choices[0].message.content)
        return result
        
    except Exception as e:
        print(f"LLM analysis error: {e}")
        return None</code></pre>

          <h3>Why This Approach Works:</h3>
          <ul>
            <li><strong>Structured output</strong> - JSON makes it easy to work with the results</li>
            <li><strong>Low temperature</strong> - More deterministic, factual responses</li>
            <li><strong>Clear instructions</strong> - Specific format requirements</li>
            <li><strong>Token limits</strong> - Prevents excessive costs</li>
          </ul>

          <h2>Step 4: Generating the Brochure</h2>

          <p>Now let's create a beautifully formatted brochure:</p>

          <pre><code>def generate_brochure_markdown(analysis):
    """Generate a professional brochure in Markdown format."""
    
    brochure = f"""# {analysis['company_name']}

## {analysis['tagline']}

---

## About Us

{analysis['overview']}

---

## What We Offer

"""
    
    # Add key features
    for i, feature in enumerate(analysis['key_features'], 1):
        brochure += f"{i}. **{feature}**\n"
    
    brochure += "\n---\n\n## Why Choose Us?\n\n"
    
    # Add benefits
    for benefit in analysis['benefits']:
        brochure += f"✓ {benefit}\n"
    
    brochure += f"\n---\n\n## {analysis['call_to_action']}\n"
    
    return brochure</code></pre>

          <h2>Step 5: Complete Working Example</h2>

          <p>Here's the complete script that ties everything together:</p>

          <pre><code>#!/usr/bin/env python3
"""
Brochure Generator from URL using LLM
"""

import requests
from bs4 import BeautifulSoup
import openai
import json
import sys

class BrochureGenerator:
    def __init__(self, api_key):
        self.api_key = api_key
        openai.api_key = api_key
    
    def generate(self, url):
        """Main method to generate brochure from URL."""
        print(f"Fetching content from {url}...")
        soup = self.fetch_website(url)
        
        if not soup:
            return None
        
        print("Extracting structured content...")
        content = self.extract_content(soup)
        
        print("Analyzing with LLM...")
        analysis = self.analyze_with_llm(content)
        
        if not analysis:
            return None
        
        print("Generating brochure...")
        brochure = self.generate_markdown(analysis)
        
        return brochure
    
    def fetch_website(self, url):
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
            response = requests.get(url, headers=headers, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.text, 'html.parser')
            
            for tag in soup(['script', 'style', 'nav', 'footer']):
                tag.decompose()
            
            return soup
        except Exception as e:
            print(f"Error: {e}")
            return None
    
    def extract_content(self, soup):
        # Implementation from earlier
        pass
    
    def analyze_with_llm(self, content):
        # Implementation from earlier
        pass
    
    def generate_markdown(self, analysis):
        # Implementation from earlier
        pass

# Usage
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python brochure_generator.py <url>")
        sys.exit(1)
    
    url = sys.argv[1]
    api_key = "your-openai-api-key"  # Or use environment variable
    
    generator = BrochureGenerator(api_key)
    brochure = generator.generate(url)
    
    if brochure:
        # Save to file
        filename = "brochure.md"
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(brochure)
        print(f"Brochure saved to {filename}")
    else:
        print("Failed to generate brochure")</code></pre>

          <h2>Real-World Example</h2>

          <p>Let's say we run this on a SaaS company's website:</p>

          <pre><code>python brochure_generator.py https://example-saas.com</code></pre>

          <p>Output brochure.md:</p>

          <pre><code># CloudMaster Analytics

## Transform Your Data Into Actionable Insights

---

## About Us

CloudMaster Analytics is a leading cloud-based analytics platform that helps 
businesses make data-driven decisions. We combine powerful data visualization 
with AI-powered insights to turn complex datasets into clear, actionable intelligence.

---

## What We Offer

1. **Real-time Dashboard Analytics**
2. **AI-Powered Predictive Models**
3. **Custom Report Builder**
4. **Multi-source Data Integration**
5. **Collaborative Workspace**
6. **Enterprise-grade Security**

---

## Why Choose Us?

✓ 99.9% uptime guarantee with 24/7 support
✓ Seamless integration with 100+ data sources
✓ Advanced AI that learns from your data patterns
✓ GDPR and SOC 2 compliant
✓ Trusted by 10,000+ businesses worldwide

---

## Start Your Free 14-Day Trial Today!</code></pre>

          <h2>Advanced Enhancements</h2>

          <h3>1. Add PDF Export</h3>

          <pre><code>from markdown2 import markdown
from weasyprint import HTML

def export_to_pdf(markdown_content, output_file):
    """Convert Markdown to PDF."""
    html_content = markdown(markdown_content)
    
    # Add some CSS styling
    styled_html = f"""
    &lt;html&gt;
    &lt;head&gt;
        &lt;style&gt;
            body {{ font-family: Arial, sans-serif; margin: 40px; }}
            h1 {{ color: #2c3e50; }}
            h2 {{ color: #3498db; border-bottom: 2px solid #3498db; }}
        &lt;/style&gt;
    &lt;/head&gt;
    &lt;body&gt;
        {html_content}
    &lt;/body&gt;
    &lt;/html&gt;
    """
    
    HTML(string=styled_html).write_pdf(output_file)</code></pre>

          <h3>2. Add Image Extraction</h3>

          <pre><code>def extract_images(soup, url):
    """Extract main images from the website."""
    images = []
    
    for img in soup.find_all('img'):
        src = img.get('src')
        alt = img.get('alt', '')
        
        if src:
            # Handle relative URLs
            if not src.startswith('http'):
                from urllib.parse import urljoin
                src = urljoin(url, src)
            
            images.append({'url': src, 'alt': alt})
    
    return images[:3]  # Get top 3 images</code></pre>

          <h3>3. Multi-page Crawling</h3>

          <pre><code>def crawl_multiple_pages(base_url, max_pages=5):
    """Crawl multiple pages for comprehensive content."""
    visited = set()
    to_visit = [base_url]
    all_content = []
    
    while to_visit and len(visited) < max_pages:
        url = to_visit.pop(0)
        
        if url in visited:
            continue
        
        visited.add(url)
        soup = fetch_website(url)
        
        if soup:
            all_content.append(extract_content(soup))
            
            # Find internal links
            for link in soup.find_all('a', href=True):
                href = link['href']
                if href.startswith('/'):
                    full_url = base_url + href
                    if full_url not in visited:
                        to_visit.append(full_url)
    
    return all_content</code></pre>

          <h2>Best Practices & Tips</h2>

          <h3>1. Handle Rate Limits</h3>
          <ul>
            <li>Add delays between requests</li>
            <li>Respect robots.txt</li>
            <li>Cache API responses to avoid repeated calls</li>
            <li>Use environment variables for API keys</li>
          </ul>

          <h3>2. Error Handling</h3>
          <ul>
            <li>Validate URLs before processing</li>
            <li>Handle timeouts gracefully</li>
            <li>Provide fallback content if LLM fails</li>
            <li>Log errors for debugging</li>
          </ul>

          <h3>3. Cost Optimization</h3>
          <ul>
            <li>Limit token usage by summarizing content first</li>
            <li>Use GPT-3.5-turbo for initial analysis, GPT-4 for final polish</li>
            <li>Cache results for frequently accessed URLs</li>
            <li>Implement retry logic with exponential backoff</li>
          </ul>

          <h3>4. Quality Improvements</h3>
          <ul>
            <li>Add human review step before finalizing</li>
            <li>Use few-shot examples in prompts for better results</li>
            <li>Implement content validation rules</li>
            <li>Allow manual override of extracted information</li>
          </ul>

          <h2>Use Cases</h2>

          <p>This technique is incredibly versatile:</p>

          <ul>
            <li><strong>Sales teams</strong> - Quickly create prospect briefs</li>
            <li><strong>Marketing agencies</strong> - Generate client presentations</li>
            <li><strong>Consultants</strong> - Research and summarize competitor offerings</li>
            <li><strong>Product teams</strong> - Analyze feature sets of competitors</li>
            <li><strong>Recruiters</strong> - Understand company culture and benefits</li>
          </ul>

          <h2>Limitations & Considerations</h2>

          <h3>Technical Limitations:</h3>
          <ul>
            <li><strong>JavaScript-rendered content</strong> - May need Selenium/Playwright</li>
            <li><strong>Authentication required</strong> - Can't access logged-in content</li>
            <li><strong>Dynamic content</strong> - APIs or AJAX-loaded data might be missed</li>
            <li><strong>Token limits</strong> - Large websites may exceed context window</li>
          </ul>

          <h3>Ethical Considerations:</h3>
          <ul>
            <li>Respect copyright and terms of service</li>
            <li>Don't scrape excessively or cause server load</li>
            <li>Always attribute content to original source</li>
            <li>Use for internal research, not republishing</li>
          </ul>

          <h2>Future Enhancements</h2>

          <p>Potential improvements for this system:</p>

          <ol>
            <li><strong>Multi-language support</strong> - Translate brochures automatically</li>
            <li><strong>Brand customization</strong> - Apply company colors and logos</li>
            <li><strong>Template variations</strong> - Different layouts for different industries</li>
            <li><strong>Competitive analysis</strong> - Compare multiple competitors side-by-side</li>
            <li><strong>Auto-updating</strong> - Regenerate when website changes</li>
            <li><strong>Integration</strong> - Connect with CRM or marketing tools</li>
          </ol>

          <h2>Key Takeaways</h2>

          <ul>
            <li>LLMs can dramatically accelerate content creation workflows</li>
            <li>Combining web scraping with AI produces powerful automation</li>
            <li>Structured prompts yield consistent, usable results</li>
            <li>Start simple, then add sophistication based on needs</li>
            <li>Always include human oversight for quality control</li>
            <li>Be mindful of costs, rate limits, and ethical considerations</li>
          </ul>

          <h2>Conclusion</h2>

          <p>Automating brochure creation from URLs using LLMs is a game-changer for anyone who regularly needs to understand and present information about businesses. What used to take hours of manual work now takes minutes, and the results are often better than what you'd create manually.</p>

          <p>The key is combining the right tools—web scraping for data collection, LLMs for intelligent analysis, and good old-fashioned programming for orchestration. Start with the basic implementation I've shown here, then customize it for your specific needs.</p>

          <p>Variations of this pattern can support competitive analysis, onboarding material and other repeatable content workflows. Treat generated material as a first draft and keep a human review step before publication.</p>

          <p>Have you automated content creation with LLMs? What challenges did you face? <a href="https://www.linkedin.com/in/hashamahmad/" target="_blank" rel="noopener noreferrer">Let's connect and share experiences!</a></p>

