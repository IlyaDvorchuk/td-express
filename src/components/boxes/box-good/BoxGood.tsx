import React, {useEffect, useMemo, useRef, useState} from 'react';
import './box-good.scss'
import '../../../styles/elements/buttons.scss'
import {Link, useNavigate} from "react-router-dom";
import {IProductCardRes, ITypeRes} from "../../../models/IProductCard";
import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation } from "swiper";
import 'swiper/scss';
import "swiper/scss/navigation";
import {UserService} from "../../../services/UserService";
import CountGood from "../../countGood/CountGood";
import {GoodsService} from "../../../services/GoodsService";
import {IShelterForGood} from "../../../models/response/IShelter";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {locationSlice} from "../../../store/reducers/LocationSlice";
import {ShelterService} from "../../../services/ShelterService";
import {IDeliveryCity} from "../../../models/IDeliveryCity";
import {calculateCardTypes} from "../../../utils/calculateCardTypes";

const BoxGood = ({card} : {card: IProductCardRes}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const additionalPhotos = useMemo(() => {
        const newPhotos = [...card.additionalPhotos];
        const middleIndex = Math.floor(newPhotos.length / 2);
        newPhotos.splice(middleIndex, 0, card.mainPhoto);
        return newPhotos;
    }, [card.additionalPhotos, card.mainPhoto]);
    const {city} = useAppSelector(state => state.locationReducer)
    const {changeActive} = locationSlice.actions
    const [mainPhoto, setMainPhoto] = useState(card.mainPhoto);
    const [shelter, setShelter] = useState<IShelterForGood | null>(null)
    const [count, setCount] = useState(1)
    const [cardTypes, setCardTypes] = useState(() => calculateCardTypes(card.typeQuantity));
    const [activeColor, setActiveColor] = useState('')
    const [activeSize, setActiveSize] = useState('')
    const [isWindowWidth, setIsWindowWidth] = useState(() => {
        return window.innerWidth >= 450 ? 20 : 4;
    });
    const [isNewCard, setIsNewCard] = useState(true)
    const swiperRef = useRef() as any;

    useEffect(() => {

    }, [])

    const [deliveryCities, setDeliveryCities] = useState<IDeliveryCity[]>([])

    useEffect(() => {

        const handleResize = () => {
            setIsWindowWidth(window.innerWidth >= 450 ? 20 : 4);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [])

    const {quantity, typeId, currentType} = useMemo(() => {
        if (activeColor && activeSize && card.typeQuantity && card.typeQuantity?.length > 0) {
            const type = card.typeQuantity?.find(item => item.color?.name === activeColor && item.size === activeSize) as ITypeRes
            return {
                quantity: type?.quantity || 0,
                typeId: type?._id || '',
                currentType: type
        }
        } else if (activeSize && card.typeQuantity && card.typeQuantity?.length > 0) {
            const type = card.typeQuantity?.find(item => item.size === activeSize) as ITypeRes
            return {
                quantity: type?.quantity || 0,
                typeId: type?._id || '',
                currentType: type
            }
        } else return {
            quantity: card.pricesAndQuantity.quantity,
            typeId: '',
            currentType: null
        }
    }, [activeColor, activeSize])

    useEffect(() => {
        setCardTypes(() => calculateCardTypes(card.typeQuantity))
        setActiveColor('')
            setActiveSize('')
        setMainPhoto(card?.mainPhoto);
        setIsNewCard(true)
    }, [card])

    useEffect(() => {
        if (cardTypes.colorsGood.length > 0 && isNewCard) {
            setActiveColor(cardTypes.colorsGood[0].name || ''); // Проверьте на наличие имени и установите его или пустую строку
            cardTypes.colorsGood.forEach(color => {
                if (!color) return;
                const colorImage = card.colors?.find(image => image.name === color.name);
                if (colorImage?.image) {
                    color.image = colorImage.image;
                }
            });
            setIsNewCard(false)
        }
    }, [cardTypes, isNewCard]);

    useEffect(() => {
        const fetchShelter = async () => {
            const response = await GoodsService.getShelterByGood(card.shelterId)
            if (response) {
                setShelter(response.data)
            }
        }

        fetchShelter()
    }, [])

    useEffect(() => {

        const fetchDelivery = async () => {
            if (card.shelterId) {
                const response = await ShelterService.getDelivery(card.shelterId)
                if (response.data) {
                    setDeliveryCities(response.data)
                }
            }
        }

        fetchDelivery()
    }, [card.shelterId])

    useEffect(() => {
        if (activeSize === '' && cardTypes?.sizes.length > 0) {
            setActiveSize(cardTypes?.sizes[0])
        }
    }, [cardTypes?.sizes, activeSize])

    useEffect(() => {
        if (activeColor) {
            const sizesColor = card.typeQuantity?.filter(type => type.color?.name === activeColor).map((size => size.size))
            if (sizesColor) {
                setCardTypes((prevCardTypes) => {
                    return {
                        colorsGood: prevCardTypes.colorsGood,
                        sizes: sizesColor
                    }
                })
                if (sizesColor.includes(activeSize)) return
                setActiveSize(sizesColor[0])
            }
        }
    }, [activeColor])


    const priceDelivery = useMemo(() => {
        const deliveryCity = deliveryCities.find(item => item.city === city);
        return deliveryCity ? deliveryCity.price : null; // Возвращаем цену или null, если город не найден
    }, [deliveryCities, city]);

    const handleAdditionalPhotoClick = (photo: string) => {
        setMainPhoto(photo);
    };

    const onSetCount = (operator: '+' | '-') => {
        if (operator === '+') {
            if (count >= quantity) return
            setCount(count + 1)
        } else if (operator === '-') {
            if (count <= 1) return;
            setCount(count - 1)
        }
    }

    // const handleSlidePrev = () => {
    //     if (swiper) {
    //         swiper.slidePrev();
    //     }
    // };
    //
    // const handleSlideNext = () => {
    //     if (swiper) {
    //         swiper.slideNext();
    //     }
    // };

    const onSetSize = (size: string) => {
        setActiveSize(size)
        // setQuantity(size.quantity)
    }

    const onBack = () => {
        navigate(-1)
    }

    const addToCart = async () => {
        if (count > quantity) return
        await UserService.addToCart({
            productId: card._id,
            quantity: count,
            size: activeSize,
            color: activeColor,
            typeId: typeId || ''
        })
    }

    const onActiveGeolocation = () => {
        dispatch(changeActive(true))
    }

    const onBuy = async () => {
        const typeGood = JSON.stringify({
            count,
            // activeSize
        })
        localStorage.setItem('typeGood', typeGood)
        // const response = await UserService.setBank()
        // console.log('response', response)

        navigate(`/buy/${card._id}`, {
            state: {
                ...card,
                deliveryCities,
                currentType
                // activeSize: activeSize
            }
        })
    }

    const onChangeColor = (str: string) => {
        setActiveColor(str)
    }

    return (
        <div className={'good'}>
            {card.categories.category?.name && <div className={'good__categories'}>
                <Link to={'/'}>Главная </Link>
                 / <Link to={`/category/${card.categories.category.id}`}>{card.categories.category.name} </Link>
                / <Link to={`/category/${card.categories.subcategory.id}`}>{card.categories.subcategory.name} </Link>
                {card.categories.section.name && <>
                    / <Link to={`/category/${card.categories.section.id}`}>{card.categories.section.name} </Link>
                </>}
            </div>}
            <div className={'good-wrapper'}>
                <div className={'good-photos'}>
                    <div className={'good-photos__aside'}>
                        <div className={'good-photos__back'} onClick={onBack}>
                            <img src="/images/svg/arrow-left-bold-little.svg" alt="Вернуться назад"/>
                        </div>
                        <div className={'good-additional-photos'}>

                            <Swiper
                                direction={'vertical'}
                                slidesPerView={3}
                                spaceBetween={isWindowWidth}
                                modules={[Navigation]}
                                className={'good-additional-photos__slider'}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                loop={additionalPhotos.length > 3}
                                grabCursor={true}
                            >
                                {/*<SwiperButtonPrev>Slide</SwiperButtonPrev>*/}
                                {/*<SwiperButtonNext>Slide</SwiperButtonNext>*/}

                                {additionalPhotos.map((photo, index) => (
                                    <SwiperSlide className={'good-additional-photos__slider-item'} key={index}>
                                        <div className={'good-additional-photos__item'} key={index}>
                                            <img
                                                src={`https://api.td-market.md/${photo}`}
                                                alt="Дополнительная фотография"
                                                onClick={() => handleAdditionalPhotoClick(photo)}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        {additionalPhotos.length > 3 && <>
                            <button className={'custom-button custom-button_up'} onClick={() => swiperRef.current.slidePrev()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <rect x="48" width="48" height="48" rx="15" transform="rotate(90 48 0)" fill="#FCF2FE"/>
                                    <path d="M16.9998 28.9429L23.0909 20.7277C23.8103 19.7574 24.9874 19.7574 25.7067 20.7277L31.7979 28.9429" stroke="#643ABE" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                            <button className={'custom-button custom-button_down'} onClick={() => swiperRef.current.slideNext()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <rect x="48" width="48" height="48" rx="15" transform="rotate(90 48 0)" fill="#FCF2FE"/>
                                    <path d="M16.9998 28.9429L23.0909 20.7277C23.8103 19.7574 24.9874 19.7574 25.7067 20.7277L31.7979 28.9429" stroke="#643ABE" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>
                        </>}

                    </div>

                    <div className={'main-photo'}>
                        <img src={`https://api.td-market.md/${mainPhoto}`} alt={card.information.name}/>
                    </div>
                </div>
                <div className={'good-information'}>
                    <h2 className={'good-information__title'}>
                        {card?.information?.name}
                    </h2>
                    <div className={'good-information__shelter-block'}>
                        <Link to={`/seller/${shelter?.name}`} className={'good-information__shelter'}>
                            <div className={'good-information__icon'}>
                                <img src={`https://api.td-market.md/${shelter?.imageShop}`} alt={shelter?.name}/>
                            </div>
                            <div>
                                <h4 className={'name'}>{shelter?.name}</h4>
                            </div>
                        </Link>
                    </div>
                    {cardTypes.colorsGood && cardTypes.colorsGood.length > 0 && <div className={'good-information__colors'}>
                        <h4 className={'good-information__color'}>Цвет: {activeColor}</h4>
                        <div className={'good-information__images'}>
                            {cardTypes.colorsGood.map((color, index) => (
                                <div
                                    key={index}
                                    className={`good-information__image ${color.name === activeColor ? 'active' : ''}`}
                                    onClick={() => onChangeColor(color.name)}
                                >
                                    {color?.image ?
                                        <img src={`https://api.td-market.md/${color.image}`} alt={''}/>
                                        : <div style={{backgroundColor: color.color}}/>}
                                </div>
                            ))}
                        </div>
                    </div>}
                    {cardTypes.sizes && <div className={'good-information__sizes'}>
                        <p className={'good-information__subtitle'}>Размер:</p>
                        <div className={'sizes'}>
                            {cardTypes.sizes.map((size, index) => (
                                <div
                                    className={`size-item ${size === activeSize && 'active'}`}
                                    key={index} onClick={() => onSetSize(size)}
                                >
                                    <span>
                                        {size}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <p className={'good-information__subtitle'}>Таблица размеров</p>
                    </div>}
                    <div className={'good-information__count'}>
                        Количество: {count}
                    </div>
                    <div className={'good-information__update-count'}>
                        <CountGood count={count} onSetCount={onSetCount}/>

                        <div className={'good-information__quantity'}>
                            В наличии: {quantity}
                        </div>
                    </div>
                    <div className={'good-information__prices'}>
                        <span className={'good-information__priceBeforeDiscount'}>
                            {card.pricesAndQuantity.price} RUP
                        </span>
                        { card.pricesAndQuantity.priceBeforeDiscount > 0 && <span className={'good-information__price'}>
                            {card.pricesAndQuantity.priceBeforeDiscount} RUP
                        </span>}
                    </div>
                    {priceDelivery !== null ? <div className={'good-information__delivery'}>
                        Стоимость доставки в <span className={'good-information__city'} onClick={onActiveGeolocation}>
                            {city}</span>
                        <span>: {priceDelivery} RUP</span>
                    </div> :
                        <div className={'good-information__delivery'}>
                            В Ваш город отсутствует доставка. <span className={'good-information__city'} onClick={onActiveGeolocation}>
                            Можете поменять город</span>
                        </div>
                    }
                    <div className={'good-information__buttons'}>
                        <button className={'button button_light'} onClick={addToCart}>
                            Добавить в корзину
                        </button>
                        <button className={'button button_dark'} onClick={onBuy}>
                            Купить сейчас
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxGood;
