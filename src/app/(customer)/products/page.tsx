import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import prisma from "@/db/db";
import { cache } from "@/lib/cache";
import Link from "next/link";
import { Suspense } from "react";

// convert to use cache similar to getMostPopularProducts
const getProducts = cache(()=> {
  return prisma.product.findMany({orderBy: { name: "asc" }});
}, ["/products", "getProducts"]);

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </> 
        }>
          <ProductsSuspense />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();
  return products.map((product) => (
    <ProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      priceInCents={product.priceInCents}
      description={product.description}
      imagePath={product.imagePath}
    />
  ));
}