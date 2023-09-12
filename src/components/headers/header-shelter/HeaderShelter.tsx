import React from 'react';
import '../header-req-shelter/header-reg-shelter.scss'
import './header-shelter.scss'
import {Link, useNavigate} from "react-router-dom";
import Container from "../../container/Container";

import { useLocation } from 'react-router-dom';
import ShelterTools from "../../tools/shelter-tools/ShelterTools";

const HeaderShelter = () => {
    const navigation = useNavigate()
    const location = useLocation()

    const links = [
        {
            href: '/seller/main',
            name: 'Главная',
        },
        {
            href: '/seller/orders',
            name: 'Мои заказы',
        },
        {
            href: '/seller/goods',
            name: 'Мои товары',
        },
        {
            href: '/seller/delivery',
            name: 'Доставка',
        },
        {
            href: '/seller/subscription',
            name: 'Оформить подписку',
        },
    ]

    const findActiveLinkIndex = () => {
        const currentPath = location.pathname;
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            if (currentPath === link.href || currentPath.startsWith(link.href + '/')) {
                return i;
            }
        }
        return -1;
    }

    const activeLinkIndex = findActiveLinkIndex();

    const onClickLink = (index: number, link: string) => {
        navigation(link)
    }

    return (
        <header className={'header-shelter'}>
            <Container>
                <div className={'header-shelter__wrapper'}>
                    <Link to={'/seller/main'} className={'header-shelter__logo'}>
                        <img src={'/images/logo-market.svg'} alt={'TD Market'}/>
                    </Link>
                    <ShelterTools/>
                    <div className={'links'}>
                        {links.map((link, index) => (
                            <Link
                                className={`links__item ${activeLinkIndex === index && 'active'}`}
                                to={link.href}
                                key={index}
                                onClick={() => onClickLink(index, link.href)}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>

            </Container>
        </header>
    );
};

export default HeaderShelter;

