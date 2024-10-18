"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HousePlus,
  UserPlus,
  Users,
  MessageSquare,
  HandCoins,
  Package,
  ListTodo,
  Rss,
  LibraryBig,
  TableOfContents,
} from "lucide-react";
import api from "@/utility/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState([
    {
      title: "Home Page Sliding Images",
      value: "Loading...",
      icon: HousePlus,
      link: "/admin/home-page",
    },
    {
      title: "Total Clients",
      value: "Loading...",
      icon: UserPlus,
      link: "/admin/clients",
    },
    {
      title: "Total Team Members",
      value: "Loading...",
      icon: Users,
      link: "/admin/team",
    },
    {
      title: "Total Testimonials",
      value: "Loading...",
      icon: MessageSquare,
      link: "/admin/testimonials",
    },
    {
      title: "Total Pricing Plans",
      value: "Loading...",
      icon: HandCoins,
      link: "/admin/pricing",
    },
    {
      title: "Total Pricies",
      value: "Loading...",
      icon: HandCoins,
      link: "/admin/pricing",
    },
    {
      title: "Total Product Categories",
      value: "Loading...",
      icon: Package,
      link: "/admin/products/category",
    },
    {
      title: "Total Products",
      value: "Loading...",
      icon: Package,
      link: "/admin/products",
    },
    {
      title: "Total Service Categories",
      value: "Loading...",
      icon: ListTodo,
      link: "/admin/services/category",
    },
    {
      title: "Total Services",
      value: "Loading...",
      icon: ListTodo,
      link: "/admin/services",
    },
    {
      title: "Total Blog Categories",
      value: "Loading...",
      icon: Rss,
      link: "/admin/blogs/category",
    },
    {
      title: "Total Blogs",
      value: "Loading...",
      icon: Rss,
      link: "/admin/blogs",
    },
    {
      title: "Total FAQ's",
      value: "Loading...",
      icon: TableOfContents,
      link: "/admin/faq",
    },
    {
      title: "Total Dynamic Pages",
      value: "Loading...",
      icon: LibraryBig,
      link: "/admin/dynamic",
    },
  ]);

  useEffect(() => {
    async function fetchHomePageDetails() {
      try {
        const response = await api.getHomePageDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Home Page Sliding Images"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalClients() {
      try {
        const response = await api.getClientDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Clients"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalTeam() {
      try {
        const response = await api.getTeamDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Team Members"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalTestimonials() {
      try {
        const response = await api.getTestimonialsDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Testimonials"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalPricePlans() {
      try {
        const response = await api.getPricingPlanDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Pricing Plans"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalPrices() {
      try {
        const response = await api.getPricingDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Pricies"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalProductCategories() {
      try {
        const response = await api.getProductCategoryDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Product Categories"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalProducts() {
      try {
        const response = await api.getProductDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Products"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalServiceCategories() {
      try {
        const response = await api.getServiceCategoryDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Service Categories"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalServices() {
      try {
        const response = await api.getServiceDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Services"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalBlogCategories() {
      try {
        const response = await api.getBlogCategoryDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Blog Categories"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalBlogs() {
      try {
        const response = await api.getBlogDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Blogs"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalFAQ() {
      try {
        const response = await api.getFAQDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total FAQ's"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }
    async function fetchTotalDynamicPages() {
      try {
        const response = await api.getPageDetails();
        setStats((prev) =>
          prev.map((stat) =>
            stat.title === "Total Dynamic Pages"
              ? {
                  ...stat,
                  value: response.length > 0 ? response.length : 0,
                }
              : stat
          )
        );
      } catch (error) {
        console.error("Error fetching Home Page details:", error);
      }
    }

    fetchHomePageDetails();
    fetchTotalClients();
    fetchTotalTeam();
    fetchTotalTestimonials();
    fetchTotalPricePlans();
    fetchTotalPrices();
    fetchTotalProductCategories();
    fetchTotalProducts();
    fetchTotalServiceCategories();
    fetchTotalServices();
    fetchTotalBlogCategories();
    fetchTotalBlogs();
    fetchTotalFAQ();
    fetchTotalDynamicPages();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(stat.link)}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
