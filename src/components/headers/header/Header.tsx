'use client'
import React, {useEffect, useState} from 'react';
import './header.scss'
import Container from "../../container/Container";
import Geolocation from "../../geolocation/Geolocation";
import Menu from "../../menus/menu/Menu";
import Search from "../../search/Search";
import UserSvg from "../../svg/UserSvg";
import ModalLogin from "../../modals/modal-login/ModalLogin";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/user/UserSlice";
import {Link} from "react-router-dom";
import FavoritesSvg from "../../svg/FavoritesSvg";
import ShoppingSvg from "../../svg/ShoppingSvg";
import {getAccessTokenUser} from "../../../utils/tokens";
import {isObjectEmpty} from "../../../utils/isObjectEmpty";
import UserTools from "../../tools/user-tools/UserTools";
import {fetchCategories} from "../../../store/reducers/categories/CategoriesCreators";



const Header = () => {
    const dispatch = useAppDispatch()
    const {isUserModal, user} = useAppSelector(state => state.userReducer)
    const {changeIsUserModal} = userSlice.actions
    const {categories} = useAppSelector(state => state.categoriesReducer)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        // Обработчик изменения размера окна браузера
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        // Добавляем обработчик при монтировании компонента
        window.addEventListener('resize', handleResize);

        // Убираем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const openUserModal = () => dispatch(changeIsUserModal(true))

    return (
        <header className={'header'}>
            <Container>
                <div className={'header__row-1'}>
                    <Geolocation/>
                    <div className={'header__links'}>
                        <Link to="/faq">Часто задаваемые вопросы</Link>
                        <Link className={'header__registry'} to={'/registration'}>Продавайте на td-market / Войти</Link>
                    </div>
                </div>
                <div className={'header__row-2'}>
                    <Menu/>
                    <Link to={'/'} className={'logo'}>
                        <img src={'/images/logo-market.svg'} alt={'TD Market'}/>
                    </Link>
                    {windowWidth > 690 && <Search />}
                    <Link to={'/favorites'} className={'link-icon link-icon_favorite'}>
                        <FavoritesSvg/>
                    </Link>
                    <Link to={'/cart'} className={'link-icon link-icon_cart'}>
                        <ShoppingSvg/>
                    </Link>
                    {!getAccessTokenUser() && <div onClick={openUserModal} className={'link-icon'}>
                        <UserSvg/>
                    </div>}
                    {getAccessTokenUser() && !isObjectEmpty(user)&&
                        <div className={'link-icon'}>
                            <UserTools/>
                        </div>
                    }
                    <Link to={'/'} className={'header__faq'}>
                        <img src="/images/svg/faq.svg" alt="Вопросы"/>
                    </Link>
                    <Geolocation mobile={true}/>
                    {isUserModal && (windowWidth > 690) && !getAccessTokenUser() && <ModalLogin/>}
                </div>
                <div className={'header__row-3'}>
                    {categories.map((category) => (
                        <Link key={category.name} to={`/category/${category._id}`}>{category.name}</Link>
                    ))}
                </div>
            </Container>
        </header>
    );
}

export default Header;
