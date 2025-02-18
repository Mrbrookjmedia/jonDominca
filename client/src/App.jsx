import "./styles/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/Navbar";

import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";
// import {CartContextProvider} from "./context/CartContext";
import { ToastContainer } from "react-toastify";

import { CartProvider } from "./context/CartContext";
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./pages/About"));
const Shop = lazy(() => import("./pages/Shop"));
const CartPage = lazy(() => import("./pages/CartPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const Support = lazy(() => import("./pages/Support"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const Collection = lazy(() => import("./pages/Collections"));
const Blogs = lazy(() => import("./pages/Blogs"));
const AiPage = lazy(() => import("./pages/AiToolsPage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const UserSettings = lazy(() => import("./pages/UserSettings"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminUser = lazy(() => import("./pages/AdminUser"));
const AdminOrder = lazy(() => import("./pages/AdminOrder"));
const CreateNewProduct = lazy(() => import("./pages/CreateNewProduct"));
const AdminEditProdut = lazy(() => import("./pages/AdminEditProdut"));
const AdminHomepage = lazy(() => import("./pages/AdminHomepage"));
const AdminAllProducts = lazy(() => import("./pages/AdminAllProducts"));

import AiTools from "./pages/AiTools";

import CategoryPage from './components/CategoryPage';
import PostPage from './components/PostPage';

import AdminNewsLetter from "./pages/AdminNewsletter"
import AdminContact from "./pages/AdminContact";
//protect routes component
import ProtectRoute from "./components/ProtectRoute";
import ProtectAdminRoute from "./components/ProtectAdminRoute";
// import CreateNewProduct from "./pages/CreateNewProduct";

function App() {
  return (
    <AuthContextProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/aitools" element={<AiTools />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/support" element={<Support />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/collections" element={<Collection />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:categorySlug" element={<CategoryPage />} />
              <Route path="/blog/post/:postSlug" element={<PostPage />} />
              <Route path="/aipage" element={<AiPage />} />
              <Route element={<ProtectRoute />}></Route>


              <Route element={<ProtectAdminRoute />}>
                <Route path="/admin" element={<AdminHomepage />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUser />} />
                  <Route path="createproducts" element={<CreateNewProduct />} />
                  <Route path="allproducts" element={<AdminAllProducts />} />
                  <Route path="/admin/products/edit/:id" element={<AdminEditProdut />} />
                  <Route path="orders" element={<AdminOrder />} />
                </Route>
              </Route>
              {/* </Route> */}
              <Route element={<ProtectRoute />}>
  <Route path="/admin" element={<AdminHomepage />}>
    <Route index element={<AdminDashboard />} />
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="users" element={<AdminUser />} />
    <Route path="createproducts" element={<CreateNewProduct />} />
    <Route path="allproducts" element={<AdminAllProducts />} />
    <Route path="/admin/products/edit/:id" element={<AdminEditProdut />} />
    <Route path="orders" element={<AdminOrder />} />
   <Route path="/admin/newsletter" element={<AdminNewsLetter />} />
     <Route path="/admin/contact-data" element={<AdminContact />} />

  </Route>
</Route>
            {/* </Route> */}
            <Route element={<ProtectRoute />}>

              <Route path="/user-dash" element={<UserPage />} />
              <Route path="/setting" element={<UserSettings />} />

            </Route>

            </Routes>
          </Suspense>
          <Footer />
          <ToastContainer />
        </Router>
      </CartProvider>
    </AuthContextProvider>
  );
}

export default App;
