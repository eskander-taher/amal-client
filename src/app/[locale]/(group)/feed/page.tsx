import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ProductCard from "@/components/ProdcutCard";
import Notch from "@/components/Notch";
import ImageSection from "@/components/ui/ImageSection";

type ProductData = {
	image: string;
	title: string;
	href: string;
};

export default function Page() {
	const t = useTranslations("Group.feedCompany");

	const products: ProductData[] = Array(12).fill({
		image: "/square_placeholder.webp",
		title: "منتج الاعلاف",
		href: "/dummy-product",
	});
	return (
		<div>
			<Hero title={t("title")} image="/placeholder.webp" />
			<Section>
				<div className="flex justify-start gap-10 items-center">
					<Image
						src="/group/feed.webp"
						alt="Poultry Company Logo"
						width={500}
						height={500}
						className="invert object-contain"
					/>
					<div>
						<h2 className="text-3xl font-bold text-gray-900 mb-4">{t("title")}</h2>
						<p>{t("description")}</p>
					</div>
				</div>
			</Section>
			<ImageSection />
			<Section className="bg-gray-200">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
				</div>
			</Section>
		</div>
	);
}
