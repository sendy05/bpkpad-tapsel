# Image Assets Guide - BPKPAD Website

## Required Images for Homepage

### Hero Carousel Images
Location: `/public/images/`

1. **hero-1.jpg** (1920x800px recommended)
   - Subject: BPKPAD office building or professional meeting
   - Alt text: "Kantor BPKPAD Kabupaten Tapanuli Selatan"
   - Usage: First hero slide - Transparency & Accountability

2. **hero-2.jpg** (1920x800px recommended)
   - Subject: Tax service counter or digital payment system
   - Alt text: "Layanan Pajak Daerah BPKPAD"
   - Usage: Second hero slide - Tax Services

3. **hero-3.jpg** (1920x800px recommended)
   - Subject: Regional assets or public infrastructure
   - Alt text: "Pengelolaan Aset Daerah"
   - Usage: Third hero slide - Asset Management

### News Thumbnails
Location: `/public/images/news/`

Format: `news-[id].jpg` or `news-thumbnail-[date].jpg`
Dimensions: 400x300px (4:3 aspect ratio)
Examples:
- `news-001.jpg` - First news article
- `news-002.jpg` - Second news article
- `default-news.jpg` - Fallback for articles without images

### Logo & Branding
Location: `/public/images/`

1. **logo-bpkpad.png** (500x500px, transparent background)
   - Main organization logo
   - Usage: Navbar, footer, official documents

2. **logo-pemda-tapsel.png** (500x500px, transparent background)
   - Regional government logo
   - Usage: Footer, partnership section

### Icon Assets
Location: `/public/images/icons/`

SVG format preferred for scalability:
- `icon-pajak.svg` - Tax icon
- `icon-retribusi.svg` - Retribution icon
- `icon-aset.svg` - Asset icon
- `icon-pengaduan.svg` - Complaint icon

## Temporary Placeholder Solution

Until actual images are available, you can use:

### 1. Placeholder Services
Add to next.config.mjs:
```javascript
images: {
    domains: [
        'placehold.co',
        'via.placeholder.com',
        'images.unsplash.com'
    ],
}
```

### 2. Unsplash (Free High-Quality Images)
Categories for BPKPAD:
- Government buildings: `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop`
- Office meeting: `https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=800&fit=crop`
- Tax/finance: `https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=800&fit=crop`

### 3. Generate Solid Color Placeholders
For development, use gradient backgrounds:
```jsx
<div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-600" />
```

## Image Optimization Settings

### Next.js Image Component
Already configured in next.config.mjs:
- AVIF format (best compression)
- WebP fallback (wide support)
- Lazy loading enabled
- Responsive sizing automatic

### Usage Example:
```jsx
import Image from 'next/image';

<Image
    src="/images/hero-1.jpg"
    alt="Kantor BPKPAD"
    width={1920}
    height={800}
    priority // For above-the-fold images
    className="object-cover"
/>
```

## Recommended Image Sizes

### Hero Images
- Desktop: 1920x800px (2.4:1 ratio)
- Tablet: 1200x600px
- Mobile: 800x600px

### News Cards
- Thumbnail: 400x300px (4:3 ratio)
- Feature: 800x600px
- List view: 200x150px

### Gallery Images
- Grid: 600x600px (1:1 ratio)
- Lightbox: 1200x1200px max

### Profile Photos
- Staff: 400x400px (1:1 ratio, circular crop)
- Leadership: 800x800px

## File Naming Convention

Use kebab-case with descriptive names:
```
✅ Good:
- hero-kantor-bpkpad.jpg
- berita-pendapatan-2024.jpg
- agenda-rapat-koordinasi.jpg
- pegawai-john-doe.jpg

❌ Avoid:
- IMG_1234.jpg
- photo.jpg
- image (1).jpg
- Untitled.png
```

## File Format Guidelines

### Photos/Complex Images
- JPEG (.jpg) - General use
- WebP (.webp) - Modern browsers
- AVIF (.avif) - Best compression

### Graphics/Icons
- SVG (.svg) - Logos, icons (preferred)
- PNG (.png) - Transparency needed
- WebP (.webp) - Modern browsers

### Maximum File Sizes
- Hero images: < 500 KB
- News thumbnails: < 200 KB
- Icons: < 50 KB
- Logos: < 100 KB

## Image Compression Tools

### Online Tools
1. **TinyPNG** - https://tinypng.com/
   - Excellent JPEG/PNG compression
   - Maintains quality

2. **Squoosh** - https://squoosh.app/
   - Google's image optimizer
   - Multiple format support

3. **Compressor.io** - https://compressor.io/
   - Fast batch processing

### Command Line
```bash
# Install ImageMagick
npm install -g imagemagick

# Resize and optimize
convert input.jpg -resize 1920x800^ -quality 85 output.jpg

# Batch process
mogrify -path output/ -resize 1920x800^ -quality 85 *.jpg
```

## Accessibility Requirements

### Alt Text Guidelines
1. **Descriptive** - Explain what's in the image
   ```jsx
   alt="Kepala BPKPAD menerima penghargaan dari Gubernur"
   ```

2. **Concise** - Keep under 125 characters
   ```jsx
   alt="Tim BPKPAD pada rapat koordinasi keuangan daerah"
   ```

3. **Context-aware** - Match surrounding content
   ```jsx
   alt="Grafik pertumbuhan PAD Tapanuli Selatan 2020-2024"
   ```

### Decorative Images
Use empty alt for purely decorative images:
```jsx
<Image src="/decorative-pattern.svg" alt="" aria-hidden="true" />
```

## SEO Best Practices

1. **File names** - Use descriptive, keyword-rich names
   - ✅ `pajak-daerah-tapanuli-selatan.jpg`
   - ❌ `IMG_001.jpg`

2. **Alt text** - Include relevant keywords naturally
   - ✅ `alt="Layanan pajak online BPKPAD Tapanuli Selatan"`

3. **Structured data** - Add image schema
   ```json
   {
     "@type": "ImageObject",
     "url": "https://bpkpad-tapsel.go.id/images/hero-1.jpg",
     "width": 1920,
     "height": 800,
     "caption": "Kantor BPKPAD Kabupaten Tapanuli Selatan"
   }
   ```

## Quick Setup Checklist

- [ ] Create `/public/images/` directory
- [ ] Create `/public/images/news/` subdirectory
- [ ] Create `/public/images/icons/` subdirectory
- [ ] Add hero images (3 minimum)
- [ ] Add default news thumbnail
- [ ] Add organization logo
- [ ] Configure next.config.mjs for external images (if using Unsplash)
- [ ] Test image loading on homepage
- [ ] Verify responsive behavior
- [ ] Check alt text accessibility
- [ ] Optimize file sizes

## Support

For image-related issues:
1. Check browser console for 404 errors
2. Verify file paths are correct
3. Ensure files are in `/public/` directory
4. Check next.config.mjs image configuration
5. Validate image formats are supported

---

**Note**: Until actual images are added, the website will show placeholder images or broken image icons. This is expected during development.
