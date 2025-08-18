import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Image from "next/image";

export default function Page() {
	return (
		<>
			<Hero title="خبر تجريبي" imageAlt="Dummy news hero image" image="/news-hero.jpg" />

			<Section>
				<div className="prose max-w-none rtl text-right text-gray-800">
					<p>
						هذا نص تجريبي لصفحة الخبر لعرض المحتوى أثناء مرحلة التطوير. يمكن استبداله لاحقًا
						بنصوص الخبر الحقيقية عند الجاهزية.
					</p>
				</div>
			</Section>

			{/* Images block: one full-width row, then a row with two images */}
			<Section className="py-6">
				<div className="grid grid-cols-1 gap-4">
					<div className="w-full">
						<Image
							src="/hero.jpg"
							alt="صورة خبر كاملة العرض"
							width={1280}
							height={720}
							className="w-full h-auto rounded-lg object-cover"
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<Image
							src="/about.jpg"
							alt="صورة جانبية 1"
							width={800}
							height={600}
							className="w-full h-auto rounded-lg object-cover"
						/>
						<Image
							src="/poultry.jpg"
							alt="صورة جانبية 2"
							width={800}
							height={600}
							className="w-full h-auto rounded-lg object-cover"
						/>
					</div>
				</div>
			</Section>

			<Section>
				<div className="prose max-w-none rtl text-right text-gray-800">
					<p>
						هذا نص إضافي بعد الصور لتجربة تنسيق الفقرات داخل صفحة الخبر. يساعد هذا النص على
						التحقق من تنسيق العناصر وتباعدها بالشكل المطلوب.
					</p>
				</div>
			</Section>

			<Section className="py-6">
				<Image
					src="/news-hero.jpg"
					alt="صورة إضافية"
					width={1200}
					height={600}
					className="w-full h-auto rounded-lg object-cover"
				/>
			</Section>
		</>
	);
}



