import React, {ReactNode} from 'react';
import './container.scss'
import {useLocation} from "react-router-dom";

interface IProps {
    children: ReactNode,
    isWideMobile?: boolean
    isGreyContainer?: boolean
}

const Container = ({children, isWideMobile = false, isGreyContainer = false}: IProps) => {
    const location = useLocation();
    const isScrollOrders = location.pathname.endsWith('/seller/orders');

    return (
        <div className={`container ${isWideMobile && 'wide-mobile'} ${isGreyContainer && 'container_grey'}  ${isScrollOrders && 'container_scroll'}`}>
            {children}
        </div>
    )
};

export default Container;
