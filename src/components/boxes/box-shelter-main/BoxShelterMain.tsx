import React, {useEffect, useState} from 'react';
import './box-shelter-main.scss'
import {useAppSelector} from "../../../hooks/redux";
import {Link, useNavigate} from "react-router-dom";
import {API_URL} from "../../../http";
import {ShelterService} from "../../../services/ShelterService";
import {IOrderRes} from "../../../models/IOrder";
import OrderMiniCard from "../../cards/order-mini-card/OrderMiniCard";
import {useWindowWidth} from "../../../hooks/useWindowWidth";

const BoxShelterMain = () => {
    const {shelter} = useAppSelector(state => state.shelterReducer)
    const navigation = useNavigate()
    const [orders, setOrders] = useState<IOrderRes[]>([])
    const windowWidth = useWindowWidth()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ShelterService.getOrdersOfSeller(5)
                if (response.data) setOrders(response.data)
            } catch (error) {
                console.error('Ошибка при удалении уведомлений:', error);
            }
        };

        fetchData();
    }, []);

    const onCreateGood = () => {
        navigation('/seller/goods/create')
    }

    return (
        <>
            {windowWidth < 600 && <div className={'shelter-mobile-header'}>
                td-seller
            </div>}
            <div className={'shelter-wrapper'}>
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
                                <p className={'rate__inf'}>&nbsp;</p>
                                <button className={`button ${windowWidth > 500 ? 'button_dark' : 'button_light'} rate__button`}>Изменить тарифный план </button>
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
                                <Link to={'/seller/orders'} className={'button button_light orders-header__button'}>Подробнее</Link>
                            </div>
                            {orders.map((order, index) => (
                                <OrderMiniCard order={order} isEven={index % 2 === 0} key={order._id}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default BoxShelterMain;
