import React, { useMemo, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { IProductCard } from "../../../models/IProductCard";
import '../../../styles/elements/buttons.scss';
import './box-good.scss';

const BoxGood = () => {
  const location = useLocation();
  const card: IProductCard = useMemo(() => {
    return location.state;
  }, [location.state]);

  const additionalPhotos = useMemo(() => {
    const newPhotos = [...card.additionalPhotos];
    const middleIndex = Math.floor(newPhotos.length / 2);
    newPhotos.splice(middleIndex, 0, card.mainPhoto);
    return newPhotos;
  }, [card.additionalPhotos, card.mainPhoto]);

  const [mainPhoto, setMainPhoto] = useState(card.mainPhoto);
  const [count, setCount] = useState(1);

  const handleAdditionalPhotoClick = (photo: string) => {
    setMainPhoto(photo);
  };

  const onSetCount = (operator: '+' | '-') => {
    console.log('operator', operator);
    if (operator === '+') {
      if (count >= card.pricesAndQuantity.quantity) return;
      setCount(count + 1);
    } else if (operator === '-') {
      if (count <= 1) return;
      setCount(count - 1);
    }
  };

  return (
    <div className={'good'}>
      <div className={'good__categories'}>
        <Link to={'/'}>Главная</Link> / <Link to={'/'}>Все категории</Link> / <Link to={'/'}>Женская одежда</Link> / <Link to={'/'}>Платья</Link>
      </div>
      <div className={'good-wrapper'}>
        <div className={'good-additional-photos'}>
          {additionalPhotos.map((photo, index) => (
            <div className={'good-additional-photos__item'} key={index}>
              <img src={photo} alt='Дополнительная фотография' onClick={() => handleAdditionalPhotoClick(photo)} />
            </div>
          ))}

        </div>
        <div className={'main-photo'}>
          <img src={mainPhoto} alt={card.information.name} />
        </div>
        <div className={'good-information'}>
          <h2 className={'good-information__title'}>
            {card.information.name}
          </h2>
          <div className={'good-information__count'}>
            Количество: {count}
          </div>
          <div className={'good-information__update-count'}>
            <div className={'good-information__update-button'}>
                            <span className={'update update_minus'} onClick={() => onSetCount('-')}>
                                <img src='/images/svg/little-minus.svg' alt='На один товар меньше заказать' />
                            </span>
              <span className={'count'}>{count}</span>
              <span className={'update update_plus'} onClick={() => onSetCount('+')}>
                                <img src='/images/svg/little-plus.svg' alt='На один товар меньше заказать' />
                            </span>
            </div>
            <div className={'good-information__quantity'}>
              В наличии: {card.pricesAndQuantity.quantity}
            </div>
          </div>
          <div className={'good-information__prices'}>
                        <span className={'good-information__priceBeforeDiscount'}>
                            {card.pricesAndQuantity.priceBeforeDiscount ? card.pricesAndQuantity.priceBeforeDiscount : card.pricesAndQuantity.price} RUP
                        </span>
            <span className={'good-information__price'}>
                            {card.pricesAndQuantity.quantity && card.pricesAndQuantity.price} RUP
                        </span>
          </div>
          <div className={'good-information__buttons'}>
            <button className={'button button_light'}>
              Добавить в корзину
            </button>
            <button className={'button button_dark'}>
              Купить сейчас
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxGood;
