import React from "react";
import Card from "./Card";

const data = [
  {
    date: "16 Feb 2025",
    title: "افتتاح متجر امر الخير للتمور",
    description:
      "شركة أمل الخير تطلق المتجر الإلكتروني الأول لها على الإنترنت يشمل جميع منتجاتها ويقدم خدمة الدفع عبر البطاقات الائتمانية أو بطاقة مدى أو الدفع نقداً بعد الاستلام كما يقدم العديد من ...",
    image: "/dates.jpg", // Replace with your actual image path
  },
  {
    date: "20 Mar 2025",
    title: "منتجات جديدة تم إضافتها",
    description:
      "تمت إضافة تشكيلات جديدة من التمور الفاخرة وعلب الهدايا المميزة بمناسبة شهر رمضان المبارك.",
    image: "/dates.jpg",
  },
  {
    date: "10 Apr 2025",
    title: "خصومات وعروض لفترة محدودة",
    description:
      "احصل على خصومات تصل إلى 30% على جميع أنواع التمور لفترة محدودة بمناسبة الافتتاح الكبير.",
    image: "/dates.jpg",
  },
];

const Carousel: React.FC = () => {
  return (
    <div className="w-full px-4 py-8">
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {data.map((item, index) => (
          <div key={index} className="flex-shrink-0">
            <Card {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
