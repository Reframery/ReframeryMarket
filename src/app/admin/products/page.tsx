import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/db/db";
import { formatCurrency } from "@/lib/formatter";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Delete, MoreVertical } from "lucide-react";
import { DeleteDropdownItem } from "./_components/ProductAction";

export default function AdminsProductPage() {
  return (
    <>
      <div className="flex justify-between items-center gap-4">
        <PageHeader>Products</PageHeader>
        <Button>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductsTable />
    </>
  );
}

async function ProductsTable() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      priceInCents: true,
      _count: { select: { order: true } },
    },
    orderBy: { name: "asc" },
  });

  if(products.length === 0) {
    return <div>No products found</div>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>{product.name}</TableCell>
            <TableCell>{formatCurrency(product.priceInCents/100)}</TableCell>
            <TableCell>{product._count.order}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    {/* Edit Product */}
                    <Link href={`/admin/products/${product.id}/edit`}>Edit</Link>
                  </DropdownMenuItem>
                  <DeleteDropdownItem id={product.id} disabled={product._count.order > 0} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
