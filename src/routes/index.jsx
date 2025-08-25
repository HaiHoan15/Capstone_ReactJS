import { Route } from "react-router-dom";

import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import AccountPage from "../pages/HomeTemplate/AccountPage.jsx";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import MovieDetailsPage from "../pages/HomeTemplate/MovieDetailsPage";
import LoginPage from "../pages/HomeTemplate/LoginPage";
import RegisterPage from "../pages/HomeTemplate/RegisterPage";
import Cinema from "../pages/HomeTemplate/Cinema";

import AdminTemplate from "../pages/AdminTemplate";
import MoviesPage from "../pages/AdminTemplate/MoviesPage";
import ShowtimePage from "../pages/AdminTemplate/ShowtimePage";
import AdminInformation from "../pages/AdminTemplate/AdminInformation";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import AddMoviePage from "../pages/AdminTemplate/AddMoviePage";
import AddCinemaPage from "../pages/AdminTemplate/AddCinemaPage";
import AuthPage from "../pages/AdminTemplate/AuthPage";

const routes = [
    {
        path : "/",
        Element: HomeTemplate,
        nested: [
            {
                index: true,
                element: HomePage,
            },
            {
                path: "gioi-thieu",
                element: AboutPage,
            },
            {
                path: "danh-sach-phim",
                element: ListMoviePage,
            },
            {
                path: "chi-tiet-phim/:MaPhim",
                element: MovieDetailsPage,
            },
            {
                path: "dang-nhap",
                element: LoginPage,
            },
            {
                path: "dangnhap",
                element: LoginPage,
            },
            {
                path: "login",
                element: LoginPage,
            },
            {
                path: "dang-ky",
                element: RegisterPage,
            },
            {
                path: "tai-khoan",
                element: AccountPage,
            },
            {
                path: "rap-chieu-phim/:maLichChieu",
                element: Cinema, 
            },
        ],
    },
    {
        path : "admin",
        Element: AdminTemplate,
        nested: [
            {
                index: true,
                element: AdminInformation,
            },
            {
                path: "quan-ly-phim",
                element: MoviesPage,
            },
            {
                path: "quan-ly-user",
                element: AddUserPage,
            },
            {
                path: "quan-ly-showtime",
                element: ShowtimePage,
            },
            {
                path: "thong-tin",
                element: AdminInformation,
            },
            {
                path: "them-phim",
                element: AddMoviePage,
            },
            {
                path: "quan-ly-rap",
                element: AddCinemaPage,
            },
            
        ],
    },
    {
        path: "auth",
        Element: AuthPage,
    },
];

export const generateRoutes = () => {
    return routes.map((route) => {
        if (route.nested){
            return (
                <Route key={route.path} path={route.path} element={<route.Element />}>
                    {route.nested.map((item) => (
                        item.index ? (
                            <Route key="index" index element={<item.element />} />
                        ) : (
                            <Route key={item.path} path={item.path} element={<item.element/>}/>
                        )
                    ))}
                </Route>
            )
        }
        else {
            return (<Route key={route.path} path={route.path} element={<route.Element/>}/>);
        }
    });
};