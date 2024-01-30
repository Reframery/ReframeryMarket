import { zodResolver } from "@hookform/resolvers/zod"
import { useCreateItemMutation, useUpdateItemMutation } from "app/services/item"
import { useAuth } from "hooks/useAuth"
import { handleRTKError } from "lib/utils"
import { RegionDropdown } from "react-country-region-selector"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"

import { Button } from "components/ui/Button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/Form"
import { Input } from "components/ui/Input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/Select"

const coercedNumber = z.coerce
  .number({
    required_error: "Required",
    invalid_type_error: "Must be a number",
  })
  .min(0, "Must be positive")

const createItemSchema = z.object({
  itemName: z.string().max(50, "Must be less than 50 characters"),
  unitPrice: coercedNumber,
  stock: coercedNumber,
  description: z.string().optional(),
  category: z.enum(["product", "expertise", "service"]),
  subcategory: z.string().optional(),
  discount: coercedNumber.max(100, "Must be less than 100%"),
  province: z.string(),
  city: z.string().optional(),
  itemImage: z.string().url(),
})

export type CreateItem = z.infer<typeof createItemSchema>

export default function ItemForm({
  defaultValues,
}: {
  defaultValues?: MarketItem
}) {
  const navigate = useNavigate()
  const { user } = useAuth()

  const form = useForm<CreateItem>({
    resolver: zodResolver(createItemSchema),
    defaultValues: defaultValues
      ? {
          ...defaultValues,
          description: defaultValues.description ?? undefined,
          subcategory: defaultValues.subcategory ?? undefined,
          city: defaultValues.city ?? undefined,
        }
      : {
          stock: 0,
          unitPrice: 0,
          discount: 0,
          category: "product",
        },
  })

  const [createItem, { error: createError }] = useCreateItemMutation()
  const [updateItem, { error: updateError }] = useUpdateItemMutation()

  const communityName = user?.marketProfile.communityName ?? "community"

  async function onSubmit(values: CreateItem) {
    try {
      const data = {
        ...values,
        communityName,
      }
      const message = await (
        defaultValues
          ? updateItem({ id: defaultValues.id, ...data })
          : createItem(data)
      ).unwrap()
      toast(message)
      navigate("/items")
    } catch (err) {
      const error = defaultValues ? updateError : createError
      error &&
        toast(handleRTKError(error), {
          type: "error",
        })
    }
  }

  const subcategoryMap = {
    product: [
      "beauty & personal care",
      "books & stationery",
      "clothing & apparel",
      "crafts",
      "electronics",
      "food & beverages",
      "health & wellness",
      "home & kitchen",
      "pets",
      "sports & outdoors",
      "toys",
    ],
    service: ["home maintenance", "landscaping"],
    expertise: ["consulting", "training"],
  }

  const category = form.watch("category")

  return (
    <Form {...form}>
      <form
        className="space-y-4 max-w-xl"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Birthday Cake" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unitPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    placeholder="e.g. 35"
                    type="number"
                    step="0.01"
                    min={0}
                    className="rounded-r-none self-stretch h-auto z-10 max-w-36"
                    {...field}
                  />
                  <p className="px-1.5 py-1 bg-muted border rounded-r-md text-muted-foreground">
                    $
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    placeholder="e.g. 15"
                    min={0}
                    type="number"
                    className="rounded-r-none self-stretch h-auto z-10 max-w-36"
                    {...field}
                  />
                  <p className="px-1.5 py-1 bg-muted border rounded-r-md text-muted-foreground">
                    Units
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Perfect for celebrating memorable days"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-- Select category --" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                  <SelectItem value="expertise">Expertise</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subcategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subcategory</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={!category}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="-- Select subcategory --" />
                  </SelectTrigger>
                </FormControl>
                {category && (
                  <SelectContent>
                    {subcategoryMap[category].map((x) => (
                      <SelectItem value={x} key={x}>
                        {x}
                      </SelectItem>
                    ))}
                  </SelectContent>
                )}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Select Location</FormLabel>
              <FormControl>
                <div className="flex">
                  <RegionDropdown
                    country={
                      communityName.charAt(0).toUpperCase() +
                      communityName.slice(1)
                    }
                    classes="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 rounded-r-none focus:z-10"
                    value={field.value}
                    name={field.value}
                    onChange={(value) => {
                      if (value !== "") field.onChange(value)
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="City (optional)"
                            className="rounded-l-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input
                    placeholder="15"
                    min={0}
                    max={100}
                    type="number"
                    className="rounded-r-none self-stretch h-auto z-10 max-w-24"
                    {...field}
                  />
                  <p className="px-1.5 py-1 bg-muted border rounded-r-md text-muted-foreground">
                    %
                  </p>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="itemImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Image</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please upload the image on hosting service, copy and paste the
                image URL back to the input field.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2 justify-end">
          <Link to="/items" className="button is-light">
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            {defaultValues ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

/*
TODO Image backend not yet implemented
<div className="file is-boxed is-success has-name mt-4 mb-4">
    <label className="file-label">
        <input className="file-input" type="file" name="resume" />
        <span className="file-cta">
            <span className="file-icon">
                <i className="fas fa-upload"></i>
            </span>
            <span className="file-label">
                Image for Item
            </span>
        </span>
        <span className="file-name has-text-centered">
            No File Selected
        </span>
    </label>
</div>
*/
