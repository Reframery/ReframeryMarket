import { formatCurrency } from "@/lib/formatter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath
}: {
  id: string;
  name: string;
  priceInCents: number;
  description: string | null;
  imagePath: string;
}) {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath} fill alt={name} />
      </div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInCents / 100)}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3">{description}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full bg-richGreen">
          <Link href={`/products/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}


export function ProductCardSkeleton() {
  return (
    <Card className="flex overflow-hidden flex-col">
      <div className="relative w-full h-48 bg-gray-300 animate-pulse" />
      <CardHeader>
        <CardTitle className="animate-pulse">Product Name</CardTitle>
        <CardDescription className="animate-pulse">Price</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3 animate-pulse">Description</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full animate-pulse">
          Purchase
        </Button>
      </CardFooter>
    </Card>
  );
}