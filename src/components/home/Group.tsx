import "./style.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import Image from "next/image";

type CardData = {
	image: string;
	title: string;
	description: string;
};

const cards: CardData[] = [
	{
		image: "/group/dates.png",
		title: "شركة أمل الخير للتمور",
		description:
			"من أوائل المشاريع المعتمدة لمنطقة الباحة بالمملكة، باستخدام أجود السلالات، وقد تم تصدير المنتج للعديد من الدول. 100% ذاوية.",
	},
	{
		image: "/group/fish.png",
		title: "شركة أمل الخير للأسماك",
		description:
			"من أوائل المشاريع المعتمدة لمنطقة الباحة بالمملكة، باستخدام أجود السلالات، وقد تم تصدير المنتج للعديد من الدول. 100% ذاوية.",
	},
	{
		image: "/group/alaf.png",
		title: "شركة أمل الخير للأعلاف",
		description:
			"من أوائل المشاريع المعتمدة لمنطقة الباحة بالمملكة، باستخدام أجود السلالات، وقد تم تصدير المنتج للعديد من الدول. 100% ذاوية.",
	},
	{
		image: "/group/eggs.png",
		title: "شركة أمل الخير للدواجن",
		description:
			"من أوائل المشاريع المعتمدة لمنطقة الباحة بالمملكة، باستخدام أجود السلالات، وقد تم تصدير المنتج للعديد من الدول. 100% ذاوية.",
	},
];

const GroupSection: React.FC = () => {
	return (
		<section className="py-16 bg-gray-200  text-right">
			<h2 className="text-2xl font-semibold text-center mb-12">
				مجموعة <strong>أمل الخير</strong> القابضة
			</h2>

			<div className="flex flex-wrap justify-center gap-6">
				{cards.map((card, index) => (
					<div
						key={index}
						className="relative w-[200px] h-[350px] rounded-lg bg-white p-6 flex flex-col items-center text-center"
					>
						<Image
							src={card.image}
							alt={card.title}
							width={64}
							height={64}
							className="invert mb-4 object-contain"
						/>
						<h3 className="text-lg font-bold mb-2">{card.title}</h3>
						<p className="text-sm text-gray-600 mb-10">{card.description}</p>

						{/* Show Corner */}
						<div className="cta-container">
							<div className="content">
								<FaArrowLeftLong />
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default GroupSection;
