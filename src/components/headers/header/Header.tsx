import React, {useEffect} from 'react';
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
import {getUser} from "../../../store/reducers/user/UserCreators";
import UserTools from "../../tools/user-tools/UserTools";
import {fetchCategories} from "../../../store/reducers/categories/CategoriesCreators";



const Header = () => {
    const dispatch = useAppDispatch()
    const {isUserModal, user} = useAppSelector(state => state.userReducer)
    const {changeIsUserModal} = userSlice.actions
    const {categories} = useAppSelector(state => state.categoriesReducer)

    useEffect(() => {
        if ((localStorage.getItem('access_token_user') !== null) && isObjectEmpty(user)) {
            console.log('localStorage.getItem(\'access_token_user\')', localStorage.getItem('access_token_user'))
            dispatch(getUser())
        }
    }, [dispatch, user])

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
                        <Link className={'header__registry'} to={'/registration'}>Продавайте на td-market</Link>
                    </div>
                </div>
                <div className={'header__row-2'}>
                    <Menu/>
                    <Link to={'/'} className={'logo'}>
                        <img src={'/images/logo-market.svg'} alt={'TD Market'}/>
                    </Link>
                    <Search/>
                    <Link to={'/favorites'} className={'link-icon link-icon_favorite'}>
                        <FavoritesSvg/>
                    </Link>
                    <div className={'link-icon'}>
                        <ShoppingSvg/>
                    </div>
                    {!getAccessTokenUser() && <div onClick={openUserModal} className={'link-icon'}>
                        <UserSvg/>
                    </div>}
                    {getAccessTokenUser() && !isObjectEmpty(user) &&
                        <div className={'link-icon'}>
                            <UserTools/>
                        </div>
                    }
                    <Link to={'/'} className={'header__faq'}>
                        <img src="/images/svg/faq.svg" alt="Вопросы"/>
                    </Link>
                    <Geolocation mobile={true}/>
                    {isUserModal && <ModalLogin/>}
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
