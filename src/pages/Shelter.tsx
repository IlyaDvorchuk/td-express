import React, {useEffect} from 'react';
import BoxShelter from '../components/boxes/box-shelter/BoxShelter';
import HeaderShelter from "../components/headers/header-shelter/HeaderShelter";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import FooterShelter from "../components/footers/footer-shelter/FooterShelter";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {isObjectEmpty} from "../utils/isObjectEmpty";
import {getShelter} from "../store/reducers/shelter/ShelterCreator";
import SellerNavbar from "../components/navbars/seller-navbar/SellerNavbar";

const Shelter = () => {
    const location = useLocation()
    const navigation = useNavigate()
    const dispatch = useAppDispatch()
    const {shelter} = useAppSelector(state => state.shelterReducer)
    const accessToken = useAppSelector((state) => state.shelterReducer.accessToken);

    useEffect(() => {
        if (!localStorage.getItem('isFeedback')) {
            localStorage.setItem('isFeedback', 'isFeedback')
        }

        if ((localStorage.getItem('access_token_shelter') !== null) && isObjectEmpty(shelter)) {
            dispatch(getShelter())
        }
    }, [dispatch, shelter])

    useEffect(() => {
        if (!accessToken) navigation('/')
    }, [accessToken, navigation])

    useEffect(() => {
        if (location.pathname === '/shelter/' || location.pathname === '/shelter') {
            navigation('/seller/main')
        }
    }, [location, navigation])

    return (
        <main>
            <HeaderShelter/>
            <BoxShelter isImage={false}>
                <Outlet/>
            </BoxShelter>
            <SellerNavbar/>
            <FooterShelter/>
        </main>
    );
};

export default Shelter;
