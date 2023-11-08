import React from 'react';
import './status.scss'
import classNames from "classnames";
import {OrderEnum} from "../../models/enums";

const Status = ({status}: {status: string}) => {
    return (
        <div className={'status-container'}>
            <div className={classNames('status-color', {
                'status-color_grey': status === OrderEnum.AWAITING_CONFIRMATION,
                'status-color_yellow': status === OrderEnum.AWAITING_SHIPMENT,
                'status-color_orange': status === OrderEnum.DELIVERY,
                'status-color_green': status === OrderEnum.COMPLETED,
            })}/>
            <div className={'status-text'}>
                {status === OrderEnum.AWAITING_CONFIRMATION && 'ожидает подтверждения'}
                {status === OrderEnum.AWAITING_SHIPMENT && 'заказ подтверждён'}
                {status === OrderEnum.DELIVERY && 'заказ отправлен'}
                {status === OrderEnum.COMPLETED && 'заказ завершён'}
            </div>
        </div>
    )
}


export default Status;