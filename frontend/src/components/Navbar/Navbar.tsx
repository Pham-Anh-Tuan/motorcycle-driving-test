import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import Logo from "../../assets/a1Logo.png";

const navMenus = [
  {
    name: "Trang chủ",
    link: "/#home",
  },
  {
    name: "Tin tức",
    link: "/#about",
  },
  {
    name: "Liên hệ",
    link: ".#services",
  },
  {
    name: "Thực hành",
    link: "#",
  },
];

interface NavbarProps {
  setLoginPopup: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setLoginPopup }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [theme]);

  return (
    <>
      <nav id="home" className="bg-gray-800">
        <div className="container flex justify-between items-center py-3 sm:py-0">
          {/* <h1 className="text-xl md:text-xl font-bold text-primary flex justify-center items-center ">
            M.
          </h1> */}
          <div>
            <a href="/">
              <div className="font-bold 
                    text-xl sm:text-xl flex gap-2 items-center">
                <img src={Logo} alt="Logo"
                  className="w-9" />
              </div>
            </ a>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              <ul className="flex items-center gap-4 dark:text-white">
                {navMenus.map((navMenu, index) => {
                  return (
                    <li key={index}>
                      <a
                        className="text-sm font-normal px-2 py-4 md:py-4 inline-block cursor-pointer text-gray-300 hover:bg-blue-500 hover:text-white"
                        href={navMenu.link}
                      >
                        {navMenu.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex gap-2 sm:mt-0">
              <button onClick={() => setLoginPopup(true)}
                className="bg-blue-500 px-3 py-2 rounded-sm text-sm font-normal text-white">Đăng nhập</button>
            </div>

            {/* Mobile Responsive Menu */}
            <div className="sm:hidden">
              <div className="flex items-center gap-4">
                <FiMenu
                  className="text-2xl cursor-pointer text-white"
                  onClick={toggleMenu}
                />
              </div>
              {showMenu && (
                <div className="fixed top-16 bg-white shadow-md rounded-b-xl left-0 w-full z-10 py-4">
                  <ul className="flex flex-col items-center gap-2">
                    {navMenus.map((navMenu, index) => {
                      return (
                        <li key={index} className="hover:bg-blue-500 w-full text-center">
                          <a
                            className="text-md font-semibold px-2 py-1 md:py-6 inline-block cursor-pointer"
                            href={navMenu.link}
                            onClick={() => setShowMenu(false)}
                          >
                            {navMenu.name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;