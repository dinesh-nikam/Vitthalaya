# Digital Pandharpur — Custom Fonts Directory

This directory (`public/fonts/`) holds custom local web fonts for Digital Pandharpur, specifically the calligraphy display typeface **AMS Manthan**.

---

## 1. Supported Font Files

Current Status:
- `AMS Manthan Regular.ttf` (Installed: 82,692 bytes, TrueType font)
- `ams-manthan-regular.ttf` (Installed: normalized URL alias)
- `ams-manthan-regular.woff2` (Optional compressed webfont format)

### File Path Requirements:
When placed in `public/fonts/`, Next.js serves them at the following public URLs:
- `/fonts/AMS Manthan Regular.ttf`
- `/fonts/ams-manthan-regular.ttf`
- `/fonts/ams-manthan-regular.woff2`

---

## 2. Technical Note: Unicode vs. Non-Unicode (Legacy Encoding)

> [!IMPORTANT]
> **Understanding AMS Font Encodings:**
> 
> 1. **Legacy AMS Font Encoding (Non-Unicode / Shree-Lipi Mapping):**
>    - Many traditional Marathi calligraphy fonts from AMS (IndiaFont / AMS Calligraphy) were originally released using custom legacy ASCII/8-bit character mapping rather than standard Unicode Devanagari (U+0900 – U+097F).
>    - If using a legacy non-Unicode font file, plain Devanagari text (`विठ्ठल`) typed in standard Unicode will **not** render with correct ligatures unless converted or mapped via a font converter or Unicode-compliant OpenType font edition.
> 
> 2. **Unicode-Compliant Webfont (Required for Modern Web):**
>    - For standard modern web usage, SEO, screen readers (WCAG AA), and copy-paste compatibility, ensure the font file installed here is the **Unicode-compliant OpenType/TrueType** version of AMS Manthan or has been converted to Unicode mapping.
> 
> 3. **Graceful Fallback Stack:**
>    - In `app/globals.css` and `tailwind.config.js`, the `--font-manthan` stack is configured with robust, high-quality Unicode Devanagari calligraphy fallbacks:
>      ```css
>      --font-manthan: "AMS Manthan", "AMS Manthan Regular", "Rozha One", "Yatra One", "Tiro Devanagari Marathi", serif;
>      ```
>    - If `ams-manthan-regular.woff2` or `ams-manthan-regular.ttf` is not present or while the custom font is downloading (`font-display: swap`), the browser immediately renders the calligraphy using Google Fonts' **Rozha One** or **Yatra One** with zero layout shift or broken characters.

---

## 3. CSS Configuration Reference

The font is declared in `app/globals.css`:

```css
@font-face {
  font-family: 'AMS Manthan';
  src: url('/fonts/ams-manthan-regular.woff2') format('woff2'),
       url('/fonts/ams-manthan-regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'AMS Manthan Regular';
  src: url('/fonts/ams-manthan-regular.woff2') format('woff2'),
       url('/fonts/ams-manthan-regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

And configured in Tailwind (`tailwind.config.js`):

```js
fontFamily: {
  manthan: ['var(--font-manthan)', 'var(--font-devanagari-heading)', 'serif'],
  // ...
}
```

Usage in React/JSX:
```tsx
<h1 className="font-manthan text-4xl text-saffron-500">
  ।। जय जय रामकृष्ण हरी ।।
</h1>
```
