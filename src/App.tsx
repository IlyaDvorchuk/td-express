import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import { useAppSelector } from "./hooks/redux";
import CreateGood from "./pages/CreateGood";
import Good from "./pages/Good";
import LoginShelter from "./pages/LoginShelter";
import MainPage from "./pages/MainPage";
import RegistrData from "./pages/RegistrData";
import RegistrShelter from "./pages/RegistrShelter";
import RegistrShop from "./pages/RegistrShop";
import Shelter from "./pages/Shelter";
import ShelterGoods from "./pages/ShelterGoods";
import ShelterMain from "./pages/ShelterMain";
import ShelterOrders from "./pages/ShelterOrders";
import { shelterSlice } from "./store/reducers/shelter/ShelterSlice";
import { getAccessTokenShelter, isTokenExpired, removeAccessTokenShelter } from "./utils/tokens";

function App() {
  const accessToken = useAppSelector((state) => state.shelterReducer.accessToken);
  const dispatch = useDispatch();
  const { setLogoutSuccess } = shelterSlice.actions;

  useEffect(() => {
    const token = getAccessTokenShelter();
    if (!token || isTokenExpired(token)) {
      removeAccessTokenShelter();
      dispatch(setLogoutSuccess());
    }
  }, [dispatch, setLogoutSuccess]);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/registration' element={<RegistrShelter />} />
          <Route path='/login' element={<LoginShelter />} />
          <Route path='/registration-next' element={<RegistrData />} loader={() => !accessToken ? <Navigate to='/login' /> : null} />
          <Route path='/registration-shop' element={<RegistrShop />} />
          <Route
            path='/shelter/'
            element={<Shelter />}
            loader={() => {
              console.log('!accessToken', !accessToken);
              if (!accessToken) {
                return <Navigate to='/login' />;
              }
              return null;
            }}
          >
            <Route
              index
              path='main'
              element={<ShelterMain />}
              loader={() => {
                console.log('!accessToken', !accessToken);
                if (!accessToken) {
                  return <Navigate to='/login' />;
                }
                return null;
              }}
            />
            <Route index path='orders' element={<ShelterOrders />} />
            <Route index path='goods' element={<ShelterGoods />} />
            <Route index path='goods/create' element={<CreateGood />} />
          </Route>
          <Route path='/card/:id' element={<Good />} />
          <Route
            path='/'
            element={<MainPage />}
            loader={() => {
              console.log('accessToken 34', accessToken);
              if (accessToken) {
                return <Navigate to='/shelter/main' />;
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
