// import Image from "next/image";
import Section from "../Section";

export default function CompanyOverview() {
  return (
		<Section>
			<div className="flex flex-col md:flex-row items-start gap-6 sm:gap-8 lg:gap-12">
				{/* Mobile title - full width without breaks */}
				<h2 className="md:hidden font-bold text-xl sm:text-2xl lg:text-3xl w-full flex-shrink-0">
					حول شركة أمل الخــــير القابــــــضة
				</h2>
				
				{/* Desktop title - with line breaks */}
				<h2 className="hidden md:block font-bold text-xl sm:text-2xl lg:text-3xl md:w-48 lg:w-52 flex-shrink-0">
					حول شركة
					<br />
					أمل الخــــير
					<br />
					القابــــــضة
				</h2>

				<p className="text-justify text-sm sm:text-base lg:text-lg leading-relaxed">
					تمارس المجموعة أعمالها في المملكة العربية السعودية، وتعد من الشركات الرائدة على
					المستوى المحلي والإقليمي في مجال إنتاج الدواجن والأعلاف الحيوانية والأسماك
					والتمور. كما تمتلك بنية مالية ثابتة وتجارية واستراتيجية قوية للاستفادة من الفرص
					الاستثمارية المتاحة، مما مكّنها من النمو المستمر مع توقع مستقبلي على مضاعفة
					قدرتها الإنتاجية. كما نجحت الشركة في التصدير إلى عدد من الأسواق العالمية عبر
					شركاء التوزيع العالميين، وباتت مجموعة أمل الخير القابضة واحدة من الشركات الرائدة
					في مجال إنتاج الدواجن والأعلاف الحيوانية والأسماك والتمور إقليميًا.
				</p>
			</div>
		</Section>
  );
}
