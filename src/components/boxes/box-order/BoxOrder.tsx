import React from 'react';
import './box-order.scss'
import Select from "react-select";

const BoxOrder = () => {
    return (
        <form className={'order'}>
            <h3>Оформление заказа</h3>
            <div>
                <div>
                    <label htmlFor="order-city">Выберите город доставки</label>
                    <Select id={'order-city'}/>
                </div>
                <div>
                    <label>Выберите способ доставки</label>
                </div>
                <div>
                    <h4>Адрес доставки</h4>
                    <div>
                        <label htmlFor="">Улица</label>
                        <input/>
                    </div>
                    <div>
                        <label htmlFor="">Дом</label>
                        <input/>
                    </div>
                    <div>
                        <label htmlFor="">Подъезд</label>
                        <input/>
                    </div>
                    <div>
                        <label htmlFor="">Этаж</label>
                        <input/>
                    </div>
                    <div>
                        <label htmlFor="">Квартира</label>
                        <input/>
                    </div>
                    <div>
                        <label htmlFor="">Комментарий для курьера (домофон не работает, оставить у двери и т.д.)</label>
                        <textarea/>
                    </div>
                </div>
                <div>
                    <h4>Данные о получателе</h4>
                    <div>
                        <label htmlFor="">Фамилия</label>
                        <input/>
                    </div>
                    <div>
                        <label htmlFor="">Имя</label>
                        <input/>
                    </div>
                    <div>
                        <label htmlFor="">Номер телефона</label>
                        <input/>
                    </div>

                </div>
                <div>
                    <h4>Способ оплаты</h4>
                </div>
            </div>
        </form>
    );
};

export default BoxOrder;