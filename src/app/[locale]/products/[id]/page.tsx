import Hero from '@/components/productPage/Hero'
import ProductDetails from '@/components/productPage/ProductDetails'
import React from 'react'

function page() {
  return (
    <div className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('/bg.jpg')] bg-repeat opacity-3" />
      <Hero />
      <ProductDetails />
    </div>
  )
}

export default page