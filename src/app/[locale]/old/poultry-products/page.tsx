"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PoultryProductsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/products");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500"></div>
    </div>
  );
}
