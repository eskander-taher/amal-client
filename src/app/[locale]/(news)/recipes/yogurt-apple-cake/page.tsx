import Image from "next/image";
import Section from "@/components/Section";
import RecipeCard from "@/components/RecipeCard";
import { Link } from "@/i18n/navigation";

export default function Page() {
	const ingredients: string[] = [
		"2 كوب دقيق",
		"1 كوب سكر",
		"1 كوب زبادي",
		"3 بيضات",
		"1/2 كوب زبدة مذابة",
		"2 تفاح مقطع شرائح رفيعة",
		"1 ملعقة صغيرة بيكنج باودر",
		"1/2 ملعقة صغيرة فانيلا",
		"رشة قرفة (اختياري)",
	];

	const steps: string[] = [
		"سخّني الفرن إلى 180 درجة مئوية، وادهني قالب الكيك بالزبدة ورشّي عليه قليلًا من الدقيق.",
		"اخفقي البيض والسكر حتى يصبح الخليط هشًا، ثم أضيفي الزبادي والزبدة والفانيلا وامزجي جيدًا.",
		"اخلطي الدقيق والبيكنج باودر (والقرفة إن رغبتِ) ثم أضيفيه تدريجيًا إلى الخليط مع التحريك حتى يتجانس.",
		"رتّبي شرائح التفاح في قاع القالب بشكل حلزوني جميل، ثم اسكبي خليط الكيك فوقها.",
		"اخبزي الكيك لمدة 30–35 دقيقة أو حتى يخرج عود الأسنان نظيفًا من الوسط.",
		"اقلبي الكيك برفق وقدّميه مزينًا بشرائح التفاح المكرملة أو رذاذ الكراميل حسب الرغبة.",
	];

	const moreRecipes = [
		{
			image: "/poultry.webp",
			title: "بان كيك بالشوكولاتة",
			description: "بان كيك هش مزين برذاذ الشوكولاتة.",
			href: "/recipes/yogurt-apple-cake",
			badgeText: "حلى",
		},
		{
			image: "/poultry.webp",
			title: "كيك الزبادي بالتفاح",
			description: "كيك رطب بالتفاح والزبادي بطعم منزلي.",
			href: "/recipes/yogurt-apple-cake",
			badgeText: "كيك",
		},
		{
			image: "/poultry.webp",
			title: "تشيز كيك بالفواكه",
			description: "تشيز كيك خفيف مزيّن بفاكهة طازجة.",
			href: "/recipes/yogurt-apple-cake",
			badgeText: "حلى",
		},
		{
			image: "/poultry.webp",
			title: "كيكة الكراميل",
			description: "كيك لذيذ بطبقة كراميل ذهبية.",
			href: "/recipes/yogurt-apple-cake",
			badgeText: "كيك",
		},
	];

	return (
		<>
			{/* Top orange banner */}
			<div className="w-full bg-[#F9AE42] relative overflow-visible -mb-16 md:-mb-24">
				<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
						{/* Textual content */}
						<div className="order-2 md:order-2 text-black">
							<h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-4">
								كيك الزبادي بالتفاح
							</h1>
							<div className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:text-base mb-3 text-gray-900">
								<span>وقت التحضير: 15 دقيقة</span>
								<span> المكونات: 10 مكونات</span>
							</div>
							<p className="text-sm sm:text-base text-gray-900/90">
								استمتعي بكيك الزبادي بالتفاح السهل بخطوات بسيطة ولذيذة مناسبة
								للضيافات في المنزل.
							</p>
						</div>

						{/* Image on the right */}
						<div className="order-1 md:order-1 justify-self-center translate-y-1/3 z-10">
							<Image
								src="/recipe_details.webp"
								alt="كيك الزبادي بالتفاح"
								width={560}
								height={360}
								className="w-full max-w-md h-auto"
								priority
							/>
						</div>
					</div>
				</div>
			</div>

			{/* Main content */}
			<Section className="my-40">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
					{/* Ingredients – right side in RTL */}
					<div className="md:order-1">
						<h2 className="text-xl font-bold mb-4 text-gray-900">المكوّنات</h2>
						<ul className="list-disc list-inside space-y-2 text-gray-700 leading-8">
							{ingredients.map((item, idx) => (
								<li key={idx}>{item}</li>
							))}
						</ul>
					</div>

					{/* Steps – left side */}
					<div className="md:order-2">
						<h2 className="text-xl font-bold mb-4 text-gray-900">طريقة التحضير</h2>
						<ol className="list-decimal list-inside space-y-3 text-gray-700 leading-8">
							{steps.map((step, idx) => (
								<li key={idx}>{step}</li>
							))}
						</ol>
					</div>
				</div>
			</Section>

			{/* More recipes */}
			<Section className="bg-gray-200">
				<h3 className="text-2xl text-center font-extrabold text-gray-900 mb-6">
					مزيد من وصفات أمل الخير
				</h3>
				<div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-2 px-2">
					{moreRecipes.map((r, i) => (
						<div className="min-w-[280px] max-w-[320px] snap-start" key={i}>
							<RecipeCard
								image={r.image}
								imageAlt={r.title}
								title={r.title}
								description={r.description}
								href={r.href}
								badgeText={r.badgeText}
							/>
						</div>
					))}
				</div>

				<div className="mt-4 flex justify-center">
					<Link
						href="/recipes"
						className="w-full sm:w-auto inline-flex items-center gap-2 bg-white border border-gray-300 rounded-full px-5 py-3 text-gray-700 shadow-sm hover:bg-gray-100"
					>
						<span className="i-heroicons-magnifying-glass-20-solid hidden" />
						<span>مزيد من الوصفات</span>
					</Link>
				</div>
			</Section>
		</>
	);
}
