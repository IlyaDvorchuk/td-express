import React, {useEffect, useRef, useState} from 'react';
import './search.scss'
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchSearch} from "../../store/reducers/search/SearchCreator";
import {searchSlice} from "../../store/reducers/search/SearchSlice";
import {IFilterSearchParams} from "../../models/IFilter";

const Search = ({mobile = false}: {mobile?: boolean}) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigate()
    const location = useLocation();
    const {query} = useAppSelector(state => state.searchReducer)
    const {searchSetQuery} = searchSlice.actions
    const {
        currentMinPrice, currentMaxPrice, isChange, colors, isReset
    } = useAppSelector(state => state.filterReducer)
    // const [searchQuery, setSearchQuery]= useState('')
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const {user, isUserModal} = useAppSelector(state => state.userReducer)


    useEffect(() => {
        if (inputRef.current && mobile && query) {
            inputRef.current.focus(); // Устанавливаем фокус на инпуте
        }
    }, []);


    useEffect(() => {
        if (isChange) {
            const delay = 500; // Задержка в миллисекундах

            // Удаляем предыдущий таймаут, если он есть
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            // Создаем новый таймаут для задержки перед отправкой запроса
            const newTimeoutId = setTimeout(() => {
                if (query && !isReset) {
                    const params = {
                        query,
                        page: 1,
                        limit: 100,
                        minPrice: currentMinPrice,
                        maxPrice: currentMaxPrice,
                        userId: user?._id
                    } as IFilterSearchParams
                    if (colors && colors.length > 0) {
                        params.colors = colors
                    }
                    dispatch(fetchSearch(params, true));
                }
            }, delay);

            // Устанавливаем id нового таймаута в состояние
            setTimeoutId(newTimeoutId);
        }
    }, [currentMinPrice, currentMaxPrice, colors]);

    useEffect(() => {
        const delay = 500; // Задержка в миллисекундах

        // Удаляем предыдущий таймаут, если он есть
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Создаем новый таймаут для задержки перед отправкой запроса
        const newTimeoutId = setTimeout(() => {
            if (query) {
                const params = {
                    query,
                    page: 1,
                    limit: 100,
                    minPrice: 0,
                    maxPrice: Infinity,
                    userId: user?._id
                } as IFilterSearchParams
                dispatch(fetchSearch(params));
            }
        }, delay);

        // Устанавливаем id нового таймаута в состояние
        setTimeoutId(newTimeoutId);
    }, [dispatch, query]);


    const onChangeSearch = (value: string) => {
        if (location.pathname !== "/search") {
            navigation("/search");
        } else if (!value) navigation(-1)
        // setSearchQuery(value)
        dispatch(searchSetQuery(value))
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onChangeSearch(query);
        }
    };

    return (
        <div className={`search ${mobile && 'search_mobile'}`}>
            <button className={'search-button'} onClick={() => onChangeSearch(query)}>
                <img src="/images/svg/search.svg" alt={'Найти товар'}/>
            </button>
            <input

                className={'search-input'}
                ref={inputRef}
                placeholder={'Я ищу...'}
                onChange={(e) => onChangeSearch(e.target.value)}
                value={query}
                onKeyDown={handleKeyDown}
                disabled={isUserModal}
            />

        </div>
    );
};

export default Search;
