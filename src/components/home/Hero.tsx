"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { FaArrowLeftLong, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
	const t = useTranslations("HomePage");
	const [currentSlide, setCurrentSlide] = useState(0);

	// Carousel images with dynamic content
	const carouselSlides = [
		{
			src: "/hero.jpg",
			alt: "Hero background image",
			title: t("heroTitle"),
			description: t("heroDescription"),
			buttonText: t("heroButton"),
		},
		{
			src: "/bg.jpg",
			alt: "Background image",
			title: "اكتشف منتجاتنا",
			description:
				"استكشف مجموعة واسعة من منتجاتنا عالية الجودة المصممة لتلبية احتياجاتك وتجاوز توقعاتك.",
			buttonText: "تسوق الآن",
		},
		{
			src: "/about.jpg",
			alt: "About background image",
			title: "عن شركتنا",
			description: "تعرف على مهمتنا وقيمنا والتزامنا بتقديم التميز في كل ما نقوم به.",
			buttonText: "اعرف المزيد",
		},
		{
			src: "/products/product1.png",
			alt: "Product image",
			title: "جودة متميزة",
			description: "اختبر الفرق مع منتجاتنا عالية الجودة التي تصمد أمام اختبار الزمن.",
			buttonText: "عرض المنتجات",
		},
	];

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

	return (
		<section className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
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
					<div className="absolute inset-0 bg-black/40" />
				</div>
			))}

			{/* Content */}
			<div className="relative z-10 flex w-full h-full">
				<div className="flex flex-col justify-center items-start md:items-start w-full md:w-1/2 h-full py-24 px-4 md:px-16 text-left">
					<div
						key={currentSlide}
						className="transition-all duration-700 ease-in-out animate-fade-in"
					>
						<h1 className="text-4xl text-right md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
							{currentSlideData.title}
						</h1>
						<p className="text-lg text-right md:text-2xl text-white/90 mb-8 max-w-2xl animate-fade-in-delay">
							{currentSlideData.description}
						</p>
						<button className="bg-white text-black px-4 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:bg-gray-100 hover:shadow-xl flex items-center gap-3 group h-14 animate-fade-in-delay-2">
							<span>{currentSlideData.buttonText}</span>
							<div className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
								<FaArrowLeftLong className="text-white text-sm" />
							</div>
						</button>
					</div>
				</div>
				<div className="hidden md:block w-1/2"></div>
			</div>

			{/* Navigation Arrows */}
			<button
				onClick={prevSlide}
				className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
				aria-label="Previous slide"
			>
				<FaChevronLeft className="text-md" />
			</button>
			<button
				onClick={nextSlide}
				className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm cursor-pointer"
				aria-label="Next slide"
			>
				<FaChevronRight className="text-md" />
			</button>

			{/* Bottom static curve */}
			<motion.div
				className="absolute w-80 h-8 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 bg-white rounded-t-full flex justify-center items-top pt-1 gap-3 z-30"
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
			>
				{carouselSlides.map((_, index) => (
					<motion.button
						key={index}
						onClick={() => goToSlide(index)}
						className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
							index === currentSlide
								? "bg-[#E3A347] scale-125"
								: "bg-gray-200 hover:bg-gray-200/70"
						}`}
						aria-label={`Go to slide ${index + 1}`}
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
					/>
				))}
			</motion.div>
		</section>
	);
};

export default Hero;
