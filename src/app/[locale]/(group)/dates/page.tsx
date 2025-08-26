import Hero from "@/components/Hero";
import Section from "@/components/Section";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ProductCard from "@/components/ProdcutCard";
import Notch from "@/components/Notch";

type ProductData = {
	image: string;
	title: string;
	href: string;
};

export default function Page() {
	const t = useTranslations("Group.datesCompany");

	const products: ProductData[] = Array(12).fill({
		image: "/square_placeholder.webp",
		title: "منتج التمور",
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
			<section className="relative bg-white">
				<Notch
					className="absolute w-[50%] transform left-0 -translate-x-3/4 -translate-y-1 z-10"
					direction="down"
					
				/>
				<Notch
					className="absolute w-[50%] transform right-0 translate-x-3/4 -translate-y-1 z-10"
					direction="down"
					
				/>

				<div className="w-full h-[80vh]">
					<Image
						src="/placeholder.webp"
						alt="About Amal Al-Khair"
						fill
						className="object-cover"
						priority
					/>
				</div>

				<Notch className="absolute w-[50%] transform left-0 -translate-x-3/4 translate-y-1 bottom-0 z-10" color="#E5E7EB"/>
				<Notch className="absolute w-[50%] transform right-0 translate-x-3/4 translate-y-1 bottom-0 z-10" color="#E5E7EB"/>
			</section>
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
