import React, { useEffect } from "react";
import ListItem from "../components/ListItem";
import homeImage from "../img/home_img.jpg"
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from 'components/Header';
import SideBar from "components/SideBar";
import Footer from 'components/Footer'
import { getNewestItemsOfProducts, getNewestItemsOfServices, getNewestItemsOfExpertises } from "actions/itemActions";
import LoadingBox from "components/LoadingBox";
import MessageBox from "components/MessageBox";
import { isAdmin } from "../commons/auth";


export default function Itemspage() {
  const dispatch = useDispatch();
  const { community } = useParams();
  console.log(community);
  // the number of newest items of each category in the homepage
  const limitOfNewest = 18;
  const startPage = 0;
  // the number of items in the pages of more items
  const limitOfMore = 30

  // gets the status of sign in user
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  // gets the status of getting newest times from the three different categorites
  const newestItemsOfProductsGet = useSelector((state) => state.newestItemsOfProductsGet);
  const { loading: loadingProducts, error: errorProducts, items: itemsOfProducts } = newestItemsOfProductsGet;
  const newestItemsOfServicesGet = useSelector((state) => state.newestItemsOfServicesGet);
  const { loading: loadingServices, error: errorServices, items: itemsOfServices } = newestItemsOfServicesGet;
  const newestItemsOfExpertisesGet = useSelector((state) => state.newestItemsOfExpertisesGet);
  const { loading: loadingExpertises, error: errorExpertises, items: itemsOfExpertises } = newestItemsOfExpertisesGet;

  // send the request to the backend
  useEffect(() => {
    dispatch(getNewestItemsOfProducts(limitOfNewest, community, "products"));
    dispatch(getNewestItemsOfServices(limitOfNewest, community, "services"));
    dispatch(getNewestItemsOfExpertises(limitOfNewest, community, "expertises"));
  }, [dispatch, limitOfNewest, community]);

  return (
    <div>
      {loadingProducts || loadingServices || loadingExpertises ? (
        <LoadingBox></LoadingBox>
      ) : errorProducts || errorServices || errorExpertises ? (
        <MessageBox variant="danger">{errorProducts + errorServices + errorExpertises}</MessageBox>
      ) : (
        <div className="home-container">
          <div className="header">
            <Header community={community} />
          </div>
          {/* This component is only shown for the visitors, not for signin user */}
          {userInfo ? null :
            (
              <div className="background" style={{ backgroundImage: `url(${homeImage})` }}>
                <div className="text">
                  <h1 className="slogan-container">
                    One of the best community marketplaces to support your new business
                      </h1>
                </div>
              </div>
            )
          }
          {/* The sidebar is shown when the user sign in */}
          <div className="sidebar-content">
            {userInfo ? (isAdmin(userInfo) ? null : <SideBar />) : null}

            <section className="container">
              <div>
                <div className="is-size-2 has-text-centered py-4" >Products </div>
                <div >
                  <ListItem community={community} itemList={itemsOfProducts} />
                  <div className="is-size-4 has-text-centered py-4"><Link to={"/" + community + "/products/" + startPage + "/" + limitOfMore} className="link">More Items &gt;&gt;</Link></div>
                </div>
              </div>
              <div>
                <div className="is-size-2 has-text-centered py-4" >Services </div>
                <div  >
                  <ListItem community={community} itemList={itemsOfServices} />
                  <div className="is-size-4 has-text-centered py-4"><Link to={"/" + community + "/services/" + startPage + "/" + limitOfMore} className="link">More Items &gt;&gt;</Link></div>
                </div>
              </div>
              <div>
                <div className="is-size-2 has-text-centered py-4" >Expertises </div>
                <div  >
                  <ListItem community={community} itemList={itemsOfExpertises} />
                  <div className="is-size-4 has-text-centered py-4"><Link to={"/" + community + "/expertises/" + startPage + "/" + limitOfMore} className="link">More Items &gt;&gt;</Link></div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
      )
      }
    </div >
  );
}
