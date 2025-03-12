import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  LogOut,
  Settings,
  ChevronRight,
  Menu,
  X,
  HousePlus,
  MessageSquare,
  HandCoins,
  Package,
  Rss,
  Dock,
  MessageSquareDiff,
  UserPlus,
  CircleFadingPlus,
  PanelsTopLeft,
  FileCheck2,
  BookUser,
  TableOfContents,
  LibraryBig,
  ListTodo,
  MailCheck,
  MessageCircleQuestion,
  CheckCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
  { name: "Subscribers", icon: MailCheck, path: "/admin/subscribers" },
  { name: "Queries", icon: MessageCircleQuestion, path: "/admin/queries" },
  { name: "Home Page", icon: HousePlus, path: "/admin/home-page" },
  { name: "Clients", icon: UserPlus, path: "/admin/clients" },
  { name: "Team", icon: Users, path: "/admin/team" },
  { name: "Testimonials", icon: MessageSquare, path: "/admin/testimonials" },
  { name: "Pricing", icon: HandCoins, path: "/admin/pricing" },
  {
    name: "Products",
    icon: Package,
    expandable: true,
    path: "/admin/products",
    list: [
      {
        name: "Product Category",
        icon: Package,
        path: "/admin/products/category",
      },
      { name: "Products", icon: Package, path: "/admin/products" },
    ],
  },
  {
    name: "Services",
    icon: ListTodo,
    expandable: true,
    path: "/admin/services",
    list: [
      {
        name: "Service Category",
        icon: ListTodo,
        path: "/admin/services/category",
      },
      { name: "Services", icon: ListTodo, path: "/admin/services" },
    ],
  },
  {
    name: "Blogs",
    icon: Rss,
    path: "/admin/blogs",
    expandable: true,
    list: [
      { name: "Blog Category", icon: Rss, path: "/admin/blogs/category" },
      { name: "Blogs", icon: Rss, path: "/admin/blogs" },
    ],
  },

  {
    name: "Why Choose Us",
    icon: FileCheck2,
    path: "/admin/why-choose-us",
  },
  {
    name: "Contact",
    icon: BookUser,
    path: "/admin/contact",
  },
  {
    name: "FAQ",
    icon: TableOfContents,
    path: "/admin/faq",
  },
  {
    name: "Dynamic",
    icon: LibraryBig,
    path: "/admin/dynamic",
  },
  { name: "Social Media", icon: CircleFadingPlus, path: "/admin/social-media" },
  { name: "Footer", icon: Dock, path: "/admin/footer" },
  { name: "Pages", icon: PanelsTopLeft, path: "/admin/pages" },
  { name: "Meetings", icon: MessageSquareDiff, path: "/admin/meetings" },
];

export default function Layout() {
  const { toast } = useToast();

  const location = useLocation();
  const navigate = useNavigate();
  const [expandedItems, setExpandedItems] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleLogout = () => {
    sessionStorage.removeItem("isAuthenticated");
    navigate("/admin/login");
    toast({
      title: (
        <div className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span>User Logout</span>
        </div>
      ),
    });
  };
  const toggleExpand = (name) => {
    setExpandedItems((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getPageTitle = () => {
    if (location.pathname === "/") return "Dashboard";

    const findMatchingItem = (items) => {
      for (const item of items) {
        if (item.path === location.pathname) return item.name;
        if (item.expandable && item.list) {
          const subItem = item.list.find(
            (sub) => sub.path === location.pathname
          );
          if (subItem) return subItem.name;
        }
      }
      return "";
    };

    return findMatchingItem(menuItems);
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const expandedParents = menuItems
      .filter((item) => item.expandable && currentPath.startsWith(item.path))
      .map((item) => item.name);
    setExpandedItems(expandedParents);
  }, [location]);

  const handleNavigation = (path) => {
    navigate(path);
    closeSidebar();
  };

  const isActive = (item) => {
    if (item.expandable) {
      return item.list.some((subItem) => subItem.path === location.pathname);
    }
    return item.path === location.pathname;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
            <h1 className="text-2xl font-bold text-blue-600">VirtualBal</h1>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={closeSidebar}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.expandable ? (
                  <div
                    className={`flex cursor-pointer items-center justify-between px-4 py-2 text-sm transition-colors duration-200 ${
                      isActive(item)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => toggleExpand(item.name)}
                  >
                    <div className="flex items-center">
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        expandedItems.includes(item.name) ? "rotate-90" : ""
                      }`}
                    />
                  </div>
                ) : (
                  <div
                    className={`flex items-center px-4 py-2 text-sm transition-colors duration-200 ${
                      isActive(item)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                )}
                {item.expandable && expandedItems.includes(item.name) && (
                  <div className="ml-6 mt-1">
                    {item.list.map((subItem) => (
                      <div
                        key={subItem.name}
                        className={`block px-4 py-2 text-sm ${
                          location.pathname === subItem.path
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => handleNavigation(subItem.path)}
                      >
                        {subItem.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          {/* <div className="border-t border-gray-200 p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100"
              onClick={() => {
                navigate("/admin/login");
              }}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div> */}
        </div>
      </aside>

      {/* Main Content */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname === "/"
                ? "Dashboard"
                : menuItems.find((item) => item.path === location.pathname)
                    ?.name || ""}
            </h2>

            <div className="flex items-center space-x-2">
              <Button>
                <a href="/" target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="md:hidden"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content & Footer Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-24">
            <Toaster />
            <Outlet />
          </main>
          <footer className="bg-white border-t py-4 text-center text-sm p-4">
            © 2023 Proudly created with www.provendigitalsolution.com | made in
            India with ❤️
          </footer>
        </div>
      </div>
    </div>
  );
}
