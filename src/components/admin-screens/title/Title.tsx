import React, {ReactNode} from 'react';
import './title.scss'

interface IProps {
    children: ReactNode,
}


const Title = ({children}: IProps) => {
    return (
        <div className={'title-admin'}>
            {children}
        </div>
    );
};

export default Title;