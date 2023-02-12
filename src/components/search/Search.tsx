import React from 'react';
import './search.scss'

const Search = () => {
    return (
        <div className={'search'}>
            <input className={'search-input'}/>
            <button className={'search-button'}>
                <img src="/images/svg/search.svg"/>
            </button>
        </div>
    );
};

export default Search;