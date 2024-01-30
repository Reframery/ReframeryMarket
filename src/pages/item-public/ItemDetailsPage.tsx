import { Link, useParams } from "react-router-dom"
import { toast } from "react-toastify"

import { useAddCartItemMutation } from "app/services/cart"
import { useItemQuery } from "app/services/item"
import { useAuth } from "hooks/useAuth"
import { handleRTKError } from "lib/utils"

import SideBar from "components/SideBar"
import MessageBox from "components/ui/MessageBox"
import Rating from "components/Rating"

export default function ItemDetails() {
  const { id } = useParams()
  const { user } = useAuth()

  const { data: item, isFetching, error } = useItemQuery(Number(id))

  const [addItem, { error: addItemError, isLoading: addItemLoading }] =
    useAddCartItemMutation()

  if (isFetching) return "Loading..."

  if (error) return handleRTKError(error)

  const addItemHandler = async (itemId: number, quantity: number = 1) => {
    try {
      const message = await addItem({ itemId, quantity }).unwrap()
      toast(message)
    } catch (err) {
      addItemError && toast(handleRTKError(addItemError))
    }
  }

  return (
    <div>
      <div className="sidebar-content">
        {user ? <SideBar /> : null}
        <div className="container">
          {item && (
            <div className="item-page">
              <div className="details">
                <div className="details-c1">
                  <div>
                    <h1>{item.itemName}</h1>
                  </div>
                  <div className="details-image">
                    <img src={item.itemImage ?? ""} alt="product"></img>
                  </div>
                  <div className="details-buttons">
                    {error && (
                      <MessageBox variant="danger">
                        {handleRTKError(error)}
                      </MessageBox>
                    )}
                    <div>
                      <button
                        className="button-addToCart"
                        onClick={() => addItemHandler(item.id)}
                      >
                        <h3>{addItemLoading ? "Adding..." : "Add to Cart"}</h3>
                      </button>
                    </div>
                  </div>
                  <div>
                    <Link to={`/${user?.marketProfile.communityName}`}>
                      <h3 className="back-to-mar">Back to marketplace</h3>
                    </Link>
                  </div>
                </div>
                <div className="details-information">
                  <div>
                    <div className="details-title">
                      <h1>Item Details</h1>
                    </div>
                    <ul>
                      <li>
                        Rating:
                        <Rating
                          rating={item.averageRating ?? 0}
                          numOfReviews={item.numberOfFeedbacks}
                        ></Rating>
                      </li>
                      <li> Price: ${item.unitPrice}</li>
                      <li>
                        {" "}
                        Address:{" "}
                        <span>
                          {item.city}, {item.province}
                        </span>
                      </li>
                      <li>
                        <div className="row">
                          <div>Status:</div>
                          <div>
                            {item.stock > 0 ? (
                              <span className="sucess">In Stock</span>
                            ) : (
                              <span className="danger">Out of Stock</span>
                            )}
                          </div>
                        </div>
                      </li>
                      <li className="details-description">
                        Description:{" "}
                        <p className="details-description-content">
                          {item.description}
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
