import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./App.css";
import ClientHomePage from "./components/pages/user/HomePage";
import Layout from "./components/pages/admin/Layout";
import Dashboard from "./components/pages/admin/Dashboard";
import Settings from "./components/pages/admin/Settings";
import HomePage from "./components/pages/admin/HomePage";
import Clients from "./components/pages/admin/Clients";
import Team from "./components/pages/admin/Team";
import Testimonials from "./components/pages/admin/Testimonials";
import Pricing from "./components/pages/admin/Pricing";
import Products from "./components/pages/admin/Products";
import Blogs from "./components/pages/admin/Blogs";
import Footer from "./components/pages/admin/Footer";
import Meetings from "./components/pages/admin/Meetings";
import ProductCategory from "./components/pages/admin/ProductCategory";
import BlogCategory from "./components/pages/admin/BlogCategory";
import SocialMedia from "./components/pages/admin/SocialMedia";
import Pages from "./components/pages/admin/Pages";
import Services from "./components/pages/admin/Services";
import ServiceCategory from "./components/pages/admin/ServiceCategory";
import WhyChooseUs from "./components/pages/admin/WhyChooseUs";
import About from "./components/pages/admin/About";
import Contact from "./components/pages/admin/Contact";
import FAQ from "./components/pages/admin/FAQ";
import Dynamic from "./components/pages/admin/Dynamic";

import UserPricing from "./components/pages/user/Pricing";
import UserTestimonials from "./components/pages/user/Testimonials";
import UserTeam from "./components/pages/user/Team";
import UserProducts from "./components/pages/user/Products";
import UserServices from "./components/pages/user/Services";
import UserWhyChooseUs from "./components/pages/user/WhyChooseUs";
import UserAboutUs from "./components/pages/user/About";
import UserContact from "./components/pages/user/Contact";
import UserFAQ from "./components/pages/user/FAQ";
import UserDynamic from "./components/pages/user/Dynamic";
import UserTrustedBy from "./components/pages/user/TrustedBy";
import UserFloatingIcon from "./components/pages/user/Floating";
import Slider from "./components/pages/user/Slider";
import UserBlog from "./components/pages/user/Blogs";
import { useEffect, useState } from "react";
import api from "./utility/api";
import Subscribers from "./components/pages/admin/Subscribers";
import Queries from "./components/pages/admin/Queries";
import LoginPage from "./components/pages/admin/Login";
import ResetPassword from "./components/pages/admin/ResetPassword";
import PageNotFound from "./components/pages/admin/PageNotfound";
import SEO from "./components/pages/admin/SEO";
import Blog from "./components/pages/user/Blog";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = sessionStorage.getItem("isDarkMode");
    return storedMode ? JSON.parse(storedMode) : false;
  });
  const [showDarkMode, setShowDarkMode] = useState(true);
  const [pages, setPages] = useState([]);
  const [seoDetails, setSEODetails] = useState([]);
  const isAuthenticated = () => {
    return sessionStorage.getItem("isAuthenticated") !== null;
  };

  const PrivateRoute = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" />;
  };

  const componentMap = {
    Clients: UserTrustedBy,
    "Why Choose Us": UserWhyChooseUs,
    Team: UserTeam,
    Testimonials: UserTestimonials,
    Pricing: UserPricing,
    Products: UserProducts,
    Services: UserServices,
    Contact: UserContact,
    FAQ: UserFAQ,
  };

  const renderClientHomePage = () => {
    return (
      <ClientHomePage
        isDarkMode={isDarkMode}
        showDarkMode={showDarkMode}
        setShowDarkMode={setShowDarkMode}
        setIsDarkMode={setIsDarkMode}
      >
        <Slider />
        {pages.length === 0
          ? null
          : pages.map((page) => {
              const Component = componentMap[page.PAGE_NAME];
              return page.SHOW && Component ? (
                <Component key={page.ID} />
              ) : null;
            })}
      </ClientHomePage>
    );
  };

  useEffect(() => {
    sessionStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    async function fetchRenderComponents() {
      const response = await api.getPathDetails();
      if (response.length > 0) {
        setPages(response);
      } else {
        setPages([]);
      }
    }

    async function fetchSEODetails() {
      const response = await api.getSEODetails();
      if (response.length > 0) {
        setSEODetails(response);
      } else {
        setSEODetails([]);
      }
    }
    fetchRenderComponents();
    fetchSEODetails();
  }, []);

  return (
    <Router>
      <Routes>
        {/* login page */}
        <Route path="/admin/login" element={<LoginPage />}></Route>
        <Route path="/admin/" element={<LoginPage />}></Route>
        <Route path="/admin/reset-password" element={<ResetPassword />}></Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Layout />}>
          <Route element={<PrivateRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="home-page" element={<HomePage />} />
            <Route path="clients" element={<Clients />} />
            <Route path="team" element={<Team />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="products" element={<Products />} />
            <Route path="products/category" element={<ProductCategory />} />
            <Route path="services" element={<Services />} />
            <Route path="services/category" element={<ServiceCategory />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/category" element={<BlogCategory />} />
            <Route path="why-choose-us" element={<WhyChooseUs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="dynamic" element={<Dynamic />} />
            <Route path="social-media" element={<SocialMedia />} />
            <Route path="footer" element={<Footer />} />
            <Route path="pages" element={<Pages />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="queries" element={<Queries />} />
            <Route path="seo" element={<SEO />} />
          </Route>
        </Route>

        <Route path="/admin/*" element={<PageNotFound />} />

        {/*user routes*/}
        <Route path="/" element={renderClientHomePage()} />
        <Route path="/home" element={renderClientHomePage()} />
        <Route
          path="/about"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserAboutUs />
            </ClientHomePage>
          }
        />
        <Route
          path="/clients"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserTrustedBy />
            </ClientHomePage>
          }
        />
        <Route
          path="/contact"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserContact />
            </ClientHomePage>
          }
        />
        <Route
          path="/faq"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserFAQ />
            </ClientHomePage>
          }
        />
        <Route
          path="/products"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserProducts />
            </ClientHomePage>
          }
        />
        <Route
          path="/pricing"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserPricing />
            </ClientHomePage>
          }
        />
        <Route
          path="/testimonials"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserTestimonials />
            </ClientHomePage>
          }
        />
        <Route
          path="/team"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserTeam />
            </ClientHomePage>
          }
        />
        <Route
          path="/services"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserServices />
            </ClientHomePage>
          }
        />
        <Route
          path="/why-choose-us"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserWhyChooseUs />
            </ClientHomePage>
          }
        />
        <Route
          path="/blogs"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserBlog />
            </ClientHomePage>
          }
        />
        <Route
          path="/blogs/:id"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <Blog />
            </ClientHomePage>
          }
        />
        <Route
          path="/:pageName"
          element={
            <ClientHomePage
              isDarkMode={isDarkMode}
              showDarkMode={showDarkMode}
              setShowDarkMode={setShowDarkMode}
              setIsDarkMode={setIsDarkMode}
            >
              <UserDynamic />
            </ClientHomePage>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
