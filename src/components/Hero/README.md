# Hero Component

A reusable Hero component that displays page titles, breadcrumbs, and background images. Designed to work with `next-intl` for internationalization and routing.

## Features

- ✅ Automatic breadcrumb generation based on current route
- ✅ Internationalization support with `next-intl`
- ✅ Responsive design with Tailwind CSS
- ✅ Customizable background images
- ✅ RTL/LTR support
- ✅ Accessible navigation

## Usage

### Basic Usage

```tsx
import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";

export default function MyPage() {
  const t = useTranslations("Navigation");
  
  return (
    <Hero
      title="Page Title"
      subtitle="Optional subtitle"
      image="/path/to/image.jpg"
    />
  );
}
```

### With Translations

```tsx
import Hero from "@/components/Hero";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("Navigation");
  
  return (
    <Hero
      title={t("about")}
      subtitle="Discover our story and mission"
      image="/about.jpg"
      imageAlt="About page background"
    />
  );
}
```

### Without Breadcrumbs

```tsx
<Hero
  title="Home Page"
  image="/hero.jpg"
  showBreadcrumb={false}
/>
```

### Custom Styling

```tsx
<Hero
  title="Custom Page"
  image="/custom.jpg"
  className="min-h-[80vh]"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | The main page title |
| `subtitle` | `string` | Optional | Subtitle text below the title |
| `image` | `string` | `"/hero.jpg"` | Background image path |
| `imageAlt` | `string` | `"Hero background"` | Alt text for background image |
| `showBreadcrumb` | `boolean` | `true` | Whether to show breadcrumb navigation |
| `className` | `string` | `""` | Additional CSS classes |

## Breadcrumb Navigation

The component automatically generates breadcrumbs based on the current URL path. It uses the `next-intl` navigation system and supports:

- Home icon for the root page
- Chevron separators between levels
- Proper localization using translation keys
- Active state styling for current page

### Supported Routes

The breadcrumb system recognizes these route segments and maps them to translations:

- `about` → `t("about")`
- `group` → `t("group")`
- `products` → `t("products")`
- `news` → `t("news")`
- `jobs` → `t("jobs")`
- `contact` → `t("contact")`

### Custom Route Mapping

To add support for new routes, update the `generateBreadcrumbs` function in the Hero component:

```tsx
switch (segment) {
  case "new-route":
    label = t("newRoute");
    break;
  // ... existing cases
}
```

## Translation Keys

Make sure you have these translation keys in your message files:

### English (`messages/en.json`)
```json
{
  "Breadcrumbs": {
    "home": "Home",
    "about": "About Us",
    "group": "Amal Al Khair Holding Group",
    "products": "Our Products",
    "news": "News & Blogs",
    "jobs": "Jobs",
    "contact": "Contact Us"
  }
}
```

### Arabic (`messages/ar.json`)
```json
{
  "Breadcrumbs": {
    "home": "الرئيسية",
    "about": "من نحن؟",
    "group": "مجموعة أمل الخير القابضة",
    "products": "منتجاتنا",
    "news": "الأخبار و المدونات",
    "jobs": "الوظائف",
    "contact": "تواصل معنا"
  }
}
```

## Dependencies

- `next-intl` - For internationalization and routing
- `lucide-react` - For icons (ChevronRight, Home)
- `next/image` - For optimized image loading
- `tailwindcss` - For styling

## Examples

### About Page
```tsx
<Hero
  title={t("about")}
  subtitle="Discover our story, mission, and the values that drive our success"
  image="/about.jpg"
  imageAlt="About Amal Al Khair Holding Group"
/>
```

### Products Page
```tsx
<Hero
  title={t("products")}
  subtitle={tProducts("subtitle")}
  image="/hero.jpg"
  imageAlt="Products Hero Background"
/>
```

### Contact Page
```tsx
<Hero
  title={t("contact")}
  subtitle="Get in touch with our team"
  image="/contact.jpg"
  imageAlt="Contact page background"
/>
``` 