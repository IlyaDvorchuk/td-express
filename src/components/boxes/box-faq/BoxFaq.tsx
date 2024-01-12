import React from 'react';
import './box-faq.scss'

const BoxFaq = () => {
    return (
        <div className={'faq'}>
            <h2 className={'faq__title'}>
                Вопрос-ответ
            </h2>
            <main className={'faq__main'}>

                <aside className={'aside'}>
                    <div className={'aside__block'}>
                        <a className={'aside__title'} href={'#checkout'}>
                            Оформление заказа
                        </a>
                        <a href="#howToOrder" className={'aside__anchor'}>
                            Как заказать?
                        </a>
                        <a href="#howDoIAdd" className={'aside__anchor'}>
                            Как добавить или удалить товар из оформленного заказа?
                        </a>
                        <a href="#howCanITrack" className={'aside__anchor'}>
                            Как я могу отследить заказ?
                        </a>
                    </div>
                    <div className={'aside__block'}>
                        <a href={'#delivery'} className={'aside__title'}>
                            Доставка
                        </a>
                        <a href="#howFast" className={'aside__anchor'}>
                            Как быстро доставят мой заказ?
                        </a>
                        <a href="#howToChange" className={'aside__anchor'}>
                            Как изменить дату доставки?
                        </a>
                    </div>
                    <div className={'aside__block'}>
                        <a href={'#payment'} className={'aside__title'}>
                            Оплата
                        </a>
                        <a href="#howToPay" className={'aside__anchor'}>
                            Как оплатить заказ?
                        </a>
                    </div>
                    <div className={'aside__block'}>
                        <a href={'#return'} className={'aside__title'}>
                            Возврат товаров и денег
                        </a>
                        <a href="#howWillIGet" className={'aside__anchor'}>
                            Как мне вернут деньги?
                        </a>
                        <a href="#whichCard" className={'aside__anchor'}>
                            На какую карту придут деньги?
                        </a>
                    </div>
                    <div className={'aside__block'}>
                        <a href={'#consultation'} className={'aside__title'}>
                            Консультаця по товару
                        </a>
                    </div>
                </aside>
                <section className={'information'}>
                    <h2 className={'information__title'} id={'checkout'}>
                        Оформление заказа
                    </h2>
                    <h3 className={'information__subtitle'} id={'howToOrder'}>
                        Как заказать?
                    </h3>
                    <p className={'information__p'}>
                        <ol>
                            <li>
                                Добавьте товары в корзину
                            </li>
                            <li>
                                Проверьте количество и характеристики товара: например, размер и цвет
                            </li>
                            <li>
                                Нажмите «Оформить»
                            </li>
                            <li>
                                В разделе оформления заказа укажите город и выберите способ доставки
                            </li>
                            <li>
                                Введите и проверьте данные о получателе заказа. Почему это важно: на указанный телефон позвонит оператор и уточнит время и дату доставки
                            </li>
                            <li>
                                Оплатите заказ. Введите реквизиты карты. Минимальная сумма заказа — будет отображена в вашей корзине.
                            </li>
                            <li>
                                Для завершения оплаты картой введите код, который придет от вашего банка

                            </li>
                        </ol>
                    </p>
                    <h3 className={'information__subtitle'} id={'howDoIAdd'}>
                        Как добавить или удалить товар из оформленного заказа?
                    </h3>
                    <p className={'information__p'}>
                        Мы собираем и отправляем заказы очень быстро — между оплатой и сборкой вашего заказа проходит всего пара минут. Поэтому мы технически не можем добавлять или удалять товары из оформленного и оплаченного заказа.
                    </p>
                    <h3 className={'information__subtitle'} id={'howCanITrack'}>
                        Как я могу отследить заказ?
                    </h3>
                    <p className={'information__p'}>
                        Заказ можно отследить по статусу. Он отобразится в разделе «Мои заказы». Заказы проходят несколько этапов доставки:<br/><br/>
                        «Ожидает подтверждения» — заказ ожидает подтверждения продавцом.<br/> «Ожидает отправки» — мы упаковываем товары на складе и готовим их к отправке.<br/>«Отправлен» — заказ уже в пути.<br/> «Получен» — заказ прибыл.
                    </p>
                    <h3 className={'information__subtitle'} id={'howToCansel'}>
                        Как отменить оформленный заказ?
                    </h3>
                    <p className={'information__p'}>
                        — <a href={'https://t.me/TDMarket_bot'}>https://t.me/TDMarket_bot</a> для отмены заказа<br/>
                        — по телефону +373 (775) 48381;
                    </p>
                    <h2 className={'information__title'} id={'delivery'}>
                        Доставка
                    </h2>
                    <h3 className={'information__subtitle'} id={'howFast'}>
                        Как быстро доставят мой заказ?
                    </h3>
                    <p className={'information__p'}>
                        Сроки доставки заказа от 1 до 5 рабочих дней. После оформления заказа с Вами свяжется оператор и уточнит сроки доставки.
                    </p>
                    <h3 className={'information__subtitle'} id={'howToChange'}>
                        Как изменить адрес доставки для уже оформленного заказа?
                    </h3>
                    <p className={'information__p'}>
                        Мы можем перенести ее на несколько дней вперед.<br/>
                        Напишите нашему telegram-боту, он решит этот вопрос
                        <a href={'https://t.me/TDMarket_bot'}>https://t.me/TDMarket_bot</a>
                    </p>
                    <h2 className={'information__title'} id={'payment'}>
                        Оплата
                    </h2>
                    <h3 className={'information__subtitle'} id={'howToPay'}>
                        Как оплатить заказ?
                    </h3>
                    <p className={'information__p'}>
                        На сайте или в приложении после оформления заказа. Доступные способы оплаты:<br/>
                        Банковскими картами любого банка ПМР
                    </p>


                    <h2 className={'information__title'} id={'consultation'}>
                        Консультация по товару
                    </h2>
                    <p className={'information__p'}>
                        Где получить консультацию по товару?<br/>
                        О характеристиках товара, а также о том, как правильно его использовать, вы можете прочесть в описании товара или уточнить информацию у продавца
                    </p>
                </section>
            </main>
        </div>
    );
};

export default BoxFaq;
