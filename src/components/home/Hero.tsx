"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaArrowLeftLong, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const Hero: React.FC = () => {
	const t = useTranslations("HomePage");
	const [currentSlide, setCurrentSlide] = useState(0);

	// Carousel images - using available images from public folder
	const carouselImages = [
		{
			src: "/hero.jpg",
			alt: "Hero background image",
		},
		{
			src: "/bg.jpg",
			alt: "Background image",
		},
		{
			src: "/about.jpg",
			alt: "About background image",
		},
		{
			src: "/products/product1.png",
			alt: "Product image",
		},
	];

	// Auto-advance carousel
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
		}, 5000); // Change slide every 5 seconds

		return () => clearInterval(timer);
	}, [carouselImages.length]);

	// Navigation functions
	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	return (
		<section className="relative w-full min-h-[60vh] flex items-center justify-center bg-black overflow-hidden">
			{/* Carousel Background Images */}
			{carouselImages.map((image, index) => (
				<div
					key={index}
					className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
						index === currentSlide ? "opacity-100" : "opacity-0"
					}`}
				>
					<Image
						src={image.src}
						alt={image.alt}
						fill
						className="object-cover"
						priority={index === 0}
					/>
					{/* Overlay */}
					<div className="absolute inset-0 bg-black/40" />
				</div>
			))}

			{/* Content */}
			<div className="relative z-10 flex w-full h-full">
				<div className="flex flex-col justify-center items-start md:items-start w-full md:w-1/2 h-full py-24 px-4 md:px-16 text-left">
					<h1 className="text-4xl text-right md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg animate-fade-in">
						{t("heroTitle")}
					</h1>
					<p className="text-lg text-right md:text-2xl text-white/90 mb-8 max-w-2xl animate-fade-in-delay">
						{t("heroDescription")}
					</p>
					<button className="bg-white text-black px-4 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl flex items-center gap-3 group h-14 animate-fade-in-delay-2">
						<span>{t("heroButton")}</span>
						<div className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
							<FaArrowLeftLong className="text-white text-sm" />
						</div>
					</button>
				</div>
				<div className="hidden md:block w-1/2"></div>
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
				aria-label="Previous slide"
			>
				<FaChevronLeft className="text-xl" />
			</button>
			<button
				onClick={nextSlide}
				className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
				aria-label="Next slide"
			>
				<FaChevronRight className="text-xl" />
			</button>

			{/* Bottom static curve */}
			<div className="absolute w-80 h-8 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 bg-white rounded-t-full flex justify-center items-top pt-1 gap-3 z-30">
				{carouselImages.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 ${
							index === currentSlide
								? "bg-[#E3A347] scale-125"
								: "bg-gray-200 hover:bg-gray-200/70"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</section>
	);
};

export default Hero;
