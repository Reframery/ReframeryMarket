import React from 'react';
import Header from 'components/Header';
import SideBar from "components/SideBar";
import Footer from 'components/Footer'

import { Link } from "react-router-dom";
import CreatedItemList from "../components/CreatedItemList";

export default function MyItemPage() {
 
  return (
    <div>
      <Header />
      <div className="sidebar-content">
        <SideBar />
        <div className="container">
          <div className="item-main">
            <div className="myitems-header">
              <Link to="/create-item" className="link">Create Item >></Link>
            </div>
            <div className="list-products" >
              <CreatedItemList />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}


