import React, {useState} from 'react';
import './footer.scss';
import Container from "../../container/Container";
import {Link} from "react-router-dom";



const Footer = () => {
    const [isExpanded, setIsExpanded] = useState([false, false, false, false]);

    const toggleExpand = (index: number) => {
        const updatedExpanded = [...isExpanded];
        updatedExpanded[index] = !updatedExpanded[index];
        setIsExpanded(updatedExpanded);
    };


    return (
        <footer className={'footer'}>
            <Container isWideMobile={true}>
                <div className={'footer__wrapper'}>
                    <div className={`footer__column ${isExpanded[0] ? 'expanded' : ''}`}>
                        <h3 className={'footer__title'} onClick={() => toggleExpand(0)}>
                            <span>
                                Покупателям
                            </span>
                            <img src={'/images/svg/arrow-down.svg'} alt={'Переключить'} className={'footer__arrow'}/>
                        </h3>
                        <div className={'footer__list'}>
                            <Link to={'/faq#howToOrder'} className={'footer__link'}>Как сделать покупку</Link>
                            <Link to={'/faq#delivery'} className={'footer__link'}>Как работает доставка</Link>
                            <a href={'https://t.me/TDMarket_bot'} target={'_blank'} rel="noopener noreferrer" className={'footer__link'}>Поддержка</a>
                        </div>
                    </div>
                    <div className={`footer__column ${isExpanded[1] ? 'expanded' : ''}`}>
                        <h3 className={'footer__title'} onClick={() => toggleExpand(1)}>
                            <span>
                                Продавцам
                            </span>
                            <img src={'/images/svg/arrow-down.svg'} alt={'Переключить'} className={'footer__arrow'}/>
                        </h3>
                        <div className={'footer__list'}>
                            <Link to={'/registration'} className={'footer__link'}>Продавайте на td-market</Link>
                            <Link to={'/seller'} className={'footer__link'}>Личный кабинет продавца</Link>
                            <a href={'/documents/oferta_td_market.pdf'} target={'_blank'} rel="noopener noreferrer" className={'footer__link'}>Документация</a>
                        </div>
                    </div>
                    <div className={`footer__column ${isExpanded[2] ? 'expanded' : ''}`}>
                        <h3 className={'footer__title'} onClick={() => toggleExpand(2)}>
                            <span>
                                Компания
                            </span>
                            <img src={'/images/svg/arrow-down.svg'} alt={'Переключить'} className={'footer__arrow'}/>
                        </h3>
                        <div className={'footer__list'}>
                            <Link to={'/faq'} className={'footer__link'}>Вопрос - ответ</Link>
                            <a href={'/documents/oferta_td_market.pdf'} target={'_blank'} rel="noopener noreferrer" className={'footer__link'}>Договор публичной оферты</a>
                        </div>
                    </div>
                    <div className={`footer__column ${isExpanded[3] ? 'expanded' : ''}`}>
                        <h3 className={'footer__title'} onClick={() => toggleExpand(3)}>
                            <span>
                                Мы в соцсетях
                            </span>
                            <img src={'/images/svg/arrow-down.svg'} alt={'Переключить'} className={'footer__arrow'}/>
                        </h3>
                        <div className={'footer__list'}>
                            <div className={'footer__icons'}>
                                <a href={'https://t.me/td_market'} target={"_blank"} rel="noreferrer">
                                    <img src="/images/svg/telegram.svg" alt="Telegram"/>
                                </a>
                                <a href={'https://www.instagram.com/td_market_official/'} target={"_blank"} rel="noreferrer">
                                    <img src="/images/svg/instagram.svg" alt="Instagram"/>
                                </a>
                            </div>
                        </div>
                        <p className={'footer__text'}>Информация, предоставленная на сайте, не является публичной офертой. Все права защищены.</p>
                    </div>
                    <p className={'footer__text_mobile'}>Информация, предоставленная на сайте, не является публичной офертой.<br/>Все права защищены.</p>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
