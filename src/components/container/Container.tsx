import React, {ReactNode} from 'react';
import './container.scss'
import {useLocation} from "react-router-dom";
import {useWindowWidth} from "../../hooks/useWindowWidth";

interface IProps {
    children: ReactNode,
    isWideMobile?: boolean
}

const Container = ({children, isWideMobile = false}: IProps) => {
    const location = useLocation();
    const windowWidth = useWindowWidth()
    const isGreyContainer = location.pathname.endsWith('/seller/orders') && (windowWidth < 600)
    const isScrollOrders = location.pathname.endsWith('/seller/orders');

    return (
        <div className={`
        container ${isWideMobile ? 'wide-mobile' : ''} ${isGreyContainer ? 'container_grey' : ''}  ${isScrollOrders ? 'container_scroll' : ''}
        `}>
            {children}
        </div>
    )
};

export default Container;
