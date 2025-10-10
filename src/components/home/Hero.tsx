"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaArrowLeftLong, FaArrowRightLong, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import Section from "../Section";
import { useLocale } from "next-intl";
import { TransitionLink } from "../TransitionLink";
import { useHero } from "@/hooks/useHero";
import { getServerUrl } from "@/lib/apiBase";

const Hero: React.FC = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const { slides, loading, error } = useHero();
	const local = useLocale();

	// Fallback carousel slides if API fails or no data
	const fallbackSlides = [
		{
			src: "/hero.webp",
			alt: local === "ar" ? "مجموعة أمل الخير القابضة" : "Amal Al Khair Holding Group",
			title: local === "ar" ? "مرحبًا بكم في مجموعة أمل الخير القابضة" : "Welcome to Amal Al Khair Holding Group",
			description: local === "ar" ? "اكتشف المنتجات عالية الجودة المصممة لتناسب احتياجاتك." : "Discover high-quality products designed to meet your needs.",
			buttonText: local === "ar" ? "المزيد" : "More",
			href: "/about",
		},
		{
			src: "/products-hero.webp",
			alt: local === "ar" ? "صورة خلفية" : "Background image",
			title: local === "ar" ? "اكتشف منتجاتنا" : "Discover Our Products",
			description: local === "ar" ? "استكشف مجموعة واسعة من منتجاتنا عالية الجودة المصممة لتلبية توقعاتك." : "Explore our wide range of high-quality products designed to meet your expectations.",
			buttonText: local === "ar" ? "المزيد" : "More",
			href: "/products",
		},
	];

	// Use dynamic slides if available, otherwise use fallback
	const carouselSlides = slides.length > 0 ? slides.map(slide => ({
		src: getServerUrl(slide.image) || "/hero.webp",
		alt: slide.alt[local as keyof typeof slide.alt] || slide.alt.ar,
		title: slide.title[local as keyof typeof slide.title] || slide.title.ar,
		description: slide.description[local as keyof typeof slide.description] || slide.description.ar,
		buttonText: slide.buttonText[local as keyof typeof slide.buttonText] || slide.buttonText.ar,
		href: slide.href,
	})) : fallbackSlides;

	// Auto-advance carousel
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
		}, 5000); // Change slide every 5 seconds

		return () => clearInterval(timer);
	}, [carouselSlides.length]);

	// Navigation functions
	const nextSlide = () => {
		setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
	};

	const prevSlide = () => {
		setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	const currentSlideData = carouselSlides[currentSlide];

	// Show loading state
	if (loading) {
		return (
			<Section id="hero" className="relative w-full h-screen bg-black overflow-hidden">
				<div className="absolute inset-0 z-10 flex items-center justify-center">
					<div className="text-white text-center">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
						<p className="text-lg">Loading...</p>
					</div>
				</div>
			</Section>
		);
	}

	// Show error state (but still show fallback slides)
	if (error) {
		console.error('Hero slides error:', error);
	}

	return (
		<Section id="hero" className="relative w-full h-screen bg-black overflow-hidden">
			{/* Carousel Background Images */}
			{carouselSlides.map((slide, index) => (
				<div
					key={index}
					className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
						index === currentSlide ? "opacity-100" : "opacity-0"
					}`}
				>
					<Image
						src={slide.src}
						alt={slide.alt}
						fill
						className="object-cover"
						priority={index === 0}
					/>
					{/* Overlay */}
					<div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.9)_100%)]" />
				</div>
			))}

			{/* Content */}
			<div className="absolute inset-0 z-10 flex w-full h-full">
				<div className="flex flex-col justify-center w-full md:w-1/2 h-full px-12 sm:px-16 lg:px-24">
					<div
						key={currentSlide}
						className="transition-all duration-700 ease-in-out animate-fade-in"
					>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg leading-relaxed">
							{currentSlideData.title}
						</h1>
						<p className="text-lg md:text-2xl text-white/90 mb-8 max-w-2xl animate-fade-in-delay">
							{currentSlideData.description}
						</p>
						<TransitionLink
							href={currentSlideData.href}
							className={`relative group bg-white flex justify-between items-center text-black rounded-full font-bold text-lg shadow-lg px-1.5 py-1 animate-fade-in-delay-2 transition-[width,background,shadow] duration-300 ease-in-out overflow-hidden w-[44px] h-[44px] hover:w-[110px]`}
						>
							<p className="absolute right-4 hidden group-hover:block whitespace-nowrap transition-all duration-900">
								{currentSlideData.buttonText}
							</p>
							<div className="absolute left-1.5 bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
								{local === "ar" ? (
									<FaArrowLeftLong className="text-white text-sm" />
								) : (
									<FaArrowRightLong className="text-white text-sm" />
								)}
							</div>
						</TransitionLink>
					</div>
				</div>
				<div className="hidden md:block w-1/2"></div>
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className="absolute hidden sm:block left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-yellow-500 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
				aria-label="Previous slide"
			>
				<FaChevronLeft className="text-md" />
			</button>
			<button
				onClick={nextSlide}
				className="absolute hidden sm:block right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-yellow-500 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
				aria-label="Next slide"
			>
				<FaChevronRight className="text-md" />
			</button>

			{/* Bottom static curve */}
			<motion.div
				className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
			>
				<div
					className="upward-tab flex items-center justify-center gap-3"
					style={{ paddingInline: "30px" }}
				>
					{carouselSlides.map((_, index) => (
						<motion.button
							key={index}
							onClick={() => goToSlide(index)}
							className={`w-2.5 h-2.5 -mb-0.5 rounded-full transition-all duration-300 cursor-pointer  ${
								index === currentSlide
									? "bg-[#E3A347] scale-125"
									: "bg-[#f5f5f7] hover:bg-[#f5f5f7]/70"
							}`}
							aria-label={`Go to slide ${index + 1}`}
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
							whileHover={{ scale: 1.2 }}
							whileTap={{ scale: 0.9 }}
						/>
					))}
				</div>
			</motion.div>
		</Section>
	);
};

export default Hero;
