# Design System — CompareForge.online

## Design Principles

1. **Clarity:** Information is easy to find and understand
2. **Trust:** Design communicates professionalism and reliability
3. **Research:** Design supports comparison and analysis
4. **Simplicity:** No unnecessary decoration or distraction
5. **Accessibility:** Usable by everyone, on any device

## Color System

### Primary Colors

```css
:root {
  /* Primary */
  --color-primary: #1a56db;        /* Trust blue */
  --color-primary-hover: #1e40af;
  --color-primary-light: #e8eefb;

  /* Neutral */
  --color-text: #1f2937;           /* Dark gray for text */
  --color-text-secondary: #6b7280; /* Medium gray for secondary text */
  --color-text-light: #9ca3af;     /* Light gray for muted text */
  --color-bg: #ffffff;             /* White background */
  --color-bg-secondary: #f9fafb;   /* Light gray background */
  --color-border: #e5e7eb;         /* Border color */
  --color-border-light: #f3f4f6;   /* Light border */

  /* Accent */
  --color-accent: #059669;         /* Green for positive/success */
  --color-accent-light: #ecfdf5;

  /* Warning */
  --color-warning: #d97706;        /* Amber for caution */
  --color-warning-light: #fffbeb;

  /* Error */
  --color-error: #dc2626;          /* Red for errors/negative */
  --color-error-light: #fef2f2;
}
```

### Usage

- **Primary blue:** Links, buttons, interactive elements
- **Text dark:** Body text, headings
- **Text secondary:** Descriptions, metadata
- **Background white:** Page background
- **Background secondary:** Card backgrounds, section alternating
- **Border:** Dividers, table borders, card borders
- **Accent green:** Positive indicators, checkmarks
- **Warning amber:** Caution, important notes
- **Error red:** Errors, disadvantages, negative indicators

### Dark Mode (Future)

```css
:root[data-theme="dark"] {
  --color-text: #f9fafb;
  --color-text-secondary: #d1d5db;
  --color-bg: #111827;
  --color-bg-secondary: #1f2937;
  --color-border: #374151;
}
```

---

## Typography

### Font Stack

```css
:root {
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Font Sizes

```css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
}
```

### Font Weights

```css
:root {
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
}
```

### Line Heights

```css
:root {
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;
}
```

### Usage

- **H1:** 36px, bold, tight line height
- **H2:** 24px, semibold
- **H3:** 20px, semibold
- **Body:** 16px, normal weight, relaxed line height
- **Small/Labels:** 14px, medium weight
- **Metadata:** 12px, normal weight

---

## Spacing

### Scale

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
}
```

### Usage

- **Inline spacing:** space-1 to space-2
- **Component padding:** space-4 to space-6
- **Section spacing:** space-8 to space-12
- **Page margins:** space-6 to space-16

---

## Layout

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-4);
}

@media (min-width: 640px) {
  .container {
    padding: 0 var(--space-6);
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 var(--space-8);
  }
}
```

### Grid

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-2 { grid-template-columns: repeat(2, 1fr); }
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.grid-4 { grid-template-columns: repeat(4, 1fr); }

@media (max-width: 640px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

---

## Components

### Buttons

#### Primary Button

```css
.btn-primary {
  background-color: var(--color-primary);
  color: white;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: var(--color-primary-hover);
}
```

#### Secondary Button

```css
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: var(--font-medium);
  border: 1px solid var(--color-primary);
  cursor: pointer;
}
```

#### Sizes

- **Small:** padding space-1 space-3, text-sm
- **Medium:** padding space-2 space-4, text-base
- **Large:** padding space-3 space-6, text-lg

---

### Cards

#### Comparison Card

```html
<div class="comparison-card">
  <div class="comparison-card__header">
    <span class="comparison-card__category">Smartphones</span>
    <h3 class="comparison-card__title">iPhone 15 vs Samsung Galaxy S24</h3>
  </div>
  <p class="comparison-card__description">
    Compare specifications, features, and differences between these flagship smartphones.
  </p>
  <div class="comparison-card__meta">
    <span>Last updated: Sep 2026</span>
  </div>
  <a href="/comparisons/iphone-15-vs-samsung-galaxy-s24/" class="comparison-card__link">
    View Comparison
  </a>
</div>
```

#### Guide Card

```html
<div class="guide-card">
  <span class="guide-card__badge">Guide</span>
  <h3 class="guide-card__title">What is OLED?</h3>
  <p class="guide-card__description">
    Understand OLED display technology and how it differs from LCD.
  </p>
  <a href="/guides/what-is-oled/" class="guide-card__link">
    Read Guide
  </a>
</div>
```

#### Card Styles

```css
.card {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  transition: box-shadow 0.2s;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

---

### Tables

#### Specification Table

```html
<table class="spec-table">
  <thead>
    <tr>
      <th>Specification</th>
      <th>iPhone 15</th>
      <th>Samsung Galaxy S24</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Display</td>
      <td>6.1" OLED</td>
      <td>6.2" Dynamic AMOLED 2X</td>
    </tr>
    <tr>
      <td>Processor</td>
      <td>A16 Bionic</td>
      <td>Snapdragon 8 Gen 3</td>
    </tr>
  </tbody>
</table>
```

#### Table Styles

```css
.spec-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.spec-table th,
.spec-table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.spec-table th {
  background: var(--color-bg-secondary);
  font-weight: var(--font-semibold);
  position: sticky;
  top: 0;
}

.spec-table tr:hover {
  background: var(--color-bg-secondary);
}
```

#### Responsive Table

On mobile, tables become scrollable:

```css
.table-wrapper {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
```

---

### Comparison Layout

#### Quick Comparison

```html
<div class="quick-comparison">
  <div class="quick-comparison__product">
    <h3>iPhone 15</h3>
    <ul>
      <li>6.1" OLED display</li>
      <li>A16 Bionic chip</li>
      <li>48MP main camera</li>
    </ul>
  </div>
  <div class="quick-comparison__divider">vs</div>
  <div class="quick-comparison__product">
    <h3>Samsung Galaxy S24</h3>
    <ul>
      <li>6.2" Dynamic AMOLED 2X</li>
      <li>Snapdragon 8 Gen 3</li>
      <li>50MP main camera</li>
    </ul>
  </div>
</div>
```

#### Key Differences

```html
<div class="key-differences">
  <h2>Key Differences</h2>
  <div class="key-difference">
    <h3>Display Technology</h3>
    <p>The iPhone 15 uses a standard OLED display, while the Galaxy S24 features Samsung's Dynamic AMOLED 2X with adaptive refresh rate.</p>
  </div>
  <div class="key-difference">
    <h3>Processor</h3>
    <p>The iPhone 15 runs Apple's A16 Bionic, while the Galaxy S24 uses Qualcomm's Snapdragon 8 Gen 3.</p>
  </div>
</div>
```

---

### Badges

```css
.badge {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge--category {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.badge--guide {
  background: var(--color-accent-light);
  color: var(--color-accent);
}

.badge--updated {
  background: var(--color-warning-light);
  color: var(--color-warning);
}
```

---

### Breadcrumbs

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumbs">
    <li><a href="/">Home</a></li>
    <li><a href="/comparisons/">Comparisons</a></li>
    <li><a href="/categories/smartphones/">Smartphones</a></li>
    <li aria-current="page">iPhone 15 vs Samsung Galaxy S24</li>
  </ol>
</nav>
```

```css
.breadcrumbs {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}

.breadcrumbs li:not(:last-child)::after {
  content: "›";
  margin: 0 var(--space-2);
}

.breadcrumbs a {
  color: var(--color-primary);
  text-decoration: none;
}

.breadcrumbs a:hover {
  text-decoration: underline;
}
```

---

### Navigation

#### Header

```html
<header class="header">
  <div class="container">
    <a href="/" class="header__logo">CompareForge</a>
    <nav class="header__nav" aria-label="Main navigation">
      <a href="/comparisons/">Comparisons</a>
      <a href="/categories/">Categories</a>
      <a href="/guides/">Guides</a>
      <a href="/about/">About</a>
    </nav>
    <button class="header__search" aria-label="Search">
      <!-- Search icon -->
    </button>
  </div>
</header>
```

#### Mobile Navigation

```html
<nav class="mobile-nav" aria-label="Mobile navigation">
  <a href="/" class="mobile-nav__item">
    <svg><!-- Home icon --></svg>
    <span>Home</span>
  </a>
  <a href="/comparisons/" class="mobile-nav__item">
    <svg><!-- Compare icon --></svg>
    <span>Compare</span>
  </a>
  <a href="/categories/" class="mobile-nav__item">
    <svg><!-- Categories icon --></svg>
    <span>Categories</span>
  </a>
  <a href="/guides/" class="mobile-nav__item">
    <svg><!-- Guides icon --></svg>
    <span>Guides</span>
  </a>
</nav>
```

---

### Footer

```html
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__section">
        <h4>Explore</h4>
        <a href="/comparisons/">Comparisons</a>
        <a href="/categories/">Categories</a>
        <a href="/guides/">Guides</a>
      </div>
      <div class="footer__section">
        <h4>About</h4>
        <a href="/about/">About CompareForge</a>
        <a href="/contact/">Contact</a>
        <a href="/report-an-error/">Report an Error</a>
      </div>
      <div class="footer__section">
        <h4>Legal</h4>
        <a href="/privacy-policy/">Privacy Policy</a>
        <a href="/terms/">Terms of Service</a>
        <a href="/cookie-policy/">Cookie Policy</a>
        <a href="/disclaimer/">Disclaimer</a>
      </div>
    </div>
    <div class="footer__bottom">
      <p>&copy; 2026 CompareForge. All rights reserved.</p>
    </div>
  </div>
</footer>
```

---

### Forms

#### Contact Form

```html
<form class="form" action="/api/contact" method="POST">
  <div class="form__group">
    <label for="name" class="form__label">Name</label>
    <input type="text" id="name" name="name" class="form__input" required>
  </div>
  <div class="form__group">
    <label for="email" class="form__label">Email</label>
    <input type="email" id="email" name="email" class="form__input" required>
  </div>
  <div class="form__group">
    <label for="message" class="form__label">Message</label>
    <textarea id="message" name="message" class="form__textarea" rows="5" required></textarea>
  </div>
  <button type="submit" class="btn-primary">Send Message</button>
</form>
```

---

### Alerts

```css
.alert {
  padding: var(--space-4);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-4);
}

.alert--info {
  background: var(--color-primary-light);
  border-left: 4px solid var(--color-primary);
  color: var(--color-primary);
}

.alert--warning {
  background: var(--color-warning-light);
  border-left: 4px solid var(--color-warning);
  color: var(--color-warning);
}

.alert--error {
  background: var(--color-error-light);
  border-left: 4px solid var(--color-error);
  color: var(--color-error);
}
```

---

## Responsive Breakpoints

```css
/* Mobile: up to 640px */
@media (max-width: 640px) { ... }

/* Tablet: 641px to 1024px */
@media (min-width: 641px) and (max-width: 1024px) { ... }

/* Desktop: 1025px+ */
@media (min-width: 1025px) { ... }
```

---

## Border Radius

```css
:root {
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-xl: 1rem;      /* 16px */
  --radius-full: 9999px;
}
```

---

## Shadows

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
}
```

---

## Transitions

```css
:root {
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
```

---

## Accessibility

### Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### Skip Link

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  padding: var(--space-2);
  background: var(--color-primary);
  color: white;
  z-index: 100;
  transition: top var(--transition-fast);
}

.skip-link:focus {
  top: 0;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```