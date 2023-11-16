import React, {useEffect, useState} from 'react';
import './mobile-navbar.scss'
import {Link, useLocation} from "react-router-dom";
import MenuMobile from "../../menus/menu-mobile/MenuMobile";
import UserToolsMobile from "../../tools/user-tools-mobile/UserToolsMobile";
import {getAccessTokenUser} from "../../../utils/tokens";
import {isObjectEmpty} from "../../../utils/isObjectEmpty";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import ModalLogin from "../../modals/modal-login/ModalLogin";
import {userSlice} from "../../../store/reducers/user/UserSlice";


const MobileNavbar = () => {
    const dispatch = useAppDispatch()
    const location = useLocation();
    const {user, isUserModal} = useAppSelector(state => state.userReducer)
    const {changeIsUserModal} = userSlice.actions
    const [activeLink, setActiveLink] = useState(localStorage.getItem('activeLink') || 'home');
    const [isPressedMenu, setIsPressedMenu] = useState(false)
    const [isPressedTools, setIsPressedTools] = useState(false)


    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setActiveLink('home');
                break;
            case '/cart':
                setActiveLink('cart');
                break
            case '/favorites':
                setActiveLink('favorites');
                break;
            default:
                setActiveLink('')
        }
    }, [location.pathname])

    useEffect(() => {
        localStorage.setItem('activeLink', activeLink);
    }, [activeLink]);

    const handleLinkClick = (to: string) => {
        setIsPressedMenu(to === 'categories')
        setIsPressedTools(to === 'user')
        setActiveLink(to);
    };

    const getActiveImageSrc = (imageName: string) => {
        return activeLink === imageName ? `${imageName}-active.svg` : `${imageName}.svg`;
    };

    return (
        <>
            <MenuMobile isPressed={isPressedMenu} setIsPressed={setIsPressedMenu}/>
            {getAccessTokenUser() && !isObjectEmpty(user) && <UserToolsMobile isPressed={isPressedTools}/>}
            <div className="navbar">
                <Link
                    to={'/'}
                    className={`navbar__link ${activeLink === 'home' ? 'active' : ''}`}
                    onClick={() => handleLinkClick('home')}
                >
                    <img src={`/images/svg/mobile-navbar/${getActiveImageSrc('home')}`} alt="Home" />
                </Link>
                <div
                    className={`navbar__link ${activeLink === 'categories' ? 'active' : ''}`}
                    onClick={() => handleLinkClick('categories')}
                >
                    <img src={`/images/svg/mobile-navbar/${getActiveImageSrc('categories')}`} alt="Categories" />
                </div>
                <Link
                    className={`navbar__link ${activeLink === 'cart' ? 'active' : ''}`}
                    to="/cart"
                    onClick={() => handleLinkClick('cart')}
                >
                    <img src={`/images/svg/mobile-navbar/${getActiveImageSrc('cart')}`} alt="Cart" />
                </Link>
                <Link
                    className={`navbar__link ${activeLink === 'favorites' ? 'active' : ''}`}
                    to="/favorites"
                    onClick={() => handleLinkClick('favorites')}
                >
                    <img src={`/images/svg/mobile-navbar/${getActiveImageSrc('favorites')}`} alt="Favorites" />
                </Link>
                <div
                    className={`navbar__link ${activeLink === 'user' ? 'active' : ''}`}
                    onClick={() => {
                        handleLinkClick('user');
                        dispatch(changeIsUserModal(true))
                    }}
                >
                    <img src={`/images/svg/mobile-navbar/${getActiveImageSrc('user')}`} alt="User" />
                </div>
                {isUserModal && !getAccessTokenUser() && !user?._id && <ModalLogin/>}
            </div>
        </>

    );
};


export default MobileNavbar;
