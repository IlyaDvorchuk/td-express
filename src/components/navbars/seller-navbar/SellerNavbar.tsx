import React, {useEffect, useState} from 'react';
import './seller-navbar.scss';
import {Link, useLocation} from "react-router-dom";
import {getAccessTokenShelter} from "../../../utils/tokens";
import ShelterToolsMobile from "../../tools/shelter-tools-mobile/ShelterToolsMobile";

const SellerNavbar = () => {
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(localStorage.getItem('activeLinkSeller') || 'home');
    const [isPressedTools, setIsPressedTools] = useState(false)

    useEffect(() => {
        switch (location.pathname) {
            case '/seller/main':
                setActiveLink('home');
                break;
            case '/seller/goods':
                setActiveLink('goods');
                break
            case '/seller/orders':
                setActiveLink('orders');
                break;
            default:
                setActiveLink('')
        }
    }, [location.pathname])

    useEffect(() => {
        localStorage.setItem('activeLinkSeller', activeLink);
    }, [activeLink]);

    const handleLinkClick = (link: string) => {
        setIsPressedTools(link === 'tabs')
        setActiveLink(link);
    }

    const getActiveImageSrc = (imageName: string) => {
        return activeLink === imageName ? `${imageName}-active.svg` : `${imageName}.svg`;
    };

    return (
        <div className={'seller-navbar'}>
            {getAccessTokenShelter() && <ShelterToolsMobile isPressed={isPressedTools}/>}
            <Link
                to={'/seller/main'}
                className={`seller-navbar__link ${activeLink === 'home' ? 'active' : ''}`}
                onClick={() => handleLinkClick('home')}
            >
                <img src={`/images/svg/mobile-navbar/${getActiveImageSrc('home')}`} alt="Home" />
                <span>Главная</span>
            </Link>
            <Link
                to={'/seller/goods'}
                className={`seller-navbar__link ${activeLink === 'goods' ? 'active' : ''}`}
                onClick={() => handleLinkClick('goods')}
            >
                <img src={`/images/svg/mobile-navbar/${getActiveImageSrc('goods')}`} alt="Home" />
                <span>Мои товары</span>
            </Link>
            <Link to={'/seller/goods/create'} className={'seller-navbar__button'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <path d="M10 20H30M20 30V10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </Link>
            <Link
                to={'/seller/orders'}
                className={`seller-navbar__link ${activeLink === 'orders' ? 'active' : ''}`}
                onClick={() => handleLinkClick('orders')}
            >
                <img src={`/images/svg/mobile-navbar/${getActiveImageSrc('orders')}`} alt="Home" />
                <span>Мои заказы</span>
            </Link>
            <div
                className={`seller-navbar__link ${activeLink === 'tabs' ? 'active' : ''}`}
                onClick={() => {
                    handleLinkClick('tabs')
                }}
            >
                <img src={`/images/svg/mobile-navbar/${getActiveImageSrc('tabs')}`} alt="Home" />
                <span>Меню</span>
            </div>
        </div>
    );
};

export default SellerNavbar;
