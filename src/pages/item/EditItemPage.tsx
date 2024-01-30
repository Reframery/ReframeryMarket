import { useParams } from "react-router-dom"

import { useItemQuery } from "app/services/item"
import { handleRTKError } from "lib/utils"

import ItemForm from "components/forms/ItemForm"

export default function EditItemPage() {
  const { id } = useParams()

  const { data: item, isFetching, error } = useItemQuery(Number(id))
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Edit Item</h1>
      {isFetching ? (
        "loading..."
      ) : error ? (
        handleRTKError(error)
      ) : item ? (
        <ItemForm defaultValues={item} />
      ) : (
        "No item found"
      )}
    </>
  )
}
