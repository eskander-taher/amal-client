import React from "react";
import Section from "../Section";

type Align = "center" | "start" | "end";
type Width = "sm" | "md" | "lg" | "xl";

const alignMap: Record<Align, string> = {
  center: "text-center",
  start: "text-right", // RTL start
  end: "text-left",   // RTL end
};

const widthMap: Record<Width, string> = {
  sm: "max-w-prose",
  md: "max-w-2xl",
  lg: "max-w-3xl",
  xl: "max-w-4xl",
};

export default function HeadingParagraph({
  title,
  text,
  align = "center",
  width = "lg",
  className = "",
  dir = "rtl",
}: {
  title: string;
  text: string;
  align?: Align;
  width?: Width;
  className?: string;
  dir?: "rtl" | "ltr";
}) {
  return (
    <Section
      dir={dir}
      className={`mx-auto px-4 md:px-6 ${alignMap[align]} ${className}`}
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
        {title}
      </h2>

      <p className="text-base md:text-lg text-gray-500 leading-8 md:leading-9">
        {text}
      </p>
    </Section>
  );
}
