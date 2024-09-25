import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Reports from "./components/pages/admin/Reports";

function App() {
  return (
    <>
      <ClientHomePage />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="home-page" element={<HomePage />} />
            <Route path="clients" element={<Clients />} />
            <Route path="team" element={<Team />} />
            <Route path="testimonials" element={<Testimonials />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="products" element={<Products />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="footer" element={<Footer />} />
            <Route path="meetings" element={<Meetings />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
