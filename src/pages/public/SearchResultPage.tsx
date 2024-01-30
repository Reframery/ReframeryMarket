import { useEffect } from "react"
import { useDispatch, useSelector } from "app/store"
import { searchItems, setSearchParams } from "features/searchSlice"
import { isAdmin } from "lib/auth"

import Header from "components/Header"
import SideBar from "components/SideBar"
import Footer from "components/Footer"
import LoadingBox from "components/ui/LoadingBox"
import MessageBox from "components/ui/MessageBox"
import Item from "components/item-public/Item"
import { useAuth } from "hooks/useAuth"

export default function SearchResultPage() {
  const { user } = useAuth()

  const {
    search: { loading, error, params, items },
  } = useSelector((state) => state)

  const dispatch = useDispatch()

  const decreaseHandler = () => {
    params &&
      setSearchParams({
        ...params,
        page: params.page - 1,
      })
  }

  const increaseHandler = () => {
    params &&
      setSearchParams({
        ...params,
        page: params.page + 1,
      })
  }

  useEffect(() => {
    if (params) dispatch(searchItems(params))
  }, [dispatch, params])

  const showPrev = params && params.page > 2

  const showNext = params && params?.page >= 1 && items.length

  return (
    <div>
      <div className="home-container">
        <div className="header">
          <Header community={params?.community ?? ""} cartNum={0} />
        </div>
        <div className="sidebar-content">
          {user && isAdmin(user) && <SideBar />}
          <section className="container">
            <div className="moreItems-category">Search Result:</div>
            {loading ? (
              <LoadingBox />
            ) : error ? (
              <MessageBox variant="danger">{error.message}</MessageBox>
            ) : items && items.length > 0 ? (
              <div>
                <div className="list-products">
                  <div className="itemlist-container">
                    <div className="list-items">
                      {items.map((item) => (
                        <Item
                          key={item.id}
                          item={item}
                          community={params?.community ?? ""}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="page-number">&lt; {params?.page} &gt;</div>
                <div className="page-button">
                  <div className="button-container">
                    <div className="button1">
                      {showPrev && (
                        <button
                          className="button is-primary"
                          onClick={decreaseHandler}
                        >
                          <span> Previous Page </span>
                        </button>
                      )}
                    </div>
                    <div className="button2">
                      {showNext && (
                        <button
                          className="button is-primary"
                          onClick={increaseHandler}
                        >
                          <span> Next Page </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="has-text-centered is-size-4">Items Not Found</div>
            )}
          </section>
        </div>
        <Footer />
      </div>
    </div>
  )
}
