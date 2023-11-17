import React, {ReactNode} from 'react';
import './container.scss'

interface IProps {
    children: ReactNode,
    isWideMobile?: boolean
    isGreyContainer?: boolean
}

const Container = ({children, isWideMobile = false, isGreyContainer = false}: IProps) => {
    return (
        <div className={`container ${isWideMobile && 'wide-mobile'} ${isGreyContainer && 'container_grey'}`}>
            {children}
        </div>
    )
};

export default Container;
