"use server";

import prisma from "@/db/db";
import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
import { put, del } from "@vercel/blob";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const fileSchema = z.instanceof(File, { message: "Image required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
  "Image required"
);

const addSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().positive(),
  stock: z.coerce.number().int().positive(),
  desc: z.string(),
  image: imageSchema.refine((file) => file.size > 0, "Image required"),
});

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  // await fs.mkdir("public/products", { recursive: true });
  // const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`;
  // await fs.writeFile(
  //   `public${imagePath}`,
  //   Buffer.from(await data.image.arrayBuffer())
  // );

  const imageFile = data.image as File;
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });

  const prod = await prisma.product.create({
    data: {
      name: data.name,
      stock: data.stock,
      priceInCents: data.price,
      description: data.desc,
      imagePath: blob.url,
    },
  });

  stripe.products.create({
    name: prod.name,
    id: prod.id,
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  image: fileSchema.optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  const product = await prisma.product.findUnique({ where: { id } });

  if (product == null) return;

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await del(imagePath);
    const imageFile = data.image as File;
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    imagePath = blob.url
  }

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      stock: data.stock,
      priceInCents: data.price,
      description: data.desc,
      imagePath: imagePath,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({ where: { id } });
  if (product == null) return;
  await stripe.products.del(product.id);
  await del(product.imagePath);
  // if( product == null) return notFound();
}
