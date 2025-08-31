import { useEffect, useState } from "react";
import { Menu, Newspaper, TrafficCone, FileQuestion, LogOut, LayoutDashboard } from "lucide-react";
import Logo from "../a1Logo.png";
import { NavLink, Outlet } from "react-router-dom";

const menuItems = [
  { label: "Bảng điều khiển", icon: LayoutDashboard, path: "/quan-li" },
  { label: "Câu hỏi", icon: FileQuestion, path: "/quan-li/cau-hoi" },
  { label: "Biển báo", icon: TrafficCone, path: "/quan-li/bien-bao" },
  { label: "Tin tức", icon: Newspaper, path: "/quan-li/tin-tuc" },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSidebarOpen(false);
      }
    };

    // Kiểm tra ngay khi component được mount
    handleResize();

    // Lắng nghe sự thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Dọn dẹp khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    // Xóa token khỏi localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('imageName');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    window.location.href = '/';
  };

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <aside className={`bg-primary text-white fixed sm:static inset-0 z-10 h-screen transition-all ${sidebarOpen ? "w-64" : "w-16"} duration-300 p-4`}>
        <div className={`flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} mx-auto`}>
          <h1 className={`text-xl font-bold ${!sidebarOpen && "hidden"}`}>
            <a href="/">
              <img src={Logo} alt="Logo"
                className="w-9" />
            </a>
          </h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-center">
            <Menu />
          </button>
        </div>
        <nav className="mt-10 space-y-4">
          {menuItems.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={label}
              to={path}
              end
              className={({ isActive }) =>
                `flex w-full items-center ${sidebarOpen ? "justify-start px-4" : "justify-center"
                } py-2 rounded-sm transition hover:bg-sky-600 ${isActive ? "bg-sky-700" : "bg-transparent"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {sidebarOpen && <span className="ml-2">{label}</span>}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-6 left-4 text-white">
          <button onClick={() => handleLogout()}
            type="button"
            className="flex items-center gap-2 hover:text-red-400">
            <LogOut />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto ml-16 sm:ml-0">
        <Outlet /> {/* Dùng để render nội dung của từng Route */}
      </main>
    </div>
  );
}

export default AdminDashboard;