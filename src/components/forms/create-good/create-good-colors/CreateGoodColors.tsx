import React, {useState} from 'react';
import './create-good-colors.scss'

const CreateGoodColors = () => {
    const [isOpenColors, setIsOpenColors] = useState(false)

    return (
        <div className={'good-colors'}>
            <h3 className={'subtitle subtitle_add'}>
                Цвет
            </h3>
            <p className="add-description dimensions__add">
                Выберите все цвета товара в таблице
            </p>
            <div className={'good-colors__select'}>
                <button className={'button button_light good-colors__button'} onClick={() => setIsOpenColors(!isOpenColors)}>
                    Открыть таблицу цветов
                </button>
                {isOpenColors && <div className={'good-colors__modal'}>
                    <div>
                        <h4>Выбрать цвет</h4>
                    </div>
                    <div>

                    </div>
                    <div>
                        <button className={'button button_light'}>Добавить цвета</button>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default CreateGoodColors;
