import React, {useEffect, useMemo, useState} from 'react';
import './shelter-card.scss'
import {IProductCardRes} from "../../../models/IProductCard";
import {API_URL} from "../../../http";
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



interface IProps {
    card: IProductCardRes,
    onDelete: (id: string) => Promise<boolean>,
    selectedStatus: StatusEnum | null
}



const ShelterCard = ({card, onDelete, selectedStatus}: IProps) => {
    const {shelter} = useAppSelector(state => state.shelterReducer)
    const navigate = useNavigate()
    const [isPressed, setIsPressed] = useState(false)
    const [isDeleteModal, setIsDeleteModal]= useState(false)
    const [status, setStatus] = useState<StatusEnum>(StatusEnum.DEFAULT)

    const countGood = useMemo(() => {
        if (card.typeQuantity) {
            return card.typeQuantity.reduce((acc, item) => acc + Number(item.quantity), 0);
        } else {
            return card.pricesAndQuantity.quantity
        }
    }, [card])

    useEffect(() => {
        if (!shelter.isVerified) {
            setStatus(StatusEnum.PENDING_MODERATION)
        } else if (countGood < 1) {
            setStatus(StatusEnum.OVER)
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
                    <img src={`${API_URL}${card.mainPhoto}`} alt={card.information.name}/>
                </div>

                <div className={'shelter-card__statistic'}>

                    <div className={'shelter-card__row-first'}>
                        <div>
                            <div className={classNames('status', {
                                'status_green': status === StatusEnum.APPROVED,
                                'status_yellow': status === StatusEnum.MODERATION || status === StatusEnum.PENDING_MODERATION,
                                'status_red': status === StatusEnum.OVER,
                            })}>
                                {status}
                            </div>
                        </div>
                        <div className={'shelter-card__tools'}>
                            <div className={'shelter-card__burger'}>

                                <ButtonBurger isPressed={isPressed} setIsPressed={setIsPressed} isLittle={true}/>
                            </div>
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
            <h4 className={'card-name'}>
                {card.information.name}
            </h4>
            <div className={'shelter-card__category'}>
                {card.categories.category?.name}/ {card.categories.subcategory?.name}/ {
                card.categories.section?.id && card.categories.section?.name
            }
            </div>
            <div className={'shelter-card__price'}>
                <span className={'price'}>
                    {card.pricesAndQuantity.price} RUP
                </span>
                {
                    card.pricesAndQuantity.priceBeforeDiscount > 0 &&
                    <span className={'discount'}>{card.pricesAndQuantity.priceBeforeDiscount} RUP</span>
                }
            </div>
            {isDeleteModal && <Cover callback={() => setIsDeleteModal(false)} zIndex={9998}/>}
            {isDeleteModal && <DeletionConfirmation
                name={card.information.name}
                closeModal={() => setIsDeleteModal(false)}
                onDelete={() => onDeleteCard(card._id)}
            />}
        </div>
    ) : null;
};

export default ShelterCard;
