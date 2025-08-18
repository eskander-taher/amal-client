import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";
import Section from "@/components/Section";
import RecipeCard from "@/components/RecipeCard";
import { recipeCards } from "@/data/mockData";

type RecipeData = {
  date: string;
  image: string;
  title: string;
  description: string;
  href: string;
};

export default function RecipesPage() {
  const t = useTranslations("Recipes");

  const recipes: RecipeData[] = recipeCards.map((r) => ({
    date: r.duration,
    image: r.image,
    title: r.title,
    description: r.description,
    href: r.href,
  }));

  return (
    <>
      <Hero title={t("title")} imageAlt="Recipes hero image." image="/placeholder.jpg" />

      <Section className="bg-gray-200">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((item, index) => (
              <RecipeCard
                key={index}
                image={item.image}
                imageAlt={item.title}
                title={item.title}
                description={item.description}
                href={item.href}
                badgeText={item.date}
              />
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
