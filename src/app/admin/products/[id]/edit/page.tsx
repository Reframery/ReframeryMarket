import prisma from "@/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findUnique({ where: { id: params.id } })
  return (
    <>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product}/>
    </>
  );
}
