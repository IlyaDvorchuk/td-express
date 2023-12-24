import React, { useState} from 'react';
import './box-subscription.scss'
import Cover from "../../cover/Cover";
import {ShelterService} from "../../../services/ShelterService";
import {useAppSelector} from "../../../hooks/redux";

const BoxSubscription = () => {
    const {shelter} = useAppSelector(state => state.shelterReducer)
    const [currentRate, setCurrentRate] = useState('')

    const onClickRate = async (rate: string) => {
        setCurrentRate(rate)
    }

    const onUpdateRate = async () => {
        const response = await ShelterService.changeRate(shelter._id, currentRate)
        if (response.data) {
            setCurrentRate('')
        }
    }

    return (
        <section className={'subscription'}>
            <h2 className={'subscription__title'}>
                Выбор тарифов для продавца
            </h2>
            <div className={'subscription__wrapper'}>
                <div className={`subscription__card ${shelter.rate === 'self-delivery' ? 'selected' : ''}`}>
                    <h3 className={'subscription__subtitle'}>
                        DBS (Delivery by Seller)
                    </h3>
                    <p className={'subscription__information'}>
                        Вы отвечаете за доставку товара покупателю: своими силами или по средством курьерской службы. Маркеплейс взымает с вас комиссию в размере 9% от стоимости реализованного товара.
                    </p>

                    <button className={`button  ${shelter.rate === 'self-delivery' ? 'button_light' : 'button_dark'} subscription__button`} onClick={() => onClickRate('td-delivery')}>
                        ВЫБРАТЬ Тариф
                    </button>
                </div>
                <div className={`subscription__card ${shelter.rate === 'td-delivery' ? 'selected' : ''}`}>
                    <h3 className={'subscription__subtitle'}>
                        FBS (Fulfillment by Seller)
                    </h3>
                    <p className={'subscription__information'}>
                        Вы формируете заказ (упаковываете, складываете), а мы доставим его покупателю в течении одного дня. Маркетплейс взымает с вас комисстю в размере 6% от стоимости реализованного товараю
                    </p>
                    <p className={'subscription__information'}>
                        Первый месяц бесплатный
                    </p>
                    <button className={`button ${shelter.rate === 'td-delivery' ? 'button_light' : 'button_dark'} subscription__button`} onClick={() => onClickRate('self-delivery')}>
                        {shelter.rate === 'td-delivery' ? 'Выбран' : 'ВЫБРАТЬ'} Тариф
                    </button>
                </div>
            </div>
            {currentRate && <Cover callback={() => setCurrentRate('')}/>}
            {currentRate && <div className={'subscription__modal'}>
                <h3 className={'subscription__modal-title'}>
                    Вы выбрали тариф “Доставка td market”
                </h3>
                <p className={'subscription__modal-inf'}>
                    После активации стоимость доставки будет 25 р, с вас будут списывать 10 %. Дуйствие тарифа вступит в
                    силу в течение 10 минут после активации. При наличии промокода на скидку, введите его ниже.
                </p>
                <p className={'subscription__modal-link'}>
                    Ввести промокод
                </p>
                <div className={'subscription__modal-buttons'}>
                    <button className={'button button_light'} onClick={() => setCurrentRate('')}>
                        отмена
                    </button>
                    <button className={'button button_dark'} onClick={onUpdateRate}>
                        продолжить
                    </button>
                </div>
            </div>}
        </section>
    );
};

export default BoxSubscription;
