import React, {useMemo, useState} from 'react';
import './box-good-information.scss'
import {useLocation} from "react-router-dom";
import {IProductCard} from "../../../models/IProductCard";

const BoxGoodInformation = () => {
    const location = useLocation();
    const card: IProductCard = useMemo(() => {
        return location.state
    }, [location.state])
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    return (
        <div className={'good-additional'}>
            <div className={'good-tabs'}>
                <h4 className={`good-tabs__item ${activeTab === 0 && 'active'}`} onClick={() => handleTabClick(0)}>
                    Описание
                </h4>
                <h4 className={`good-tabs__item ${activeTab === 1 && 'active'}`} onClick={() => handleTabClick(1)}>
                    Характеристики
                </h4>
                <h4 className={`good-tabs__item ${activeTab === 2 && 'active'}`} onClick={() => handleTabClick(2)}>
                    Отзывы
                </h4>
                <h4 className={`good-tabs__item ${activeTab === 3 && 'active'}`} onClick={() => handleTabClick(3)}>
                    Описание
                </h4>
            </div>
            {activeTab === 0 &&
                <div className={'good-additional__information'}>
                    {card.information.description}
                </div>
            }
        </div>
    );
};

export default BoxGoodInformation;
