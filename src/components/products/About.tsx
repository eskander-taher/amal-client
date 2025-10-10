import Image from "next/image";
import Section from "../Section";

export default function About() {
  return (
		<Section className="py-16 bg-white">
			<div className="container mx-auto px-4">
				<div className="max-w-6xl mx-auto">
					<div className="flex flex-col md:flex-row-reverse items-center gap-12">
						{/* Image Column - Right Side (1/3) */}
						<div className="w-full md:w-2/3 flex  justify-center">
							<div>
								<h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center md:text-right">
									شركة أمل الخير للدواجن
								</h2>
								<p className="text-gray-700 leading-relaxed text-justify text-lg">
									يفتخر مجتمع الأعمال أن يقدم إليكم إحدى أكبر وأعرق شركات صناعة
									الدواجن في المملكة العربية السعودية والتي تأسست عام 1995 على يد
									رجل الأعمال أحمد محمد بلقاس - رحمه الله - أحد أهم المؤسسات
									التجارية في عام 1995 على يد رجل الأعمال أحمد محمد بلقاس - رحمه
									الله - أحد أهم المؤسسات التجارية في المملكة وتعتبر شركة أمل
									الخير للدواجن من أكبر الشركات المتخصصة في مجال الدواجن والتي
									تهدف إلى تقديم أفضل المنتجات ذات الجودة العالية للمستهلك الكريم
									وتسعى الشركة إلى الاستمرار في تطوير منتجاتها وخدماتها.
								</p>
							</div>
						</div>

						{/* Text Column - Left Side (2/3) */}
						<div className="w-full md:w-1/3">
							<div className="w-48 h-56 bg-[#f5f5f7] rounded-full overflow-hidden flex items-center justify-center">
								<Image
									src="/products/about.svg"
									alt="about image"
									width={292}
									height={200}
									className="object-contain"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
  );
}
