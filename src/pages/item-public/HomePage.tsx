import { Link, useParams } from "react-router-dom"

import { useNewItemsQuery } from "app/services/item"
import { useAuth } from "hooks/useAuth"
import { handleRTKError } from "lib/utils"

import homeImage from "assets/home_img.jpg"
import Footer from "components/Footer"
import Header from "components/Header"
import SideBar from "components/SideBar"
import LoadingBox from "components/ui/LoadingBox"
import MessageBox from "components/ui/MessageBox"
import ListItem from "components/item-public/ItemList"

export default function HomePage() {
  const { community } = useParams() as { community: string }

  const { user } = useAuth()

  const limit = 9

  // const [limitOfMore, startPage] = [27, 1]

  const options = {
    limit,
    communityName: user?.marketProfile.communityName ?? community,
  }

  const {
    isFetching: loadingProducts,
    error: errorProducts,
    data: itemsOfProducts,
  } = useNewItemsQuery({
    category: "product",
    ...options,
  })

  const {
    isFetching: loadingServices,
    error: errorServices,
    data: itemsOfServices,
  } = useNewItemsQuery({
    category: "services",
    ...options,
  })

  const {
    isFetching: loadingExpertises,
    error: errorExpertises,
    data: itemsOfExpertises,
  } = useNewItemsQuery({
    category: "expertises",
    ...options,
  })

  return (
    <div>
      {loadingProducts || loadingServices || loadingExpertises ? (
        <LoadingBox></LoadingBox>
      ) : errorProducts || errorServices || errorExpertises ? (
        <MessageBox variant="danger">
          {errorProducts && handleRTKError(errorProducts)}
          {errorServices && handleRTKError(errorServices)}
          {errorExpertises && handleRTKError(errorExpertises)}
        </MessageBox>
      ) : (
        <div className="home-container">
          <div className="header">
            <Header community={community} />
          </div>
          {user && (
            <div
              className="background"
              style={{ backgroundImage: `url(${homeImage})` }}
            >
              <div className="text">
                <h1 className="slogan-container">
                  One of the best community marketplaces to support your new
                  business
                </h1>
              </div>
            </div>
          )}
          <div className="sidebar-content">
            {user && user.role === "ADMIN" && <SideBar />}
            <section className="container">
              <div>
                <div className="is-size-2 has-text-centered py-4">Products</div>
                <div>
                  <ListItem
                    community={community}
                    itemList={itemsOfProducts ?? []}
                  />
                  <div className="is-size-4 has-text-centered py-4">
                    <Link to="product" className="link">
                      More Items &gt;&gt;
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="is-size-2 has-text-centered py-4">Services</div>
                <div>
                  <ListItem
                    community={community}
                    itemList={itemsOfServices ?? []}
                  />
                  <div className="is-size-4 has-text-centered py-4">
                    <Link to="service" className="link">
                      More Items &gt;&gt;
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className="is-size-2 has-text-centered py-4">
                  Expertises
                </div>
                <div>
                  <ListItem
                    community={community}
                    itemList={itemsOfExpertises ?? []}
                  />
                  <div className="is-size-4 has-text-centered py-4">
                    <Link to="expertise" className="link">
                      More Items &gt;&gt;
                    </Link>
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
