---
name: article-extractor
description: Extracts full article text and metadata from web pages for reading, archiving, or analysis.
---

# Article Extractor

## When to Use This Skill
Activate when the user:
- Provides an article/blog URL and wants the text content.
- Asks to "download this article".
- Wants to "extract the content from [URL]".
- Asks to "save this blog post as text".
- Needs clean article text without distractions.

## How It Works

### Priority Order:
1. **Check if tools are installed** (reader or trafilatura).
2. **Download and extract article** using best available tool.
3. **Clean up the content** (remove extra whitespace, format properly).
4. **Save to file** with article title as filename.
5. **Confirm location** and show preview.

## Extraction Methods

### Method 1: Using reader (Best for most articles)
```bash
# Extract article
reader "URL" > article.txt
```

### Method 2: Using trafilatura (Best for blogs/news)
```bash
# Extract article
trafilatura --URL "URL" --output-format txt > article.txt
```

### Method 3: Fallback (Basic parsing)
If technical tools are missing, use a custom parsing script to extract text from raw HTML, skipping common clutter tags like `<script>`, `<style>`, `<nav>`, `<header>`, and `<footer>`.

## Filename Creation
Clean title for filesystem:
1. Get the title from the website or first heading.
2. Remove special characters and limit length (max 100 chars).
3. Save as `.txt`.

## Output Format
### Saved File Contains:
- Article title (if available)
- Author (if available)
- Main article text
- Section headings

### What Gets Removed:
- Navigation menus
- Ads and promotional content
- Newsletter signup forms
- Related articles sidebars
- Social media buttons
- Cookie notices
