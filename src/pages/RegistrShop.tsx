import React from 'react';
import HeaderRegData from "../components/headers/header-reg-data/HeaderRegData";
import BoxShelter from "../components/boxes/box-shelter/BoxShelter";
import FormRegistrationShop from "../components/forms/registration-shop/FormRegistrationShop";
import {useLocation} from "react-router-dom";

const RegistrShop = () => {
    const location = useLocation();

    return (
        <div>
            <HeaderRegData isData={false} isShop={true}/>
            <BoxShelter isImage={false}>
                <FormRegistrationShop shelter={location.state}/>
            </BoxShelter>
        </div>
    );
};

export default RegistrShop;