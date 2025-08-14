// import Image from "next/image";
import Section from "../Section";

export default function CompanyOverview() {
  return (
		<Section className="text-white relative bg-white">
			<div className="flex flex-col md:flex-row items-start justify-between gap-10">
				{/* Title Block */}
				<div>
					<h2 className="text-[32px] md:text-[36px] font-bold text-[#1F1F1F] leading-[1.2]">
						حول شركة
						<br />
						أمل الخير
						<br />
						القابضة
					</h2>
				</div>

				{/* Text Block */}
				<div className="w-full md:w-2/3 mx-auto text-center md:text-right">
					<p className="text-[#686868] text-[18.89px] leading-[1.6] tracking-[-0.22px]">
						تمارس المجموعة أعمالها في المملكة العربية السعودية، وتعد من الشركات الرائدة
						على المستوى المحلي والإقليمي في مجال إنتاج الدواجن والأعلاف الحيوانية والأسماك
						والتمور.
						<br />
						كما تمتلك بنية مالية ثابتة وتجارية واستراتيجية قوية للاستفادة من الفرص
						الاستثمارية المتاحة، مما مكّنها من النمو المستمر مع توقع مستقبلي على مضاعفة
						قدرتها الإنتاجية.
						<br />
						كما نجحت الشركة في التصدير إلى عدد من الأسواق العالمية عبر شركاء التوزيع
						العالميين، وباتت مجموعة أمل الخير القابضة واحدة من الشركات الرائدة في مجال
						إنتاج الدواجن والأعلاف الحيوانية والأسماك والتمور إقليميًا.
					</p>
				</div>
			</div>
		</Section>
  );
}
