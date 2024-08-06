import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import prisma from "@/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";

// convert to use cache similar to getMostPopularProducts
const getNewestProducts = cache(
  () => {
    return prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
    });
  },
  ["/", "getNewestProducts"]
);

const getMostPopularProducts = cache(
  () => {
    return prisma.product.findMany({
      orderBy: { order: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopulrProducts"],
  { revalidate: 60 * 60 * 24 }
);

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection productsFetcher={getNewestProducts} title="Newest" />
      <ProductGridSection
        productsFetcher={getMostPopularProducts}
        title="Most Popular"
      />
    </main>
  );
}

type ProductGridSectionProps = {
  productsFetcher: () => Promise<Product[]>;
  title: string;
};

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  // const [products, setProducts] = useState<Product[]>([]);
  // useEffect(() => {
  //   productsFetcher().then(setProducts);
  // }, []);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <Button variant="outline" className="space-x-2" asChild>
          <Link href="/products">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
