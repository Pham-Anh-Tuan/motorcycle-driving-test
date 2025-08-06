import { useEffect, useState } from "react";
import { Menu, Newspaper, TrafficCone, FileQuestion, LogOut } from "lucide-react";
import Logo from "../../a1Logo.png";
import QuestionManager from "../QuestionManager/QuestionManager";

const menuItems = [
  { label: "Câu hỏi", icon: FileQuestion },
  { label: "Biển báo", icon: TrafficCone },
  { label: "Tin tức", icon: Newspaper },
];

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("Câu hỏi");

  const renderContent = () => {
    switch (activeTab) {
      case "Câu hỏi":
        return <div>
          <QuestionManager />
        </div>;
      case "Biển báo":
        return <div>Quản lý biển báo (Tiêu đề, hình ảnh, nội dung, loại biển)</div>;
      case "Tin tức":
        return <div>Quản lý tin tức (Tiêu đề, ảnh, ngày đăng, nội dung)</div>;
      default:
        return null;
    }
  };

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

  return (
    <div className="flex h-screen font-sans bg-gray-100">
      <aside className={`bg-primary text-white fixed sm:static inset-0 z-10 h-screen transition-all ${sidebarOpen ? "w-64" : "w-16"} duration-300 p-4`}>
        <div className={`flex items-center ${sidebarOpen ? "justify-between" : "justify-center"} mx-auto`}>
          <h1 className={`text-xl font-bold ${!sidebarOpen && "hidden"}`}>
            <img src={Logo} alt="Logo"
              className="w-9" />
          </h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white text-center">
            <Menu />
          </button>
        </div>
        <nav className="mt-10 space-y-4">
          {menuItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex w-full items-center ${sidebarOpen ? "justify-start px-4" : "justify-center"
                } py-2 rounded-lg hover:bg-sky-600 transition ${activeTab === label ? "bg-sky-700" : "bg-transparent"
                }`}
            >
              <Icon className="w-5 h-5" />
              {sidebarOpen && <span className="ml-2">{label}</span>}
            </button>

          ))}
        </nav>
        <div className="absolute bottom-6 left-4 text-white">
          <button className="flex items-center gap-2 hover:text-red-400">
            <LogOut />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto ml-16 sm:ml-0">
        {/* <h2 className="text-2xl font-bold mb-4">{activeTab}</h2> */}
        {/* <div className="bg-white shadow p-6 rounded-xl min-h-[400px]"> */}
          {renderContent()}
        {/* </div> */}
      </main>
    </div>
  );
}

export default AdminDashboard;