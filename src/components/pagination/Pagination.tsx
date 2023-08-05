import React, {useEffect} from 'react';
import './pagination.scss'

interface IProps {
    currentPage: number,
    totalItems: number,
    itemsPerPage: number,
    onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }: IProps) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        if (currentPage > totalPages) onPageChange(totalPages)
    }, [totalPages, currentPage, onPageChange])

    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <div key={i} className={`pagination__item ${i === currentPage ? 'active' : ''}`}>
                    <div onClick={() => handlePageClick(i)}>{i}</div>
                </div>
            );
        }
        return pageNumbers;
    };

    const onButtonPage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            handlePageClick(page)
        }
    }

    return (
        <div className="pagination">
            <img
                src="/images/svg/pagination/arrow-left.svg"
                alt="Влево"
                className={'pagination__img'}
                onClick={() => onButtonPage(currentPage - 1)}
            />
            {renderPageNumbers()}
            <img
                src="/images/svg/pagination/arrow-right.svg"
                alt="Вправо"
                className={'pagination__img'}
                onClick={() => onButtonPage(currentPage + 1)}
            />
        </div>
    );
};

export default Pagination;
