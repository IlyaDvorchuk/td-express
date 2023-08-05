import React from 'react';
import HeaderRegData from "../components/headers/header-reg-data/HeaderRegData";
import BoxShelter from "../components/boxes/box-shelter/BoxShelter";
import FormRegistrationData from "../components/forms/registation-data/FormRegistrationData";
import {useLocation} from "react-router-dom";

const RegistrData = () => {
    const location = useLocation();

    return (
        <div>
            <HeaderRegData/>
            <BoxShelter isImage={false}>
                <FormRegistrationData shelterData={location.state.shelterData} id={location.state._id}/>
            </BoxShelter>
        </div>
    );
};

export default RegistrData;
