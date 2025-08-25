import { Outlet } from "react-router-dom";
import Header from "./_components/Header";
// import Banner from "./_components/Banner";
import Footer from "./_components/Footer";

export default function HomeTemplate() {
    return (
        <div>
            <Header/>
            {/* <Banner/> */}
            <Outlet />
            <Footer/>
        </div>
    );
}