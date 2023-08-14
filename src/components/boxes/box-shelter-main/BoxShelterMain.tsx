import React from 'react';
import './box-shelter-main.scss'
import {useAppSelector} from "../../../hooks/redux";
import {useNavigate} from "react-router-dom";
import {API_URL} from "../../../http";

const BoxShelterMain = () => {
    const {shelter} = useAppSelector(state => state.shelterReducer)
    const navigation = useNavigate()

    const onCreateGood = () => {
        navigation('/seller/goods/create')
    }

    return (
        <div>
            {!shelter?.isVerified && (
                <div className={'shelter-warning'}>
                    В данный момент ваши документы проходят проверку, она продлится не более 30 минут. После ее успешного окончания вы сможете начать торговать. Пока что можете подготовить свой товар к продаже во вкладке "Мои товары".
                </div>
                )
            }
            <div className={'shelter'}>
                <div className={'shelter__left'}>
                    <div className={'shelter__information'}>
                        <h3 className={'shelter__subtitle shelter__information-title'}>Добро пожаловать !</h3>
                        <div className={'rate'}>
                            <div className={'rate__header'}>
                                <div className={'rate__icon'}>
                                    <img src={`${API_URL}${shelter?.imageShop}`} alt="Иконка продавца"/>
                                </div>
                                <div className={'rate__name'}>
                                    <p className={'name-market'}>
                                        {shelter?.shop?.nameMarket}
                                    </p>
                                    <p className={'isIndividual-name'}>
                                        {shelter?.name}
                                    </p>
                                </div>
                            </div>
                            <p className={'rate__inf'}>Ваш тарифный план: базовый</p>
                            <p className={'rate__inf'}>Окончание платной подписки: 30 июля</p>
                            <button className={'button button_dark rate__button'}>ПРОДЛИТЬ ПОДПИСКУ</button>
                        </div>
                    </div>
                    <div className={'shelter__news'}>
                        <h3 className={'shelter__subtitle shelter__news-title'}>Новости</h3>
                        <div className="news">
                            <h4 className={'news__time'}>30.06.2023</h4>
                            <p>
                                Учитывая ключевые сценарии поведения, базовый вектор развития предопределяет высокую востребованность позиций, занимаемых участниками в отношении поставленных задач. В целом, конечно, постоянный количественный рост и сфера нашей активности говорит о возможностях новых предложений.
                            </p>
                        </div>
                    </div>
                </div>
                <div className={'shelter__right'}>
                    <div className={'shelter__goods'}>
                        <h3 className={'shelter__subtitle shelter__goods-title'}>Информация о товарах</h3>
                        <div className={'shelter-goods'}>
                            <div className={'statistics'}>
                                <div className={'statistics__item'}>
                                    <span>Количество просмотров:</span>
                                    <span>0</span>
                                </div>
                                <div className={'statistics__item'}>
                                    <span>Количество продаж:</span>
                                    <span>0</span>
                                </div>
                                <div className={'statistics__item'}>
                                    <span>Количество добавленных в избранное:</span>
                                    <span>0</span>
                                </div>
                                <div className={'statistics__item'}>
                                    <span>Количество добавленных в корзину:</span>
                                    <span>0</span>
                                </div>
                            </div>
                            <div className={'good-add'} onClick={onCreateGood}>
                                    <div className={'good-add__img'}>
                                        <img src="/images/svg/big-plus.svg" alt="Добавить товар"/>
                                    </div>
                                    <div className={'good-add__text'}>
                                        Загрузить товары
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className={'shelter__orders'}>
                        <div className={'orders-header'}>
                            <h3 className={'shelter__subtitle'}>Информация о заказах</h3>
                            <button className={'button button_light orders-header__button'}>Подробнее</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BoxShelterMain;
