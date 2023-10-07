import React, {ReactNode} from 'react';

interface IProps {
    children: ReactNode,
}


const AnswerOrder = ({children}: IProps) => {
    return (
        <div style={{flex: 1, display: 'flex'}}>
            {children}
        </div>
    );
};

export default AnswerOrder;