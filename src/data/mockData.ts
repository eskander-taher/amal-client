// Centralized mock data for News, Products, and Recipes
import type { Category } from "@/types";
import type { News } from "@/types";

export const newsCards = [
  {
    date: "16 Feb 2025",
    image: "/image_shape_mask.png",
    titleKey: "newsItems.storeOpening.title",
    descriptionKey: "newsItems.storeOpening.description",
    href: "/news/dummy-news",
  },
  {
    date: "16 Feb 2025",
    image: "/image_shape_mask.png",
    titleKey: "newsItems.storeOpening.title",
    descriptionKey: "newsItems.storeOpening.description",
    href: "/news/dummy-news",
  },
  {
    date: "16 Feb 2025",
    image: "/image_shape_mask.png",
    titleKey: "newsItems.storeOpening.title",
    descriptionKey: "newsItems.storeOpening.description",
    href: "/news/dummy-news",
  },
];

export const recipeCards = [
  {
    duration: "45 دقيقة",
    image: "/poultry.jpg",
    title: "كيكة التمر التقليدية",
    description:
      "وصفة تقليدية لذيذة لكيكة التمر المصنوعة من أجود أنواع تمور أمل الخير، مثالية للعائلة والمناسبات الخاصة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "30 دقيقة",
    image: "/poultry.jpg",
    title: "سمك البلطي المشوي بالبهارات",
    description:
      "وصفة صحية ولذيذة لسمك البلطي المشوي مع البهارات العربية التقليدية، مصنوع من أسماك أمل الخير الطازجة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "60 دقيقة",
    image: "/poultry.jpg",
    title: "دجاج مشوي بالليمون والأعشاب",
    description:
      "وصفة دجاج مشوي شهية مع الليمون والأعشاب الطازجة، مصنوعة من دجاج أمل الخير عالي الجودة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "15 دقيقة",
    image: "/poultry.jpg",
    title: "سلطة التمر والجوز",
    description:
      "سلطة صحية ومغذية تجمع بين حلاوة التمر ومقرمش الجوز، مثالية كوجبة خفيفة أو حلوى صحية.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "40 دقيقة",
    image: "/poultry.jpg",
    title: "أرز بالدجاج والتمر",
    description:
      "وصفة أرز شهية مع الدجاج والتمر، تجمع بين النكهات التقليدية والحديثة بطريقة فريدة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "35 دقيقة",
    image: "/poultry.jpg",
    title: "شوربة السمك بالخضروات",
    description:
      "شوربة سمك دافئة ومغذية مع الخضروات الطازجة، مصنوعة من أسماك أمل الخير عالية الجودة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "90 دقيقة",
    image: "/poultry.jpg",
    title: "مربى التمر المنزلي",
    description:
      "وصفة مربى تمر طبيعية 100% مصنوعة من تمور أمل الخير، خالية من المواد الحافظة والسكريات المضافة.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "50 دقيقة",
    image: "/poultry.jpg",
    title: "دجاج بالكاري والتمر",
    description:
      "وصفة دجاج بالكاري مع إضافة التمر للحلاوة الطبيعية، طبق غني بالنكهات والفوائد الصحية.",
    href: "/recipes/yogurt-apple-cake",
  },
  {
    duration: "25 دقيقة",
    image: "/poultry.jpg",
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
  { image: "/products/product1.png", title: "صدور دجاج الطازج - مكعبات", href: "/products/1", category: "poultry" },
  { image: "/products/product2.png", title: "فيليه صدر دجاج طازج", href: "/products/2", category: "poultry" },
  { image: "/products/product3.png", title: "دجاجة تاجة كاملة عباء الكيس", href: "/products/3", category: "poultry" },
  { image: "/products/product4.png", title: "دجاجة كاملة متبله بنكهة البراني", href: "/products/4", category: "poultry" },
  // Feed
  { image: "/products/product1.png", title: "علف الدجاج البياض", href: "/products/1", category: "feed" },
  { image: "/products/product2.png", title: "علف الدجاج اللاحم", href: "/products/2", category: "feed" },
  { image: "/products/product3.png", title: "علف الأبقار الحلوب", href: "/products/3", category: "feed" },
  { image: "/products/product4.png", title: "علف الأسماك", href: "/products/4", category: "feed" },
  // Fish
  { image: "/products/product1.png", title: "سمك السلمون الطازج", href: "/products/1", category: "fish" },
  { image: "/products/product2.png", title: "سمك التونة الطازجة", href: "/products/2", category: "fish" },
  { image: "/products/product3.png", title: "سمك الهامور الطازج", href: "/products/3", category: "fish" },
  { image: "/products/product4.png", title: "سمك الشعري الطازج", href: "/products/4", category: "fish" },
  // Dates
  { image: "/products/product1.png", title: "تمور العجوة المميزة", href: "/products/1", category: "dates" },
  { image: "/products/product2.png", title: "تمور السكري الذهبية", href: "/products/2", category: "dates" },
  { image: "/products/product3.png", title: "تمور الصقعي الطازجة", href: "/products/3", category: "dates" },
  { image: "/products/product4.png", title: "تمور البرحي الطازجة", href: "/products/4", category: "dates" },
];

export const featuredProducts = [
  { image: "/group/poultry.png", titleKey: "featured1.title" },
  { image: "/group/feed.png", titleKey: "featured2.title" },
  { image: "/group/fish.png", titleKey: "featured3.title" },
  { image: "/group/dates.png", titleKey: "featured4.title" },
  { image: "/group/feed.png", titleKey: "featured2.title" },
  { image: "/group/poultry.png", titleKey: "featured1.title" },
];


