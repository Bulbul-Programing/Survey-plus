import { Outlet } from "react-router-dom";
import Navbar from "../SharePage/Navbar/Navbar";
import Footer from "../SharePage/Footer/Footer";

const MainRoute = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainRoute;