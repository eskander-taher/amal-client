import Section from "../Section";
import ProductCard from "../ProdcutCard";

type ProductData = {
	image: string;
	title: string;
	href: string;
};

const Products: React.FC = () => {
	const products: ProductData[] = [
		{
			image: "/products/product1.png",
			title: "صدور دجاج الطازج - مكعبات",
			href: "/products/1",
		},
		{
			image: "/products/product2.png",
			title: "فيليه صدر دجاج طازج",
			href: "/products/2",
		},
		{
			image: "/products/product3.png",
			title: "دجاجة تاجة كاملة عباء الكيس",
			href: "/products/3",
		},
		{
			image: "/products/product4.png",
			title: "دجاجة كاملة متبله بنكهة البراني",
			href: "/products/4",
		},
	];

	return (
		<Section id="products" className="bg-gray-200">
			<div className="w-full">
				<div className="text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">منتجاتنا</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						اكتشف مجموعة منتجاتنا المميزة والعالية الجودة
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
