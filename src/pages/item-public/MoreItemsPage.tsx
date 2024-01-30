import { useState } from "react"
import { Link, useParams } from "react-router-dom"

import { useCategoryItemsQuery } from "app/services/item"
import { handleRTKError } from "lib/utils"
import { useAuth } from "hooks/useAuth"

import Footer from "components/Footer"
import Header from "components/Header"
import SideBar from "components/SideBar"
import LoadingBox from "components/ui/LoadingBox"
import MessageBox from "components/ui/MessageBox"
import ListItem from "components/item-public/ItemList"

export default function MoreItemsPage() {
  const { community, category } = useParams() as {
    community: string
    category: string
  }

  const limit = 30
  const [pageNumber, setPageNumber] = useState(1)

  const { user } = useAuth()

  // handler for previous page
  const decreaseHandler = () => {
    setPageNumber(pageNumber - 1)
  }

  // handler for next page
  const increaseHandler = () => {
    setPageNumber(pageNumber + 1)
  }

  const {
    data: items,
    isFetching: loading,
    error,
  } = useCategoryItemsQuery({
    limit,
    category,
    communityName: community,
  })
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{handleRTKError(error)}</MessageBox>
      ) : !items ? (
        <p>No Items found</p>
      ) : (
        <div className="home-container">
          <div className="header">
            <Header
              community={user?.marketProfile?.communityName ?? community}
              cartNum={0}
            />
          </div>
          <div className="sidebar-content">
            {user ? user.role === "ADMIN" ? null : <SideBar /> : null}
            <section className="container">
              <div className="moreItems-category">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </div>
              <div className={"list-" + category}>
                {items.length > 0 ? (
                  <ListItem
                    community={community}
                    mainCategory={category}
                    itemList={items}
                  />
                ) : (
                  <div className="has-text-centered py-4">Items Not Found</div>
                )}
              </div>
              <div className="page-number">&lt; {pageNumber} &gt;</div>
              <div className="page-button">
                <div className="button-container">
                  <div className="button1">
                    {pageNumber > 1 ? (
                      <Link
                        to={`/${community}/${category}?page=${pageNumber + 1}`}
                        className="link"
                      >
                        <button
                          className="button is-primary"
                          onClick={decreaseHandler}
                        >
                          <span> Previous Page </span>
                        </button>
                      </Link>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="button2">
                    {pageNumber > 0 && items.length > limit - 1 ? (
                      <Link
                        to={`/${community}/${category}?page=${pageNumber - 1}`}
                        className="link"
                      >
                        <button
                          className="button is-primary"
                          onClick={increaseHandler}
                        >
                          <span> Next Page </span>
                        </button>
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      )}
    </div>
  )
}
