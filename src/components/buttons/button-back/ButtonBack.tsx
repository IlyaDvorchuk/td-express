import React from 'react';
import '../../../styles/elements/buttons.scss'
import './button-back.scss'
import {useNavigate} from "react-router-dom";
import {useWindowWidth} from "../../../hooks/useWindowWidth";

const ButtonBack = () => {
    const navigate = useNavigate()
    const windowWidth = useWindowWidth();

    const onBack = () => {
        navigate(-1)
    }

    return (
        <>
            {windowWidth > 600 ? <button className={'button button_light button-back'} onClick={onBack}>
                <img src="/images/svg/arrow-back.svg" alt="назад"/>
                <span>назад</span>
            </button> :
                <div className={'button-back-mobile'}>
                    <svg onClick={onBack} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699M20.5 11.9999H3.67" stroke="#8554EA" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

            }
        </>

    );
};

export default ButtonBack;