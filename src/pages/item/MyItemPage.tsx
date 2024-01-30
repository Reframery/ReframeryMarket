import { Link } from "react-router-dom"
import { toast } from "react-toastify"

import { useDeleteItemMutation, useItemsQuery } from "app/services/item"
import { handleRTKError } from "lib/utils"

import { Button } from "components/ui/Button"
import LoadingBox from "components/ui/LoadingBox"
import MessageBox from "components/ui/MessageBox"
import { Badge } from "components/ui/Badge"
import { Edit, Trash2, View } from "lucide-react"
import { Separator } from "components/ui/Seperator"

export default function MyItemPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-4 flex justify-between items-center">
        Your Marketplace Items{" "}
        <Button asChild>
          <Link to="new">Create</Link>
        </Button>
      </h1>
      <Separator className="mb-4" />
      <CreatedItemList />
    </>
  )
}

function CreatedItemList() {
  const {
    data: items,
    isFetching,
    error,
    refetch,
  } = useItemsQuery({ page: 1, limit: 5, reversed: true })

  return (
    <div className="self-stretch max-w-6xl">
      {isFetching ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{handleRTKError(error)}</MessageBox>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 lg:gap-6 gap-4">
          {items?.map((item) => (
            <CreatedItem key={item.id} item={item} refetch={refetch} />
          ))}
        </div>
      )}
    </div>
  )
}

function CreatedItem(props: { item: MarketItem; refetch: () => unknown }) {
  const [deleteItem, { isLoading, error }] = useDeleteItemMutation()

  const removeItem = async (
    e: React.MouseEvent<HTMLButtonElement>,
    itemID: number
  ) => {
    e.preventDefault()
    const confirm = window.confirm("Are you sure to remove this item for sale?")
    if (confirm) {
      try {
        const message = await deleteItem(itemID).unwrap()
        toast(message)
        props.refetch()
      } catch (err) {
        error && toast(handleRTKError(error), { type: "error" })
      }
    }
  }

  const { item } = props

  return (
    <div className="flex flex-col border rounded-md overflow-hidden">
      <Link to={`./${item.id}`}>
        <img
          src={item.itemImage}
          alt={item.itemName}
          className="h-40 w-full object-cover"
        />
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h2 className="text-xl font-semibold flex justify-between">
          <Link to={`./${item.id}`}>{item.itemName}</Link>
          <Badge>{item.category}</Badge>
        </h2>
        {item.description && (
          <p className="text-muted-foreground">{item.description}</p>
        )}
        <p className="font-medium text-sm text-muted-foreground">
          Price: ${item.unitPrice}
        </p>
        {item.discount ? (
          <p className="font-medium text-sm text-muted-foreground">
            Discount: {item.discount}%
          </p>
        ) : null}
        <div className="flex gap-2 flex-col mt-auto">
          <Button
            disabled={isLoading}
            variant="secondary"
            asChild
            className="gap-2"
          >
            <Link to={`/${item.communityName}/item/${item.id}`}>
              <View className="w-4 h-4" /> View in market
            </Link>
          </Button>
          <Button
            disabled={isLoading}
            variant="secondary"
            asChild
            className="gap-2"
          >
            <Link to={`${item.id}`}>
              <Edit className="w-4 h-4" /> Edit
            </Link>
          </Button>
          <Button
            disabled={isLoading}
            variant="destructive"
            className="gap-2"
            onClick={(e) => removeItem(e, item.id)}
          >
            <Trash2 className="w-4 h-4" /> Remove
          </Button>
        </div>
      </div>
    </div>
  )
}
