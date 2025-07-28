import "./news-style.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";

type NewsCard = {
	date: string;
	image: string;
	title: string;
	description: string;
};

const news: NewsCard[] = [
	{
		date: "16 Feb 2025",
		image: "/image_shape_mask.png",
		title: "افتتاح متجر أمل الخير للتمور",
		description:
			"شركة أمل الخير تطلق المتجر الإلكتروني الأول لها على الإنترنت يشمل جميع منتجاتها وتقدم خدمة الدفع عبر البطاقات الائتمانية وبطاقه مدى أو الدفع نقداً عند الاستلام، كما يُقدّم العديد من ...",
	},
	{
		date: "16 Feb 2025",
		image: "/image_shape_mask.png",
		title: "افتتاح متجر أمل الخير للتمور",
		description:
			"شركة أمل الخير تطلق المتجر الإلكتروني الأول لها على الإنترنت يشمل جميع منتجاتها وتقدم خدمة الدفع عبر البطاقات الائتمانية وبطاقه مدى أو الدفع نقداً عند الاستلام، كما يُقدّم العديد من ...",
	},
	{
		date: "16 Feb 2025",
		image: "/image_shape_mask.png",
		title: "افتتاح متجر أمل الخير للتمور",
		description:
			"شركة أمل الخير تطلق المتجر الإلكتروني الأول لها على الإنترنت يشمل جميع منتجاتها وتقدم خدمة الدفع عبر البطاقات الائتمانية وبطاقه مدى أو الدفع نقداً عند الاستلام، كما يُقدّم العديد من ...",
	},
];

const NewsSection: React.FC = () => {
	return (
		<section className="relative pb-16 bg-white rtl text-right">
			<h2 className="text-3xl font-bold text-center mb-12">آخر الأخبار!</h2>
			<div className="flex flex-wrap justify-center gap-6">
				{news.map((item, index) => (
					<div
						key={index}
						className="w-80 bg-[#F2F2EF] pt-2 pl-2 pr-2 rounded-xl overflow-hidden relative hover:scale-105 transition-transform duration-300"
					>
						<div className="w-full h-48">
							<Image
								src={item.image}
								alt={item.title}
								width={320}
								height={192}
								className="w-full h-full"
							/>
						</div>
						<span className=" top-2 left-6 absolute text-xs font-bold text-gray-500 block mb-2">
							{item.date}
						</span>
						<div className="p-5">
							<h3 className="text-lg font-bold mb-2">{item.title}</h3>
							<p className="text-sm text-gray-600 mb-6">{item.description}</p>
							{/* Show Corner */}
							<div className="cta-container">
								<div className="content">
									<FaArrowLeftLong />
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
			{/* Bottom static curve */}
			<div className="absolute w-64 h-8 bottom-0 left-0 transform translate-x-1/2 translate-y-1/2 bg-[#353535] rounded-t-full flex justify-center items-top pt-2 gap-3">
				<h3 className="absolute cursor-pointer -translate-y-[150%]">المزيد من الأخبار</h3>
			</div>
		</section>
	);
};

export default NewsSection;
