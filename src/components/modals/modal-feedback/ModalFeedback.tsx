import React, {useState} from 'react';
import './modal-feedback.scss'
import Checkbox from "../../checkbox/Checkbox";
import {FEEDBACK} from "../../../constants";
import { Rating } from 'react-simple-star-rating'
import {IFeedback} from "../../../models/IFeedback";
import {UserService} from "../../../services/UserService";
import {useAppDispatch} from "../../../hooks/redux";
import {userSlice} from "../../../store/reducers/user/UserSlice";

const ModalFeedback = () => {
    const dispatch = useAppDispatch();
    const {setIsFeedbackModal} = userSlice.actions
    const [rating, setRating] = useState(0)
    const [feedback, setFeedback] = useState<string[]>([])
    const [textValue, setTextValue] = useState('');

    // Catch Rating value
    const handleRating = (rate: number) => {
        setRating(rate)

        // other logic
    }

    const changeFeedback = (text: string) => {
        if (!feedback.includes(text)) {
            const newFeedback = [...feedback, text]
            setFeedback(newFeedback)
        } else {
            const newFeedback = feedback.filter(item => item !== text)
            setFeedback(newFeedback)
        }
    };

    const onSubmit = async () => {
        const review = {
            rate: rating,
            text: textValue,
            cause: feedback
        } as IFeedback

        await UserService.createFeedback(review)
        localStorage.setItem('isFeedback', 'isFeedback')
    }

    const onClose = async () => {
        dispatch(setIsFeedbackModal(false))

        const review = {
            isRefusal: true,
        } as IFeedback

        await UserService.createFeedback(review)
        localStorage.setItem('isFeedback', 'isFeedback')

    }

    return (
        <div className={'feedback'}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className={'feedback__cancel'} onClick={onClose}>
                <path fillRule="evenodd" clipRule="evenodd" d="M0.21967 12.2197C-0.0732233 12.5126 -0.0732233 12.9874 0.21967 13.2803C0.512563 13.5732 0.987437 13.5732 1.28033 13.2803L6.75 7.81066L12.2197 13.2803C12.5126 13.5732 12.9874 13.5732 13.2803 13.2803C13.5732 12.9874 13.5732 12.5126 13.2803 12.2197L7.81066 6.75L13.2803 1.28033C13.5732 0.987437 13.5732 0.512563 13.2803 0.21967C12.9874 -0.0732234 12.5126 -0.0732231 12.2197 0.21967L6.75 5.68934L1.28033 0.21967C0.987437 -0.0732228 0.512563 -0.0732228 0.21967 0.21967C-0.0732233 0.512564 -0.0732233 0.987437 0.21967 1.28033L5.68934 6.75L0.21967 12.2197Z" fill="#3A373D"/>
            </svg>

            <h2>
                Минутку! Оцените, пожалуйста, наш маркетплейс:
            </h2>
            <div className={'feedback__rate'}>
                <Rating
                    onClick={handleRating}
                    allowFraction={true}
                    transition={true}
                    fillIcon={<svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.5215 2.31069L22.404 7.9886C22.797 8.77899 23.8452 9.53712 24.7296 9.6823L29.954 10.5372C33.295 11.0856 34.0811 13.4729 31.6736 15.828L27.612 19.8283C26.9242 20.5058 26.5475 21.8124 26.7604 22.748L27.9232 27.7C28.8403 31.6197 26.7276 33.136 23.2065 31.0874L18.3096 28.2323C17.4252 27.7161 15.9676 27.7161 15.0669 28.2323L10.17 31.0874C6.66522 33.136 4.53614 31.6036 5.45328 27.7L6.61608 22.748C6.82899 21.8124 6.45231 20.5058 5.76445 19.8283L1.70284 15.828C-0.688275 13.4729 0.0814673 11.0856 3.42247 10.5372L8.64689 9.6823C9.5149 9.53712 10.5631 8.77899 10.9561 7.9886L13.8386 2.31069C15.4108 -0.770228 17.9657 -0.770228 19.5215 2.31069Z" fill="url(#paint0_linear_3312_26571)"/>
                        <defs>
                            <linearGradient id="paint0_linear_3312_26571" x1="16.6918" y1="0" x2="16.6918" y2="32" gradientUnits="userSpaceOnUse">
                                <stop stopColor="#643ABE"/>
                                <stop offset="1" stopColor="#AE52DA"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    }
                    emptyIcon={<svg width="35" height="34" viewBox="0 0 35 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.1387 3.31069L23.0212 8.9886C23.4142 9.77899 24.4624 10.5371 25.3468 10.6823L30.5712 11.5372C33.9122 12.0856 34.6983 14.4729 32.2908 16.828L28.2292 20.8283C27.5414 21.5058 27.1647 22.8124 27.3776 23.748L28.5404 28.7C29.4575 32.6197 27.3448 34.136 23.8237 32.0874L18.9268 29.2323C18.0424 28.7161 16.5848 28.7161 15.6841 29.2323L10.7872 32.0874C7.2824 34.136 5.15333 32.6036 6.07047 28.7L7.23327 23.748C7.44618 22.8124 7.0695 21.5058 6.38164 20.8283L2.32003 16.828C-0.0710875 14.4729 0.698655 12.0856 4.03966 11.5372L9.26408 10.6823C10.1321 10.5371 11.1802 9.77899 11.5733 8.9886L14.4557 3.31069C16.028 0.229772 18.5829 0.229772 20.1387 3.31069Z" stroke="#8554EA" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    }
                    /* Available Props */
                />
            </div>

            <div>
                {FEEDBACK.map((item, index) => (
                    <p key={index}>
                        <Checkbox sizes={20} isChecked={feedback.includes(item)} onChange={() => changeFeedback(item)}/>
                        <span>{item}</span>
                    </p>
                ))}

            </div>
            <textarea
                placeholder={'Напишите свой вариант...'}
                className={'feedback__textarea'}
                disabled={!feedback.includes('Свой вариант')}
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
            ></textarea>
            <button className={'button button_dark feedback__button'} onClick={onSubmit}>
                ОСТАВИТЬ ОТЗЫВ
            </button>
        </div>
    );
};

export default ModalFeedback;
