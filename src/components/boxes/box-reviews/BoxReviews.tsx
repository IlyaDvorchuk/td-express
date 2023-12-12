import React, {useEffect, useState} from 'react';
import './box-reviews.scss'
import {useAppSelector} from "../../../hooks/redux";
import {UserService} from "../../../services/UserService";
import {ICommentRes} from "../../../models/IComment";
import {formatDateOnRussian} from "../../../utils/formatDate";

interface IProps {
    productId: string
}

const BoxReviews = ({productId}: IProps) => {
    const {user} = useAppSelector(state => state.userReducer)
    const [isFocused, setIsFocused] = useState(false);
    const [textValue, setTextValue] = useState('Напишите свой вопрос...');
    const [comments, setComments] = useState<ICommentRes[]>([])

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await UserService.getCommentsByProduct(productId);
                console.log('response', response)
                setComments(response.data.reverse())
            } catch (error) {
                console.log('Ошибка при получении комментариев:', error);
            }
        };

        fetchComments();
    }, []);

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
        await UserService.createComment({
            text: textValue,
            productId,
            userName: user.firstName + ' ' + user.secondName
        })
        setTextValue('')
    }

    return (
        <div className={`reviews ${isFocused ? 'focused' : ''}`}>
            {!user?._id && <p className={'reviews__not-registration'}>Чтобы комментировать, необходимо зарегистрироваться.</p>}

            <div className={'reviews__form'}>
        <textarea
            className={'reviews__textarea'}
            value={textValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            disabled={!user?._id}
        />
                <button
                    onClick={onCreateComment}
                    className={
                    `button ${(textValue.length > 4 && textValue !== 'Напишите свой вопрос...' && user?._id) ? 'button_light' : 'button_not-active'
                    } reviews__button`}>
                    <span>
                        отправить
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path
                            d="M3.13667 9.00002H7.96336M6.77456 2.05495L14.4258 5.88055C17.8581 7.59671 17.8581 10.4033 14.4258 12.1195L6.77456 15.9451C1.62609 18.5193 -0.474412 16.4099 2.09982 11.2704L2.87746 9.72403C3.0741 9.33074 3.0741 8.67824 2.87746 8.28496L2.09982 6.72969C-0.474412 1.59016 1.63503 -0.519285 6.77456 2.05495Z"
                            stroke={(textValue.length > 4 && textValue !== 'Напишите свой вопрос...' && user?._id) ? '#643ABE' : `#979798`} strokeWidth="1.5"
                            strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            <div className={'reviews__wrapper'}>
                {comments.map(comment => (
                    <div key={comment._id} className={'comment'}>
                        <div
                            className={'user-icon big'}
                        >
                            <span>
                                {`${comment.userName?.split(' ')[0][0].toUpperCase()}`}
                            </span>
                            <span>
                            {`${comment.userName?.split(' ')[1][0].toUpperCase()}`}
                            </span>
                        </div>
                        <div className={'comment__inf'}>
                            <h4>{comment.userName}</h4>
                            <div className={'comment__rate'}>

                            </div>
                            <div className={'comment__date'}>
                                {formatDateOnRussian(comment.createdAt)}
                            </div>
                            <p className={'comment__text'}>
                                {comment.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoxReviews;
