import { BrowserRouter, Routes, Route } from "react-router-dom"

import WelcomePage from "./pages/public/WelcomePage"
import Landing from "pages/public/Landing"

import HomePage from "./pages/item-public/HomePage"
import ItemDetails from "pages/item-public/ItemDetailsPage"
import MoreItems from "pages/item-public/MoreItemsPage"
import SearchResults from "pages/public/SearchResultPage"

import AuthLayout from "components/layouts/AuthLayout"
import ProtectedLayout from "components/layouts/ProtectedLayout"
import ItemLayout from "components/layouts/ItemLayout"
import AdminLayout from "components/layouts/AdminLayout"

import AboutPage from "pages/common/AboutPage"
import ContactPage from "pages/common/ContactPage"
import TermsPage from "pages/common/TermsPage"
import PrivacyPolicyPage from "pages/common/PrivacyPolicyPage"
import DevelopmentTeamPage from "pages/common/DevelopmentTeamPage"

import Login from "pages/auth/LoginPage"
import Register from "pages/auth/RegisterPage"

import PaymentPage from "pages/checkout/PaymentPage"
import CartPage from "pages/checkout/CartPage"
import ConfirmPage from "pages/checkout/ConfirmPage"
import AddressPage from "pages/checkout/AddressPage"

import MyItemPage from "pages/item/MyItemPage"
import EditItemPage from "pages/item/EditItemPage"
import CreateItemPage from "pages/item/CreateItemPage"

import PurchaseHistory from "pages/history/PurchaseHistory"
import SalesHistory from "pages/history/SalesHistory"

import MyProfilePage from "pages/user/MyProfilePage"
import WalletPage from "pages/user/MyWalletPage"
import UpdateUserAddressPage from "pages/user/UpdateUserAddressPage"

import OverviewPage from "pages/admin/AdminOverviewPage"
import SearchUserPage from "pages/admin/AdminSearchUserPage"
import SearchUserResultPage from "pages/admin/AdminSearchUserResultPage"
import AwaitingPage from "pages/admin/AdminUnvalidatedUserPage"

import NotFound from "components/NotFound"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/landing" element={<Landing />} />

        <Route path="/:community">
          <Route path="" element={<HomePage />} />
          <Route path=":category" element={<MoreItems />} />
          <Route path="item/:id" element={<ItemDetails />} />
        </Route>

        <Route path="/search" element={<SearchResults />} />

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedLayout />}>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/development-team" element={<DevelopmentTeamPage />} />

          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/address" element={<AddressPage />} />
          <Route path="/confirm" element={<ConfirmPage />} />

          <Route path="/items" element={<ItemLayout />}>
            <Route path="" element={<MyItemPage />} />
            <Route path="new" element={<CreateItemPage />} />
            <Route path=":id" element={<EditItemPage />} />
          </Route>

          <Route path="/history">
            <Route path="purchase" element={<PurchaseHistory />} />
            <Route path="sales" element={<SalesHistory />} />
          </Route>

          <Route path="/my-wallet" element={<WalletPage />} />
          <Route path="/my-profile" element={<MyProfilePage />} />
          <Route
            path="/update-user-address"
            element={<UpdateUserAddressPage />}
          />

          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<OverviewPage />} />
            <Route path="awaiting-validation" element={<AwaitingPage />} />
            <Route path="search" element={<SearchUserResultPage />} />
            <Route path="search-user" element={<SearchUserPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
