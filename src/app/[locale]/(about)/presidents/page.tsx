import Hero from "@/components/Hero";
import React from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function PresidentsPage() {
  const t = useTranslations("Presidents");

  return (
    <>
      <Hero
        title={t("title")}
        image="/presidents/hero.jpg"
        imageAlt="Presidents hero background"
      />

      {/* First President Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Right Image */}

            <div className="relative">
              <Image
                src="/presidents/mr_hussam.png"
                alt={t("currentPresident.name")}
                width={500}
                height={600}
                className="w-full"
              />
            </div>

            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("currentPresident.name")}
              </h2>
              <h3 className="text-xl text-gray-600 font-semibold mb-6">
                {t("currentPresident.title")}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t("currentPresident.message")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second President Section */}
      <section className="relative py-16 bg-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Right Image */}
            <div>
              <div className="relative">
                <Image
                  src="/presidents/mr_hussam.png"
                  alt={t("formerPresident.name")}
                  width={500}
                  height={600}
                  className="w-full"
                />
              </div>
            </div>

            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t("formerPresident.name")}
              </h2>
              <h3 className="text-xl text-gray-600 font-semibold mb-6">
                {t("formerPresident.title")}
              </h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {t("formerPresident.message")}
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2/3 w-[60%] h-8 bg-gray-200 rounded-t-full pt-2 gap-3" />
      </section>
    </>
  );
}
