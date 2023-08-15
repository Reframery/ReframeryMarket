import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { DataProvider } from "./data/useData";
import { useSelector } from "react-redux";
import NotFound from "./components/NotFound";
import ItemsPage from "./pages/HomePage";
import UserPage from "./pages/MyProfilePage";
import MyItemPage from "./pages/MyItemPage";
import SearchUserPage from "./pages/AdminSearchUserPage";
import SearchUserResultPage from "./pages/AdminSearchUserResultPage";
import OverviewPage from './pages/AdminOverviewPage';
import AwaitingPage from './pages/AdminUnvalidatedUserPage';
import CreateAdminPage from './pages/AdminCreateAdminPage';
import AdminManagePage from "./pages/AdminManagementPage";
import Signin from './pages/SigninPage';
import Register from './pages/RegisterPage';
import WalletPage from './pages/MyWalletPage';
import WellcomePage from "./pages/WellcomePage";
import ItemDetails from "./pages/ItemDetailsPage";
import Cart from "pages/Cart";
import AddressForm from "pages/AddressForm";
import Confirm from "pages/Confirm";
import Payment from "pages/Payment";
import CreateItemPage from "pages/CreateItemPage";
import EditItemPage from "pages/EditItemPage";
import Landing from "pages/Landing";
import MyProfilePage from "./pages/MyProfilePage";
import AboutPage from "pages/AboutPage";
import ContactPage from "pages/ContactPage";
import MoreItemsPage from "pages/MoreItemsPage";
import SearchResultPage from "pages/SearchResultPage";
import DevelopmentTeamPage from "pages/DevelopmentTeamPage";
import PrivacyPolicyPage from "pages/PrivacyPolicyPage";
import TermsPage from "pages/TermsPage";
import UpdateUserAddressPage from "pages/UpdateUserAddressPage";
import PurchaseHistory from "pages/PurchaseHistory";
import SalesHistory from "pages/SalesHistory";



export default function App() {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <DataProvider>
      <main className="main">
        <Routes>
          <Route path="/" element={<WellcomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/development-team" element={<DevelopmentTeamPage />} />

          <Route path="/signin" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:community" element={<ItemsPage />} />
          <Route path="/:community/:category/:start/:end" element={<MoreItemsPage />} />
          <Route path="/search" element={<SearchResultPage />} />

          <Route path="/:community/:category/:id" element={<ItemDetails />} />

          <Route path="/cart" element={<Cart />} />
          {/* only for logged in users */}
          {userInfo ? (userInfo.admin ? null : <Route path="/address-form" element={<AddressForm />} />) : null}
          {userInfo ? (userInfo.admin ? null : <Route path="/confirm" element={<Confirm />} />) : null}
          {userInfo ? (userInfo.admin ? null : <Route path="/payment" element={<Payment />} />) : null}
          {userInfo ? (userInfo.admin ? null : <Route path="/my-wallet" element={<WalletPage />} />) : null}
          {userInfo ? (userInfo.admin ? null : <Route path="/my-profile" element={<UserPage />} />) : null}
          {userInfo ? (userInfo.admin ? null : <Route path="/update-user-address" element={<UpdateUserAddressPage />} />) : null}
          {userInfo ? (userInfo.admin ? null : <Route path="/my-item" element={<MyItemPage />} />) : null}
          {userInfo ? (userInfo.admin ? null : <Route path="/my-item/:id" element={<EditItemPage />} />) : null}
          {userInfo ? (userInfo.admin ? null : <Route path="/create-item" element={<CreateItemPage />} />) : null}
          {userInfo ? (userInfo.admin ? null : <Route path="/purchase-history" element={<PurchaseHistory />} />) : null}
          {userInfo ? (userInfo.admin ? null : <Route path="/sales-history" element={<SalesHistory />} />) : null}
         
          {/* only for admin users */}
          {userInfo ? (userInfo.admin ?<Route path="/admin" element={<OverviewPage />} /> : null) : null}
          {userInfo ? (userInfo.admin ?<Route path="/admin/awaiting-validation" element={<AwaitingPage />} /> : null) : null}
          {userInfo ? (userInfo.admin ?<Route path="/admin/search-user" element={<SearchUserPage />} /> : null) : null}
          {userInfo ? (userInfo.admin ?<Route path="/admin/search" element={<SearchUserResultPage />} /> : null) : null}
          {userInfo ? (userInfo.admin ?<Route path="/admin/create-admin-account" element={<CreateAdminPage />} /> : null) : null}
          {userInfo ? (userInfo.admin ?<Route path="/admin/my-profile" element={<MyProfilePage />} /> : null) : null}
          {userInfo ? (userInfo.admin ?<Route path="/admin/administrator-management" element={<AdminManagePage />} /> : null) : null}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </DataProvider>
  );
}