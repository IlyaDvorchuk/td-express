import React from 'react';
import './count-good.scss'

interface IProps {
    count: number,
    onSetCount: (operator: '+' | '-') => void
}

const CountGood = ({count, onSetCount}: IProps) => {
    return (
        <div className={'update-button'}>
                            <span className={'update update_minus'} onClick={() => onSetCount('-')}>
                                <img src="/images/svg/little-minus.svg" alt="На один товар меньше заказать"/>
                            </span>
            <span className={'count'}>{count}</span>
            <span className={'update update_plus'} onClick={() => onSetCount('+')}>
                                <img src="/images/svg/little-plus.svg" alt="На один товар меньше заказать"/>
                            </span>
        </div>
    );
};

export default CountGood;