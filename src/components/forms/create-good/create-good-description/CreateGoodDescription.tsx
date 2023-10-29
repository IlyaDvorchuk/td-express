import React, {useCallback, useEffect, useMemo} from 'react';
import './create-good-description.scss'
import '../../../../styles/elements/inputs.scss'
import {SimpleMdeReact} from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useFormContext} from "react-hook-form";
import {IProductCard} from "../../../../models/IProductCard";


interface IProps {
    description: string
    setDescription: (description: string) => void;
    card: IProductCard | null
}

const CreateGoodDescription = React.memo(({description, setDescription, card}: IProps) => {
    const { register } = useFormContext();

    // const name = watch('name');
    // const description = watch('description');


    const mdeReactOptions = useMemo(() => {
        return {
            autosave: {
                enabled: true,
                uniqueId: "create-good",
                delay: 1000,
            },
            lineNumbers: false,
            maxHeight: '281px',
            spellChecker: false,
            status: false,
        }
    }, []) ;

    useEffect(() => {
        console.log('card', card)
    }, [card])

    useEffect(() => {
        setDescription(card ? card.information.description : '')
    }, [card, setDescription]);

    const handleChangeDescription = useCallback((value: string) => {
        setDescription(value)
    }, [setDescription]);

    return (
        <div className="description">
            <div className="description__block">
                <label className="label" htmlFor="name">Название</label>
                <input
                    id="name"
                    placeholder="Введите название товара"
                    className="modalInput description__input"
                    {...register('name')}
                />
            </div>
            <div>
                <label className="label" htmlFor="good-description">Описание</label>
                <SimpleMdeReact
                    className="mde"
                    placeholder="Добавьте описание вашему товару"
                    options={mdeReactOptions}
                    defaultValue={card ? card.information.description : ''}
                    value={description}
                    onChange={handleChangeDescription}
                />
            </div>
        </div>
    );
});

export default CreateGoodDescription;
