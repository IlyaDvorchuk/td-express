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
import {useAppDispatch, useAppSelector} from "./hooks/redux";
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
import MobileNavbar from "./components/navbars/mobile-navbar/MobileNavbar";
import Admin from "./pages/Admin";
import Order from "./pages/Order";
import ShelterDelivery from "./pages/ShelterDelivery";
import AnswerOrder from "./pages/AnswerOrder";
import FooterShelter from "./components/footers/footer-shelter/FooterShelter";
import BoxSuccessOrder from "./components/boxes/box-success-order/BoxSuccessOrder";
import BoxFailureOrder from "./components/boxes/box-failure-order/BoxFailureOrder";
import Search from "./components/search/Search";
import BoxLinkRegistration from "./components/boxes/box-link-registration/BoxLinkRegistration";
import {useWindowWidth} from "./hooks/useWindowWidth";
import OrdersList from "./pages/OrdersList";
import OrderUser from "./pages/OrderUser";
import Seller from "./pages/Seller";
import Subscription from "./pages/Subscription";
import Popup from "./components/popup/Popup";
import {isObjectEmpty} from "./utils/isObjectEmpty";
import {getUser} from "./store/reducers/user/UserCreators";
import {userSlice} from "./store/reducers/user/UserSlice";


function App() {
    const accessToken = useAppSelector((state) => state.shelterReducer.accessToken);
    const dispatch = useAppDispatch();
    const {setLogoutSuccess} = shelterSlice.actions
    const {setIsLoaded, setIsFeedbackModal} = userSlice.actions
    const windowWidth = useWindowWidth();
    const {user, isLoaded} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        if (!localStorage.getItem('isFeedback')) {
            setTimeout(() => {
                dispatch(setIsFeedbackModal(true))
                localStorage.setItem('isFeedback', 'isFeedback')
            }, 90000)
        }

        if ((localStorage.getItem('access_token_user') !== null) && isObjectEmpty(user)) {
            dispatch(getUser())
        } else {
            dispatch(setIsLoaded(true))

        }

    }, [])


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
                        path="/seller/"
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
                        <Route index path="delivery" element={<ShelterDelivery />} />
                        <Route index path={`goods/create`} element={<CreateGood />} />
                        <Route index path={`goods/create/:id`} element={<CreateGood />} />
                        <Route index path={`subscription`} element={<Subscription />} />
                    </Route>
                    {isLoaded && <>
                        <Route
                            path="/card/:id"
                            element={
                                <>
                                    <Header/>
                                    <MobileNavbar/>
                                    <Good/>
                                    <Footer/>

                                </>
                            }
                        />
                        <Route
                            path="/category/:id"
                            element={
                                <>
                                    <Header/>
                                    <Category/>
                                    <Footer/>
                                </>
                            }
                        />
                        <Route
                            path="/favorites"
                            element={
                                <>
                                    <Header/>
                                    <MobileNavbar/>
                                    <Favorites/>
                                    <Footer/>
                                </>
                            }
                        />
                        <Route
                            path="/buy"
                            element={
                                <>
                                    <Header/>
                                    <MobileNavbar/>
                                    <Order/>
                                    <Footer/>
                                </>
                            }
                        />
                        <Route
                            path="/cart"
                            element={
                                <>
                                    <Header/>
                                    {windowWidth < 690 && <Search mobile={true}/>}
                                    <MobileNavbar/>
                                    <Cart/>
                                    <Footer/>
                                </>
                            }
                        />
                        <Route
                            path="/search"
                            element={
                                <>
                                    <Header/>
                                    <SearchPage/>
                                </>
                            }
                        />
                        <Route
                            path="/faq"
                            element={
                                <>
                                    <Header/>
                                    <MobileNavbar/>
                                    <Faq/>
                                    <Footer/>
                                </>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <>
                                    <Header/>
                                    <MobileNavbar/>
                                    <OrdersList/>
                                    <Footer/>
                                </>
                            }
                        />
                        <Route
                            path="/order/:id"
                            element={
                                <>
                                    <Header/>
                                    <MobileNavbar/>
                                    <OrderUser/>
                                    <Footer/>

                                </>
                            }
                        />
                        <Route
                            path="/seller/:name"
                            element={
                                <>
                                    <Header/>
                                    <MobileNavbar/>
                                    <Seller/>
                                    <Footer/>

                                </>
                            }
                        />
                        <Route
                            path="/success"
                            element={
                                <main style={{overflow: 'hidden'}}>
                                    <Header/>
                                    <MobileNavbar/>
                                    <AnswerOrder>
                                        <BoxSuccessOrder/>
                                    </AnswerOrder>
                                    <FooterShelter/>
                                </main>
                            }
                        />
                        <Route
                            path="/failure"
                            element={
                                <main style={{overflow: 'hidden'}}>
                                    <Header/>
                                    <MobileNavbar/>
                                    <AnswerOrder>
                                        <BoxFailureOrder/>
                                    </AnswerOrder>
                                    <FooterShelter/>
                                </main>
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
                                    <Header/>
                                    <BoxLinkRegistration/>
                                    {windowWidth < 690 && <Search mobile={true}/>}
                                    <MainPage/>
                                    <Footer/>

                                </>
                            }
                            loader={() => {
                                console.log('accessToken 34', accessToken)
                                if (accessToken) {
                                    return <Navigate to="/seller/main"/>;
                                }
                                return null;
                            }}
                        />
                    </>}

                </Routes>
            </BrowserRouter>
            <Popup/>
        </div>
    );
}

export default App;
