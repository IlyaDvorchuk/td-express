import React, {useEffect, useRef, useState} from 'react';
import './search.scss'
import {useLocation, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {fetchSearch} from "../../store/reducers/search/SearchCreator";
import {searchSlice} from "../../store/reducers/search/SearchSlice";

const Search = ({mobile = false}: {mobile?: boolean}) => {
    const dispatch = useAppDispatch()
    const navigation = useNavigate()
    const location = useLocation();
    const {query} = useAppSelector(state => state.searchReducer)
    const {searchSetQuery} = searchSlice.actions
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const onChangeSearch = (value: string) => {
        if (location.pathname !== "/search") {
            navigation("/search");
        } else if (!value) navigation(-1)
        dispatch(searchSetQuery(value))
    }

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onChangeSearch(query);
        }
    };

    useEffect(() => {
        const delay = 500; // Задержка в миллисекундах

        // Удаляем предыдущий таймаут, если он есть
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        // Создаем новый таймаут для задержки перед отправкой запроса
        const newTimeoutId = setTimeout(() => {
            if (query) {
                dispatch(fetchSearch(query, 1, 20));
            }
        }, delay);

        // Устанавливаем id нового таймаута в состояние
        setTimeoutId(newTimeoutId);
    }, [dispatch, query]);

    useEffect(() => {
        if (inputRef.current && mobile && query) {
            inputRef.current.focus(); // Устанавливаем фокус на инпуте
        }
    }, []);

    return (
        <div className={`search ${mobile && 'search_mobile'}`}>
            <button className={'search-button'} onClick={() => onChangeSearch(query)}>
                <img src="/images/svg/search.svg" alt={'Найти товар'}/>
            </button>
            <input
                className={'search-input'}
                ref={inputRef}
                onChange={(e) => onChangeSearch(e.target.value)} value={query}
                onKeyDown={handleKeyDown}
            />

        </div>
    );
};

export default Search;
