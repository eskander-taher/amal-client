import CardLink from "./CardLink";

export default function Card() {
	return (
		<div className="relative w-full h-[350px] rounded-lg bg-white p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
			<div>hello</div>
			<CardLink />
		</div>
	);
}
