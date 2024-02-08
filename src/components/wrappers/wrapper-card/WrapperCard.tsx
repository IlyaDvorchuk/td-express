import React, {ReactNode} from 'react';
import './wrapper-card.scss'
import '../../../styles/elements/buttons.scss'
import Pagination from "../../pagination/Pagination";

interface IWRapperCard {
    handleButtonClick?: () => void,
    cardsLength?: number,
    limit: number,
    children: ReactNode,
    pagination?: {
        currentPage: number,
        totalItems: number,
        cardsPerPage: number
    } | null
}

const WrapperCard = ({ children, cardsLength, handleButtonClick, limit, pagination }: IWRapperCard) => {
        return (
            <div className={'wrapper'}>
                <div className={'wrapper__container'}>
                    <div className={'wrapper-card'}>
                        {children}
                    </div>
                </div>
                {cardsLength && (cardsLength % limit === 0) && !pagination &&
                    <button onClick={handleButtonClick} className={'button button_light button__add-card'}>
                        Показать ещё
                    </button>
                }
                {cardsLength && (cardsLength % limit === 0) && pagination && handleButtonClick &&
                    <div className={'wrapper__pagination'}>
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalItems={pagination.totalItems}
                            itemsPerPage={pagination.cardsPerPage}
                            onPageChange={handleButtonClick}
                        />
                    </div>

                }
            </div>
        );
};

export default WrapperCard;
