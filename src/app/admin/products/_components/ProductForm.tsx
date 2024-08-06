"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/formatter";
import { useState } from "react";
import { addProduct, updateProduct } from "../../_actions/products";
import { useFormState, useFormStatus } from "react-dom";
import { Product } from "@prisma/client";

export function ProductForm({product}: {product?: Product | null}) {
  const [error, action] = useFormState(product== null ? addProduct : updateProduct.bind(null, product.id), {})
  const [price, setPrice] = useState<number | undefined>(product?.priceInCents);

  return (
    <form className="space-y-8" action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" required defaultValue={product?.name} />
        {error?.name && <div className="text-destructive">{error.name}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Price In Cents</Label>
        <Input
          type="number"
          id="price"
          name="price"
          required
          value={price || ''}
          onChange={(e) => setPrice(Number(e.target.value) || undefined)}
        />
        <div className="text-muted-foreground">
          {formatCurrency((price || 0) / 100)}
        </div>
        {error?.price && <div className="text-destructive">{error.price}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="stock">Stock</Label>
        <Input type="number" id="stock" name="stock" required defaultValue={product?.stock}/>
        {error?.stock && <div className="text-destructive">{error.stock}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="desc">Description</Label>
        <Textarea id="desc" name="desc" defaultValue={product?.description ?? ""}/>
        {error?.desc && <div className="text-destructive">{error.desc}</div>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={product==null} />
        {product?.imagePath && (
          <img src={product.imagePath} alt={product.name} className="w-32 h-32 object-cover" />
        )}
        {error?.image && <div className="text-destructive">{error.image}</div>}
      </div>
      <SubmitButton />
    </form>
  );
}


function SubmitButton() {
  const {pending} = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
  );
}