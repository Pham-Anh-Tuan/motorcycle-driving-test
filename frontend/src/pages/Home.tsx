import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import MenuBox from "../components/MenuBox/MenuBox";
import Navbar from "../components/Navbar/Navbar";

interface HomeProps {
    setLoginPopup: (isOpen: boolean) => void;
}

const Home: React.FC<HomeProps> = ({ setLoginPopup }) => {
    return (
        <div className="flex flex-col flex-1">
            <Navbar setLoginPopup={setLoginPopup}/>
            <Banner />
            <MenuBox />
            <div className="flex-1">{/* Cho phần nội dung đẩy footer xuống */}</div>
            <Footer />
        </div>
    )
}

export default Home;