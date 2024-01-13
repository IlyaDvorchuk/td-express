import React, {useEffect, useMemo, useState} from 'react';
import './shelter-card.scss'
import {IProductCardRes} from "../../../models/IProductCard";
import ButtonBurger from "../../buttons/button-burger/ButtonBurger";
import {useNavigate} from "react-router-dom";
import Cover from "../../cover/Cover";
import DeletionConfirmation from "../../modals/deletion-confirmation/DeletionConfirmation";
import ChangeCardSvg from "../../svg/ChangeCardSvg";
import DeleteSvg from "../../svg/DeleteSvg";
import {useAppSelector} from "../../../hooks/redux";
import '../../../styles/elements/status.scss'
import classNames from "classnames";
import {StatusEnum} from "../../../models/enums";
import {useWindowWidth} from "../../../hooks/useWindowWidth";



interface IProps {
    card: IProductCardRes,
    onDelete: (id: string) => Promise<boolean>,
    selectedStatus: StatusEnum | null
}



const ShelterCard = ({card, onDelete, selectedStatus}: IProps) => {
    const {shelter} = useAppSelector(state => state.shelterReducer)
    const navigate = useNavigate()
    const windowWidth = useWindowWidth();
    const [isPressed, setIsPressed] = useState(false)
    const [isDeleteModal, setIsDeleteModal]= useState(false)
    const [status, setStatus] = useState<StatusEnum>(StatusEnum.DEFAULT)

    const countGood = useMemo(() => {
        if (card.typeQuantity) {
            return card.typeQuantity.filter(item => item).reduce((acc, item) => acc + Number(item?.quantity), 0);
        } else {
            return card.pricesAndQuantity.quantity
        }
    }, [card])

    useEffect(() => {
        if (!shelter.isVerified) {
            setStatus(StatusEnum.PENDING_MODERATION)
        } else if (countGood < 1) {
            setStatus(StatusEnum.OVER)
        } else if (card.isReject) {
            setStatus(StatusEnum.REJECT)
        } else if (!card.published) {
            setStatus(StatusEnum.MODERATION)
        }  else  {
            setStatus(StatusEnum.APPROVED)
        }
    }, [card, countGood, shelter])

    const onChangeCard = () => {
        navigate(`create/${card._id}`, {
            state: {
                ...card
            }
        })
    }

    const onDeleteCard = async (id: string) => {
        const answer = await onDelete(id);
        if (answer) setIsDeleteModal(false)
    }


    const isMatchingStatus = (status: StatusEnum): boolean => {
        return selectedStatus === StatusEnum.DEFAULT || status === selectedStatus;
    };


    return isMatchingStatus(status) ?  (
        <div className={'shelter-card'}>
            <div className={'shelter-card__header'}>
                <div className={'shelter-card__image'}>
                    <img src={`https://api.td-market.md/${card.mainPhoto}`} alt={card.information.name}/>
                </div>

                <div className={'shelter-card__statistic'}>

                    <div className={'shelter-card__row-first'}>
                        {windowWidth > 600 && <div>
                            <div className={classNames('status shelter-card__status', {
                                'status_green': status === StatusEnum.APPROVED,
                                'status_yellow': status === StatusEnum.MODERATION || status === StatusEnum.PENDING_MODERATION,
                                'status_red': status === StatusEnum.OVER,
                                'status_grey': status === StatusEnum.REJECT,
                            })}>
                                {status}
                            </div>
                        </div>}
                        <div className={'shelter-card__tools'}>
                            {windowWidth > 600 && <div className={'shelter-card__burger'}>
                                <ButtonBurger isPressed={isPressed} setIsPressed={setIsPressed} isLittle={true}/>
                            </div>}
                            <div className={`card-tools ${isPressed && 'active'}`}>
                                <div className={'card-tools__item'} onClick={onChangeCard}>
                                    <ChangeCardSvg/>
                                    <span>редактировать</span>
                                </div>
                                <div className={'card-tools__item'} onClick={() => setIsDeleteModal(true)}>
                                    <DeleteSvg/>
                                    <span>удалить</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={'shelter-card__analytics'}>
                        <div>Просмотры:</div>
                        <output>{card.viewsCount}</output>
                    </div>
                    <div className={'shelter-card__analytics'}>
                        <div>Продано:</div>
                        <output>0</output>
                    </div>
                    <div className={'shelter-card__analytics'}>
                        <div>Осталось на складе:</div>
                        <output>{countGood}</output>
                    </div>

                </div>
            </div>
            <div>
                <div className={'shelter-card__title'}>
                    <div>
                        <h4 className={'card-name'}>
                            {card.information.name}
                        </h4>
                        <div className={'shelter-card__category'}>
                            {card.categories.category?.name}/ {card.categories.subcategory?.name}/ {
                            card.categories.section?.id && card.categories.section?.name
                        }
                        </div>
                        {
                            windowWidth < 600 && <>
                                <div className={'shelter-card__price'}>
                                    <span className={'price'}>
                                        {card.pricesAndQuantity.price} RUP
                                    </span>
                                    {
                                        card.pricesAndQuantity.priceBeforeDiscount > 0 &&
                                        <span className={'discount'}>{card.pricesAndQuantity.priceBeforeDiscount} RUP</span>
                                    }
                                    {status === StatusEnum.REJECT && <button className={'button button_light shelter-card__edit'} onClick={onChangeCard}>
                                        Редактировать
                                    </button>}
                                </div>
                                <div className={'shelter-card__analytics'}>
                                    <div>Просмотры:</div>
                                    <output>{card.viewsCount}</output>
                                </div>
                                <div className={'shelter-card__analytics'}>
                                    <div>Продано:</div>
                                    <output>0</output>
                                </div>
                                <div className={'shelter-card__analytics'}>
                                    <div>Осталось на складе:</div>
                                    <output>{countGood}</output>
                                </div>

                            </>
                        }
                    </div>

                </div>

                {windowWidth > 600 && <div className={'shelter-card__price'}>
                <span className={'price'}>
                    {card.pricesAndQuantity.price} RUP
                </span>
                    {
                        card.pricesAndQuantity.priceBeforeDiscount > 0 &&
                        <span className={'discount'}>{card.pricesAndQuantity.priceBeforeDiscount} RUP</span>
                    }
                    {status === StatusEnum.REJECT &&
                        <button className={'button button_light shelter-card__edit'} onClick={onChangeCard}>
                            Редактировать
                        </button>}
                </div>}
            </div>
            {windowWidth < 600 && <div className={classNames('status-mobile shelter-card__status', {
                'status-mobile_green': status === StatusEnum.APPROVED,
                'status_yellow': status === StatusEnum.MODERATION || status === StatusEnum.PENDING_MODERATION,
                'status_red': status === StatusEnum.OVER,
                'status_grey': status === StatusEnum.REJECT,
            })}>

                <img src={`/images/svg/status/good/${status}.svg`} alt="Удаление товаров"/>
                <span>
                    {status}
                </span>
            </div>}
            {isDeleteModal && <Cover callback={() => setIsDeleteModal(false)} zIndex={9998}/>}
            {isDeleteModal && <DeletionConfirmation
                name={card.information.name}
                closeModal={() => setIsDeleteModal(false)}
                onDelete={() => onDeleteCard(card._id)}
            />}
            <svg onClick={() => {
                setIsPressed(!isPressed)
            }} className={`add-mobile-card ${isPressed && 'active'}`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4.16667 8.33325C3.25 8.33325 2.5 9.08325 2.5 9.99992C2.5 10.9166 3.25 11.6666 4.16667 11.6666C5.08333 11.6666 5.83333 10.9166 5.83333 9.99992C5.83333 9.08325 5.08333 8.33325 4.16667 8.33325ZM15.8333 8.33325C14.9167 8.33325 14.1667 9.08325 14.1667 9.99992C14.1667 10.9166 14.9167 11.6666 15.8333 11.6666C16.75 11.6666 17.5 10.9166 17.5 9.99992C17.5 9.08325 16.75 8.33325 15.8333 8.33325ZM10 8.33325C9.08333 8.33325 8.33333 9.08325 8.33333 9.99992C8.33333 10.9166 9.08333 11.6666 10 11.6666C10.9167 11.6666 11.6667 10.9166 11.6667 9.99992C11.6667 9.08325 10.9167 8.33325 10 8.33325Z" stroke="#6F6E71" strokeWidth="1.5"/>
            </svg>
        </div>
    ) : null;
};

export default ShelterCard;
