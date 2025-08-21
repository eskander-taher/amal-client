import Section from "../Section";
import ProductCard from "../ProdcutCard";
import { useTranslations } from "next-intl";

type ProductData = {
	image: string;
	titleKey: string;
	href: string;
};

const Products: React.FC = () => {
	const t = useTranslations("Products");
	
	 const products: ProductData[] = Array(4).fill({
			image: "/square_placeholder.webp",
			title: "منتج الدواجن",
			href: "/dummy-product",
		});

	return (
		<Section id="products" className="bg-gray-200">
			<div className="w-full">
				<div className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t("homeTitle")}</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						{t("homeDescription")}
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{products.map((product, index) => (
						<ProductCard key={index} product={product} />
					))}
				</div>
			</div>
		</Section>
	);
};

export default Products;
