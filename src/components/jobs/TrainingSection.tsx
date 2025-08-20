import React from "react";
import Image from "next/image";
import Section from "@/components/Section";

const TrainingSection: React.FC = () => {
	const trainingCards = [
		{
			image: "/jobs/training1.jpg",
			imageAlt: "Employee Training Assessment",
			paragraph: "تقوم امل الخير بدراسة الاحتياجات التدريبية للموظفين بشكل دوري من أجل تطوير أدوارهم الوظيفية وتحسين أدائهم، إذ يعد التدريب أحد استراتيجيات المراعي للاستثمار في العنصر البشري."
		},
		{
			image: "/jobs/training2.jpg",
			imageAlt: "Specialized Training Institutes",
			paragraph: "كما تُلحق مل الخير موظفيها حسب حاجة العمل بدورات تدريب فردية في معاهد متخصصة."
		},
		{
			image: "/jobs/training3.png",
			imageAlt: "On-the-Job Training Programs",
			paragraph: "تعمل المراعي على تلبية الاحتياجات التدريبية للموظفين عبر حزمة من برامج التدريب على رأس العمل التي تزود الموظف بالمهارات التطبيقية والفنية اللازمة لتطوير عمله."
		}
	];

	return (
		<Section className="py-16 bg-gray-50">
			<div className="container mx-auto px-4">
				{/* Section Heading */}
				<div className="text-center mb-12">
					<h2 className="text-3xl font-bold text-gray-900 mb-4">
						برامج التدريب والتطوير
					</h2>
					<p className="text-lg text-gray-600 max-w-3xl mx-auto">
						نستثمر في تطوير موظفينا من خلال برامج تدريبية شاملة ومتخصصة
					</p>
				</div>

				{/* Training Cards using NewsCard structure */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{trainingCards.map((card, index) => (
						<div
							key={index}
							className="bg-white p-3 rounded-lg overflow-hidden relative"
						>
							{/* Card Image Container */}
							<div className="relative rounded-lg overflow-hidden">
								<Image
									src={card.image}
									alt={card.imageAlt}
									width={400}
									height={250}
									className="w-full h-48 object-cover rounded-lg"
								/>

								{/* bottom static curve */}
								<div
									className="
										absolute bottom-0 right-0
										h-4
										border-lg
										w-[60%]
										flex items-center justify-center
										overflow-visible
										rounded-tl-xl
									"
									style={{
										backgroundColor: "white",
									}}
								>
									{/* Top pseudo-element equivalent */}
									<div
										className="absolute bottom-0 left-0 -translate-x-full w-2 h-2"
										style={{
											background: `radial-gradient(circle at top left, transparent 70%, white 0%)`,
										}}
									/>

									{/* Right pseudo-element equivalent */}
									<div
										className="absolute top-0 right-0 -translate-y-full  w-2 h-2"
										style={{
											background: `radial-gradient(circle at top left, transparent 70%, white 0%)`,
										}}
									/>
								</div>
							</div>

							{/* Card Content - only paragraph */}
							<div className="p-6">
								<p className="text-gray-600 leading-relaxed text-lg text-center">
									{card.paragraph}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</Section>
	);
};

export default TrainingSection;
