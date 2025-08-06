import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/products/About";
import Products from "@/components/products/Products";
import NewsletterSection from "@/components/home/Newsletter";

export default function ProductsPage() {
	return (
		<div className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0 bg-[url('/bg.jpg')] bg-repeat opacity-3" />

			<div className="relative z-10 w-full">
				<Hero title="شركة أمل الخير للدواجن" />
				<About />
				<Products />
				<NewsletterSection />
			</div>
		</div>
	);
}
