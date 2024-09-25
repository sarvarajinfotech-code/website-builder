import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LayoutDashboard,
  Users,
  FolderClosed,
  Calendar,
  FileText,
  BarChart2,
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
  ClipboardMinus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Settings", icon: Settings, path: "/settings" },
  { name: "Home Page", icon: HousePlus, path: "/home-page" },
  { name: "Clients", icon: Users, path: "/clients" },
  { name: "Team", icon: Users, path: "/team" },
  { name: "Testimonials", icon: MessageSquare, path: "/testimonials" },
  { name: "Pricing", icon: HandCoins, path: "/pricing" },
  { name: "Products", icon: Package, path: "/products" },
  { name: "Blogs", icon: Rss, path: "/blogs" },
  { name: "Footer", icon: Dock, path: "/footer" },
  { name: "Meetings", icon: MessageSquareDiff, path: "/meetings" },
  { name: "Reports", icon: ClipboardMinus, path: "/reports", expandable: true },
];

export default function Layout() {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Hamburger Menu for Small Screens */}
      <header className="bg-white shadow-sm border-b border-gray-200 w-full md:hidden">
        <div className="flex justify-between items-center px-4 py-2">
          <h2 className="text-xl font-semibold text-gray-800">
            {location.pathname === "/"
              ? "Dashboard"
              : menuItems.find((item) => item.path === location.pathname)?.name}
          </h2>
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 w-64 bg-white shadow-md flex flex-col transform transition-transform duration-300 md:translate-x-0 md:static`}
      >
        <div className="p-4 border-b border-gray-200 ">
          <h1 className="text-2xl font-bold text-blue-600">VirtualBal</h1>
        </div>
        <nav className="flex-grow py-4 overflow-y-auto ">
          {menuItems.map((item) => (
            <div key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center justify-between w-full px-4 py-2 text-sm transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </div>
                {item.expandable && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(item.name);
                    }}
                  >
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        expandedItems.includes(item.name) ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                )}
              </Link>
              {item.expandable && expandedItems.includes(item.name) && (
                <div className="ml-6 mt-1">
                  <Link
                    to={`${item.path}/sub1`}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    Subitem 1
                  </Link>
                  <Link
                    to={`${item.path}/sub2`}
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                  >
                    Subitem 2
                  </Link>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-700 hover:bg-gray-100"
            asChild
          >
            <Link to="/logout">
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="p-4">
          <div className="flex justify-between items-center px-4 py-2">
            <h2 className="text-xl font-semibold text-gray-800">
              {location.pathname === "/"
                ? "Dashboard"
                : menuItems.find((item) => item.path === location.pathname)
                    ?.name}
            </h2>
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
