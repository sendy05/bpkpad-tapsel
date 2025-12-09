# 🎨 Design System Documentation

## Overview
Website BPKPAD Tapanuli Selatan menggunakan design system modern dengan Tailwind CSS dan komponen React yang dapat digunakan kembali.

---

## 🎨 Color Palette

### Primary Colors (Blue)
- `primary-50` sampai `primary-950`: Warna utama untuk brand identity
- Gunakan untuk: buttons utama, links, highlights

### Secondary Colors (Orange/Amber)
- `secondary-50` sampai `secondary-950`: Warna aksen
- Gunakan untuk: CTA sekunder, badges penting

### Semantic Colors
- **Success**: `success-*` (Green) - pesan sukses, status aktif
- **Warning**: `warning-*` (Yellow/Amber) - peringatan, pending
- **Danger**: `danger-*` (Red) - error, status kritis
- **Neutral**: `neutral-*` (Gray) - teks, borders, backgrounds

---

## 📝 Typography

### Font Families
```css
font-sans     /* Inter - Body text */
font-display  /* Plus Jakarta Sans - Headings */
font-mono     /* JetBrains Mono - Code */
```

### Heading Classes
```tsx
<h1 className="heading-1">Level 1 Heading</h1>
<h2 className="heading-2">Level 2 Heading</h2>
<h3 className="heading-3">Level 3 Heading</h3>
<h4 className="heading-4">Level 4 Heading</h4>
```

### Text Gradients
```tsx
<h1 className="text-gradient">Gradient Text</h1>
<h2 className="text-gradient-cyan">Cyan Gradient</h2>
```

---

## 🔘 Buttons

### Variants
```tsx
import { Button } from '@/components/ui';

// Primary (default)
<Button variant="primary">Primary Button</Button>

// Secondary
<Button variant="secondary">Secondary Button</Button>

// Success
<Button variant="success">Success Button</Button>

// Outline
<Button variant="outline">Outline Button</Button>

// Ghost
<Button variant="ghost">Ghost Button</Button>
```

### Sizes
```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### With Icons
```tsx
<Button leftIcon={<Icon />}>With Left Icon</Button>
<Button rightIcon={<Icon />}>With Right Icon</Button>
```

### Loading State
```tsx
<Button isLoading>Loading...</Button>
```

---

## 🎴 Cards

### Basic Card
```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components/ui';

<Card>
  <CardHeader>
    <h3 className="font-bold">Card Title</h3>
  </CardHeader>
  <CardBody>
    <p>Card content goes here</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Card Variants
```tsx
<Card variant="default">Default Card</Card>
<Card variant="interactive">Interactive Card</Card>
<Card variant="bordered">Bordered Card</Card>
<Card variant="gradient">Gradient Card</Card>
```

### Hover Effect
```tsx
<Card hover>Hover to lift</Card>
```

---

## 🏷️ Badges

```tsx
import { Badge } from '@/components/ui';

<Badge variant="primary">Primary</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="neutral">Neutral</Badge>
```

---

## ⚠️ Alerts

```tsx
import { Alert } from '@/components/ui';

<Alert variant="info" title="Information">
  This is an informational message.
</Alert>

<Alert variant="success" title="Success">
  Operation completed successfully!
</Alert>

<Alert variant="warning" title="Warning">
  Please review your input.
</Alert>

<Alert variant="danger" title="Error">
  An error occurred.
</Alert>
```

### Custom Icon
```tsx
<Alert icon={<CustomIcon />} title="Custom">
  Custom icon alert
</Alert>
```

---

## 📦 Layout Components

### Container
```tsx
<div className="container">
  {/* Max-width 1280px with responsive padding */}
</div>

<div className="container-narrow">
  {/* Max-width 896px */}
</div>

<div className="container-wide">
  {/* Max-width 1400px */}
</div>
```

### Section Spacing
```tsx
<section className="section">
  {/* py-16 md:py-24 */}
</section>

<section className="section-sm">
  {/* py-12 md:py-16 */}
</section>

<section className="section-lg">
  {/* py-20 md:py-32 */}
</section>
```

---

## 📋 Form Elements

### Input
```tsx
<input type="text" className="input" placeholder="Enter text" />
<input type="text" className="input-error" placeholder="Error state" />
```

### Label
```tsx
<label className="label">Label Text</label>
<label className="label label-required">Required Field</label>
```

### Textarea
```tsx
<textarea className="textarea" placeholder="Enter message" />
```

### Checkbox & Radio
```tsx
<input type="checkbox" className="checkbox" />
<input type="radio" className="radio" />
```

### Form Helpers
```tsx
<div className="form-error">Error message</div>
<div className="form-hint">Hint text</div>
```

---

## 🎭 Effects

### Glassmorphism
```tsx
<div className="glass">
  Glassmorphism effect
</div>

<div className="glass-dark">
  Dark glassmorphism
</div>
```

### Gradient Backgrounds
```tsx
<div className="bg-gradient-primary">Primary gradient</div>
<div className="bg-gradient-secondary">Secondary gradient</div>
<div className="bg-gradient-cyan">Cyan gradient</div>
<div className="bg-gradient-purple">Purple gradient</div>
```

### Hover Effects
```tsx
<div className="hover-lift">Lifts on hover</div>
<div className="hover-glow">Glows on hover</div>
```

---

## ♿ Accessibility

### Focus Visible
Semua interactive elements sudah include focus styles:
```css
*:focus-visible {
  outline: 2px solid primary-500;
  outline-offset: 2px;
}
```

### Skip Link
Automatically included in layout:
```tsx
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
```

### Screen Reader Only
```tsx
<span className="sr-only">For screen readers only</span>
<span className="visually-hidden">Visually hidden</span>
```

### ARIA Attributes
Selalu gunakan proper ARIA attributes:
```tsx
<button aria-label="Close menu" aria-expanded={isOpen}>
  <Icon />
</button>
```

---

## 🎬 Animations

### Built-in Animations
```tsx
<div className="animate-fade-in">Fade in</div>
<div className="animate-fade-in-up">Fade in from bottom</div>
<div className="animate-slide-in-right">Slide from right</div>
<div className="animate-slide-in-left">Slide from left</div>
<div className="animate-float">Floating effect</div>
<div className="animate-gradient">Gradient animation</div>
```

---

## 🛠️ Utilities

### Helper Function
```tsx
import { cn } from '@/utils/helpers';

// Merge classes with proper precedence
<div className={cn('btn', 'btn-primary', customClass)} />
```

### Date Formatting
```tsx
import { formatDate } from '@/utils/helpers';

formatDate(new Date()); // "20 November 2025"
```

### Currency Formatting
```tsx
import { formatCurrency } from '@/utils/helpers';

formatCurrency(1000000); // "Rp 1.000.000"
```

### Text Truncate
```tsx
import { truncate } from '@/utils/helpers';

truncate('Long text...', 50); // "Long text..."
```

---

## 📱 Responsive Design

### Breakpoints
```css
xs:   475px
sm:   640px
md:   768px
lg:   1024px
xl:   1280px
2xl:  1536px
3xl:  1920px
```

### Usage
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text size
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

---

## 🚀 Performance

### Image Optimization
```tsx
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
/>
```

### Lazy Loading
```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div className="skeleton h-40" />,
  ssr: false,
});
```

---

## 📦 Component Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── forms/        # Form components
│   └── ...           # Feature components
├── layouts/          # Layout components
├── utils/            # Helper functions
└── app/              # Next.js pages
```

---

## ✅ Best Practices

1. **Always use semantic HTML**
   ```tsx
   <nav>, <main>, <section>, <article>, <aside>
   ```

2. **Include proper ARIA labels**
   ```tsx
   <button aria-label="Close">×</button>
   ```

3. **Use helper utilities**
   ```tsx
   import { cn } from '@/utils/helpers';
   ```

4. **Prefer semantic classes**
   ```tsx
   <button className="btn-primary">Click</button>
   // Instead of:
   <button className="bg-blue-600 px-4 py-2 rounded...">Click</button>
   ```

5. **Check color contrast**
   - Minimum ratio 4.5:1 untuk normal text
   - Minimum ratio 3:1 untuk large text

6. **Test keyboard navigation**
   - Tab untuk navigation
   - Enter/Space untuk activation
   - Escape untuk close

---

## 🎯 Examples

### Modern Card with Gradient
```tsx
<Card variant="gradient" hover>
  <CardBody>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white text-2xl">
        🎯
      </div>
      <div>
        <h3 className="font-bold text-lg">Title</h3>
        <p className="text-neutral-600">Description</p>
      </div>
    </div>
  </CardBody>
</Card>
```

### Hero Section
```tsx
<section className="relative bg-gradient-primary text-white section-lg overflow-hidden">
  <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
  <div className="container relative z-10">
    <h1 className="heading-1 text-white mb-6">Welcome</h1>
    <p className="text-xl mb-8">Subtitle text</p>
    <Button size="lg">Get Started</Button>
  </div>
</section>
```

---

Untuk pertanyaan atau kontribusi, silakan hubungi tim development.
