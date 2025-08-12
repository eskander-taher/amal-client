import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
	children: ReactNode;
	className?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ children, className, ...props }, ref) => {
	return (
		<section ref={ref} className={cn("w-full py-12 sm:py-16 lg:py-24", className)} {...props}>
			<div className={"w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"}>{children}</div>
		</section>
	);
});

Section.displayName = "Section";

export default Section;
