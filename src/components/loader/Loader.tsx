import React from 'react';
import './loader.scss'

const Loader = () => {
    return (
        <div className={'loader-wrapper'}>
            <div className={'loader-wrapper__content'}>
                <div className="spinner-container">
                    <div className="spinner"></div>
                </div>
                <div className={'spinner-text'}>
                    Сохраняем ваш товар...
                </div>
            </div>

        </div>
    );
};

export default Loader;
