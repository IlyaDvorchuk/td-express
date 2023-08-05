import React, {useEffect} from 'react';
import './App.css';
import MainPage from "./pages/MainPage";
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import RegistrShelter from "./pages/RegistrShelter";
import LoginShelter from "./pages/LoginShelter";
import RegistrData from "./pages/RegistrData";
import Shelter from "./pages/Shelter";
import ShelterGoods from "./pages/ShelterGoods";
import CreateGood from "./pages/CreateGood";
import RegistrShop from "./pages/RegistrShop";
import {useAppSelector} from "./hooks/redux";
import {useDispatch} from "react-redux";
import {getAccessTokenShelter, isTokenExpired, removeAccessTokenShelter} from "./utils/tokens";
import {shelterSlice} from "./store/reducers/shelter/ShelterSlice";
import ShelterMain from "./pages/ShelterMain";
import Good from "./pages/Good";
import ShelterOrders from "./pages/ShelterOrders";
import Favorites from "./pages/Favorites";
import Category from "./pages/Category";
import Cart from "./pages/Cart";
import Header from "./components/headers/header/Header";
import SearchPage from "./pages/SearchPage";
import Faq from "./pages/Faq";
import Footer from "./components/footers/footer-user/Footer";
import MobileNavbar from "./components/mobile-navbar/MobileNavbar";
import Admin from "./pages/Admin";


function App() {
    const accessToken = useAppSelector((state) => state.shelterReducer.accessToken);
    const dispatch = useDispatch();
    const {setLogoutSuccess} = shelterSlice.actions

    useEffect(() => {
        const token = getAccessTokenShelter();
        if (!token || isTokenExpired(token)) {
            removeAccessTokenShelter()
            dispatch(setLogoutSuccess());
        }
    }, [dispatch, setLogoutSuccess]);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/registration" element={<RegistrShelter />} />
                    <Route path="/login" element={<LoginShelter />} />
                    <Route
                        path="/personal-data/:id"
                        element={<RegistrData />}
                        loader={() => {
                            if (!accessToken) {
                                return <Navigate to="/login" />;
                            }
                            return null;
                        }}
                    />
                    <Route
                        path="/personal-data"
                        element={<RegistrData />}
                        loader={() => {
                            if (!accessToken) {
                                return <Navigate to="/login" />;
                            }
                            return null;
                        }}
                    />
                    <Route path="/shop-data/:id" element={<RegistrShop />} />
                    <Route path="/shop-data" element={<RegistrShop />} />
                    <Route
                        path="/shelter/"
                        element={<Shelter />}
                        loader={() => {
                            if (!accessToken) {
                                return <Navigate to="/login" />;
                            }
                            return null;
                        }}
                    >
                        <Route
                            index
                            path="main"
                            element={<ShelterMain />}
                            loader={() => {
                                if (!accessToken) {
                                    return <Navigate to="/login" />;
                                }
                                return null;
                            }}
                        />
                        <Route index path="orders" element={<ShelterOrders />} />
                        <Route index path="goods" element={<ShelterGoods />} />
                        <Route index path={`goods/create`} element={<CreateGood />} />
                        <Route index path={`goods/create/:id`} element={<CreateGood />} />
                    </Route>
                    <Route
                        path="/card/:id"
                        element={
                            <>
                                <Header />
                                <Good />
                                <Footer/>

                            </>
                        }
                    />
                    <Route
                        path="/category/:id"
                        element={
                            <>
                                <Header />
                                <Category />
                                <Footer/>
                            </>
                        }
                    />
                    <Route
                        path="/favorites"
                        element={
                        <>
                            <Header />
                            <MobileNavbar/>
                            <Favorites />
                            <Footer/>
                        </>
                    }
                    />
                    <Route
                        path="/cart"
                        element={
                            <>
                                <Header />
                                <Cart />
                                <Footer/>
                            </>
                        }
                    />
                    <Route
                        path="/search"
                        element={
                            <>
                                <Header />
                                <SearchPage />
                            </>
                        }
                    />
                    <Route
                        path="/faq"
                        element={
                            <>
                                <Header />
                                <MobileNavbar/>
                                <Faq/>
                                <Footer/>
                            </>
                        }
                    />
                    <Route
                        path="/administrator"
                        element={
                            <>
                                <Admin/>
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                <Header />
                                <MainPage />
                                <Footer/>

                            </>
                        }
                        loader={() => {
                            console.log('accessToken 34', accessToken)
                            if (accessToken) {
                                return <Navigate to="/shelter/main" />;
                            }
                            return null;
                        }}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
