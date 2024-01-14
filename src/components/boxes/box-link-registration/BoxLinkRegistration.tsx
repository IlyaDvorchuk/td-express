import React from 'react';
import './box-link-registration.scss'
import {Link} from "react-router-dom";

const BoxLinkRegistration = () => {
    return (
        <Link to={'/registration'} className={'registration'}>
            <div>Стать продавцом / Войти как продавец</div>
            <img src="/images/svg/arrow-right-long.svg" alt="Стать продавцом"/>
        </Link>
    );
};

export default BoxLinkRegistration;
