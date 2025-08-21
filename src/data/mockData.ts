// Centralized mock data for News, Products, and Recipes
import type { Category } from "@/types";
// import type { News } from "@/types";


export const recipeCards = [
  {
    duration: "45 دقيقة",
    image: "/poultry.webp",
    title: "كيكة التمر التقليدية",
    description:
      "وصفة تقليدية لذيذة لكيكة التمر المصنوعة من أجود أنواع تمور أمل الخير، مثالية للعائلة والمناسبات الخاصة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "30 دقيقة",
    image: "/poultry.webp",
    title: "سمك البلطي المشوي بالبهارات",
    description:
      "وصفة صحية ولذيذة لسمك البلطي المشوي مع البهارات العربية التقليدية، مصنوع من أسماك أمل الخير الطازجة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "60 دقيقة",
    image: "/poultry.webp",
    title: "دجاج مشوي بالليمون والأعشاب",
    description:
      "وصفة دجاج مشوي شهية مع الليمون والأعشاب الطازجة، مصنوعة من دجاج أمل الخير عالي الجودة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "15 دقيقة",
    image: "/poultry.webp",
    title: "سلطة التمر والجوز",
    description:
      "سلطة صحية ومغذية تجمع بين حلاوة التمر ومقرمش الجوز، مثالية كوجبة خفيفة أو حلوى صحية.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "40 دقيقة",
    image: "/poultry.webp",
    title: "أرز بالدجاج والتمر",
    description:
      "وصفة أرز شهية مع الدجاج والتمر، تجمع بين النكهات التقليدية والحديثة بطريقة فريدة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "35 دقيقة",
    image: "/poultry.webp",
    title: "شوربة السمك بالخضروات",
    description:
      "شوربة سمك دافئة ومغذية مع الخضروات الطازجة، مصنوعة من أسماك أمل الخير عالية الجودة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "90 دقيقة",
    image: "/poultry.webp",
    title: "مربى التمر المنزلي",
    description:
      "وصفة مربى تمر طبيعية 100% مصنوعة من تمور أمل الخير، خالية من المواد الحافظة والسكريات المضافة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "50 دقيقة",
    image: "/poultry.webp",
    title: "دجاج بالكاري والتمر",
    description:
      "وصفة دجاج بالكاري مع إضافة التمر للحلاوة الطبيعية، طبق غني بالنكهات والفوائد الصحية.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "25 دقيقة",
    image: "/poultry.webp",
    title: "سمك مشوي بالليمون والثوم",
    description:
      "وصفة سمك مشوي بسيطة ولذيذة مع الليمون والثوم، تبرز نكهة السمك الطازج الطبيعية.",
    href: "/recipes/yogurt-apple-cake",
  },
];

export type ProductCardData = {
  image: string;
  title: string;
  href: string;
  category: Category;
};

export const productCards: ReadonlyArray<ProductCardData> = [
  // Poultry
  { image: "/square_placeholder.webp", title: "صدور دجاج الطازج - مكعبات", href: "/products/1", category: "poultry" },
  { image: "/square_placeholder.webp", title: "فيليه صدر دجاج طازج", href: "/products/2", category: "poultry" },
  { image: "/square_placeholder.webp", title: "دجاجة تاجة كاملة عباء الكيس", href: "/products/3", category: "poultry" },
  { image: "/square_placeholder.webp", title: "دجاجة كاملة متبله بنكهة البراني", href: "/products/4", category: "poultry" },
  // Feed
  { image: "/square_placeholder.webp", title: "علف الدجاج البياض", href: "/products/1", category: "feed" },
  { image: "/square_placeholder.webp", title: "علف الدجاج اللاحم", href: "/products/2", category: "feed" },
  { image: "/square_placeholder.webp", title: "علف الأبقار الحلوب", href: "/products/3", category: "feed" },
  { image: "/square_placeholder.webp", title: "علف الأسماك", href: "/products/4", category: "feed" },
  // Fish
  { image: "/square_placeholder.webp", title: "سمك السلمون الطازج", href: "/products/1", category: "fish" },
  { image: "/square_placeholder.webp", title: "سمك التونة الطازجة", href: "/products/2", category: "fish" },
  { image: "/square_placeholder.webp", title: "سمك الهامور الطازج", href: "/products/3", category: "fish" },
  { image: "/square_placeholder.webp", title: "سمك الشعري الطازج", href: "/products/4", category: "fish" },
  // Dates
  { image: "/square_placeholder.webp", title: "تمور العجوة المميزة", href: "/products/1", category: "dates" },
  { image: "/square_placeholder.webp", title: "تمور السكري الذهبية", href: "/products/2", category: "dates" },
  { image: "/square_placeholder.webp", title: "تمور الصقعي الطازجة", href: "/products/3", category: "dates" },
  { image: "/square_placeholder.webp", title: "تمور البرحي الطازجة", href: "/products/4", category: "dates" },
];

export const featuredProducts = [
  { image: "/group/poultry.webp", titleKey: "featured1.title" },
  { image: "/group/feed.webp", titleKey: "featured2.title" },
  { image: "/group/fish.webp", titleKey: "featured3.title" },
  { image: "/group/dates.webp", titleKey: "featured4.title" },
  { image: "/group/feed.webp", titleKey: "featured2.title" },
  { image: "/group/poultry.webp", titleKey: "featured1.title" },
];

