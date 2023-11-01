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
    card: IProductCard | null,
    descriptionError: boolean
}

const CreateGoodDescription = React.memo(({description, setDescription, card, descriptionError}: IProps) => {
    const { register, formState: { errors } } = useFormContext();

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
                <label className={`label ${errors.name ? 'error' : ''}`} htmlFor="name">Название*</label>
                <input
                    id="name"
                    placeholder="Введите название товара"
                    className={`modalInput description__input ${errors.name ? 'error' : ''}`}
                    {...register('name', { required: 'Введите название товара' })}
                />
            </div>
            <div>
                <label className={`label ${descriptionError ? 'error' : ''}`} htmlFor="good-description">Описание*</label>
                <SimpleMdeReact
                    className={`mde ${descriptionError ? 'mde-error' : ''}`}
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
