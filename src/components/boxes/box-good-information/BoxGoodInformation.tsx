import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown'
import './box-good-information.scss'
import {IProductCard} from "../../../models/IProductCard";
import BoxReviews from "../box-reviews/BoxReviews";

const BoxGoodInformation = ({card} : {card: IProductCard}) => {

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div className={'good-additional'}>
            <div className={'good-tabs'}>
                <h4
                    className={`good-tabs__item ${activeTab === 0 && 'active'}`}
                    onClick={() => handleTabClick(0)}
                >
                    Описание
                </h4>
                <h4
                    className={`good-tabs__item ${activeTab === 1 && 'active'}`}
                    onClick={() => handleTabClick(1)}
                >
                    Характеристики
                </h4>
                <h4
                    className={`good-tabs__item not-mobile ${activeTab === 2 && 'active'}`}
                    onClick={() => handleTabClick(2)}
                >
                    Отзывы
                </h4>
            </div>
            {activeTab === 0 &&
                <div className={'good-additional__information'}>
                    <ReactMarkdown children={card.information.description}/>,
                </div>
            }
            {activeTab === 1 &&
                <div className={'good-additional__seasons'}>
                    {card.additionalInformation?.seasons && card.additionalInformation?.seasons.length > 0 && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Сезон
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.seasons.join(', ')}</span>
                    </div>}
                    {card.additionalInformation?.material && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Материал
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.material}</span>
                    </div>}
                    {card.additionalInformation?.recommendations && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Рекомендации
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.recommendations}</span>
                    </div>}
                    {card.additionalInformation?.brand && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Бренд
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.brand}</span>
                    </div>}
                    {card.additionalInformation?.upperMaterial && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Материал верха
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.upperMaterial}</span>
                    </div>}
                    {card.additionalInformation?.liningMaterial && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Материал подкладки
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.liningMaterial}</span>
                    </div>}
                    {card.additionalInformation?.accessoriesColor && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Цвет фурнитуры
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.accessoriesColor}</span>
                    </div>}
                    {card.additionalInformation?.claspType && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Вид застежки
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.claspType}</span>
                    </div>}
                    {card.additionalInformation?.numberOfBranches && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Количество отделений
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.numberOfBranches}</span>
                    </div>}
                    {card.additionalInformation?.pockets && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Карманы
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.pockets}</span>
                    </div>}
                    {card.additionalInformation?.decorativeElements && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Декоративные элементы
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.decorativeElements}</span>
                    </div>}
                    {card.additionalInformation?.countryOfOrigin && <div className={'good-additional__p'}>
                        <span className={'good-additional__name'}>
                            Страна производства
                        </span>
                        <span className={'good-additional__border'}/>
                        <span className={'good-additional__value'}>{card.additionalInformation?.countryOfOrigin}</span>
                    </div>}
                </div>
            }
            {activeTab === 2 && <BoxReviews productId={card._id}/>}
        </div>
    );
};

export default BoxGoodInformation;
