import React, {useEffect, useMemo, useState} from 'react';
import './box-shelter-goods.scss'
import '../../../styles/elements/buttons.scss'
import '../../../styles/elements/selects.scss'
import Select from "react-select";
import {useNavigate} from "react-router-dom";
import {IProductCardShelter} from "../../../models/IProductCard";
import {ShelterService} from "../../../services/ShelterService";
import {useAppSelector} from "../../../hooks/redux";
import ShelterCard from "../../cards/shelter-card/ShelterCard";
import {StatusEnum} from "../../../models/enums";
import Pagination from "../../pagination/Pagination";

const goodsOptions = [
    {
        value: StatusEnum.DEFAULT,
        label: 'все'
    },
    {
        value: StatusEnum.APPROVED,
        label: 'в продаже'
    },
    {
        value: StatusEnum.OVER,
        label: 'нет в наличии'
    },
    {
        value: StatusEnum.MODERATION,
        label: 'в модерации'
    },
]

const filterOptions = [
    // {
    //     value: 0,
    //     label: 'сначала с высоким рейнтингом'
    // },
    // {
    //     value: 1,
    //     label: 'сначала с низким рейтингом'
    // },
    {
        value: 2,
        label: 'по дате: сначала старые'
    },
    {
        value: 3,
        label: 'по дате: сначала новые'
    },
]


const BoxShelterGoods = () => {
    const navigate = useNavigate()
    const {isHoverTools} = useAppSelector(state => state.shelterReducer)
    const {shelter} = useAppSelector(state => state.shelterReducer)
    const [cardsShelter, setCardsShelter] = useState<IProductCardShelter[]>([]);
    const [filteredCards, setFilteredCards] = useState<IProductCardShelter[]>([]);
    const [selectedStatus, setSelectedStatus] = useState({
        value: StatusEnum.DEFAULT,
        label: 'все'
    });
    const [option, setOption] = useState(2);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const cardsPerPage = 9;

    useEffect(() => {
        if (selectedStatus.value !== StatusEnum.DEFAULT) {
            setFilteredCards(cardsShelter.filter(card => card.status === selectedStatus.value))
        } else {
            setFilteredCards(cardsShelter)
        }
    }, [cardsShelter, selectedStatus])

    const onCreateGood = (e: any) => {
        e.preventDefault()
        navigate('create')
    }

    const onDelete = async (id: string) => {
        const answer = await ShelterService.deleteCard(id);

        // Обновляем список товаров
        if (answer.data) {
            setCardsShelter(prevList => prevList.filter(item => item._id !== id));
        }
        return answer.status === 200
    };

    useEffect(() => {
        const fetchShelterCards = async () => {
            try {
                const response = await ShelterService.getCardsOfShelter();
                setCardsShelter(response.data.map(card => {
                    const countGood = card.typeQuantity
                        ? card.typeQuantity.reduce((acc, item) => acc + Number(item.quantity), 0)
                        : card.pricesAndQuantity.quantity;

                    let status;
                    if (!shelter.isVerified) {
                        status = StatusEnum.PENDING_MODERATION;
                    } else if (countGood < 1) {
                        status = StatusEnum.OVER;
                    } else if (!card.published) {
                        status = StatusEnum.MODERATION;
                    } else {
                        status = StatusEnum.APPROVED;
                    }

                    return { ...card, countGood, status }; // Возвращаем объект с добавленными полями countGood и status
                }));
            } catch (error) {
                console.log('Ошибка при получении карточек товаров:', error);
            }
        };

        fetchShelterCards();
    }, [])

    const onChangeStatus = (e: any) => {
        const {value} = e
        const option = goodsOptions.find(opt => opt.value === value)
        if (option) setSelectedStatus(option)
    }

    const onChangeSelect = (selectedOption: any) => {
        const { value } = selectedOption;
        if (value === 2 && option !== 2) {
            setCardsShelter((prevList) => [...prevList].reverse());
            setOption(1)
        }
        if (value === 3) {
            setCardsShelter((prevList) => [...prevList].reverse());
                setOption(3)
        }
        setOption(value);
    };

    const currentCards = useMemo(() => {
        const indexOfLastCard = currentPage * cardsPerPage;
        const indexOfFirstCard = indexOfLastCard - cardsPerPage;
        return filteredCards.slice(indexOfFirstCard, indexOfLastCard);
    }, [currentPage, filteredCards]);

    const handlePageChange = (page: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(page);
    };

    return (
        <div className={'goods'}>
            <div className={'goods__selects'}>
                <div className={'select'}>
                    <span className={'select__label'}>Показать товары:</span>
                    <Select
                        options={goodsOptions}
                        value={selectedStatus}
                        className={'select-input select-input_goods'}
                        classNamePrefix={'select'}
                        isSearchable={false}
                        onChange={onChangeStatus}
                    />
                </div>
                <div className={'select'}>
                    <span className={'select__label'}>Отсортировать:</span>
                    <Select
                        options={filterOptions}
                        defaultValue={filterOptions[0]}
                        className={'select-input select-input_filter'}
                        classNamePrefix={'select'}
                        isSearchable={false}
                        onChange={onChangeSelect}
                    />
                </div>
                <button
                    className={'button button_dark goods__button'}
                    onClick={onCreateGood}
                    style={{zIndex: isHoverTools ? 1 : 1111}}
                >
                    Добавить товар
                </button>
            </div>
            <div className={'goods-wrapper'}>
                {currentCards.map((card) => (
                    <ShelterCard card={card} key={card._id} onDelete={onDelete} selectedStatus={selectedStatus.value} />
                ))}
            </div>
            {cardsPerPage < filteredCards.length && <div className={'goods__pagination'}>
                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredCards.length}
                    itemsPerPage={cardsPerPage}
                    onPageChange={handlePageChange}
                />
            </div>}
        </div>
    );
};

export default BoxShelterGoods;
