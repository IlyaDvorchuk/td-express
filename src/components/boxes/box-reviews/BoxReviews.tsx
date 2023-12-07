import React, {useState} from 'react';
import './box-reviews.scss'
import {useAppSelector} from "../../../hooks/redux";
import {UserService} from "../../../services/UserService";

interface IProps {
    productId: string
}

const BoxReviews = ({productId}: IProps) => {
    const {user} = useAppSelector(state => state.userReducer)
    const [isFocused, setIsFocused] = useState(false);
    const [textValue, setTextValue] = useState('Напишите свой вопрос...');

    const handleFocus = () => {
        setIsFocused(true);
        if (textValue === 'Напишите свой вопрос...') {
            setTextValue('');

        }
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (textValue === '') {
            setTextValue('Напишите свой вопрос...');
        }
    };

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setTextValue(e.target.value);
    };

    const onCreateComment: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        if (textValue.length < 4) return
        const response = await UserService.createComment({
            text: textValue,
            productId
        })
        setTextValue('')
        console.log('response', response)
    }

    return (
        <div className={`reviews ${isFocused ? 'focused' : ''}`}>
            {user?._id && <div className={'reviews__form'}>
        <textarea
            className={'reviews__textarea'}
            value={textValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
        />
                <button
                    onClick={onCreateComment}
                    className={`button ${(textValue.length > 4 && textValue !== 'Напишите свой вопрос...') ? 'button_light' : 'button_not-active'} reviews__button`}>
                    <span>
                        отправить
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M3.13667 9.00002H7.96336M6.77456 2.05495L14.4258 5.88055C17.8581 7.59671 17.8581 10.4033 14.4258 12.1195L6.77456 15.9451C1.62609 18.5193 -0.474412 16.4099 2.09982 11.2704L2.87746 9.72403C3.0741 9.33074 3.0741 8.67824 2.87746 8.28496L2.09982 6.72969C-0.474412 1.59016 1.63503 -0.519285 6.77456 2.05495Z"
                            stroke={(textValue.length > 4 && textValue !== 'Напишите свой вопрос...') ? '#643ABE' : `#979798`} strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>}
        </div>
    );
};

export default BoxReviews;
