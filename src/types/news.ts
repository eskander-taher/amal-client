export type News = {
  title: string;
  description: string;
  imageUrl: string;
  date: string; // ISO or display string for mock
  href: string; // route to details page
};

export type NewsCardItem = Pick<News, "imageUrl" | "title" | "description" | "href"> & {
  badgeText?: string; // date or category badge
};

// News list item used on home/news pages with i18n keys
export type NewsListCard = {
  date: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
  href: string;
};


