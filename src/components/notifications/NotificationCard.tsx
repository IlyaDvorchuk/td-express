import React, {useState} from 'react';
import './notification-card.scss'
import {INotification} from "../../models/INotification";

interface IProps {
    notification: INotification,
    setRemoveNotifications: React.Dispatch<React.SetStateAction<string[]>>
}

const NotificationCard = ({ notification, setRemoveNotifications }: IProps) => {
    const [isVisibleRemove, setIsVisibleRemove] = useState(false)
    const [isDelete, setIsDelete] = useState(false)

    // Преобразование строки с датой и временем в объект Date
    const createdAtDate = new Date(notification.createdAt);

    // Функция для получения аббревиатуры месяца
    const getMonthAbbreviation = (monthIndex: number) => {
        const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
        return months[monthIndex];
    };

    // Форматирование даты и времени в желаемый формат
    const formattedDate = `${createdAtDate.getDate()} ${getMonthAbbreviation(
        createdAtDate.getMonth()
    )} в ${String(createdAtDate.getHours()).padStart(2, '0')}:${String(
        createdAtDate.getMinutes()
    ).padStart(2, '0')}`;

    const removeNotification = (id: string) => {
        setRemoveNotifications(prev => [...prev, id])
        setIsDelete(true)
    }

    const canselNotification = (id: string) => {
        setRemoveNotifications(prev => prev.filter(notification => notification !== id));
        setIsDelete(false)
    }

    return (
        <>
            {!isDelete ? <div className={'notification'}>
                <div className={'notification__remove'}>
                    <img src="/images/svg/arrow-down2.svg" alt="Скрыть"
                         onClick={() => setIsVisibleRemove(!isVisibleRemove)}/>
                    {isVisibleRemove && <p onClick={() => removeNotification(notification._id)}>
                        Скрыть
                    </p>}
                </div>
                <div className={'notification__message'}>{notification.message}</div>
                <p className={'notification__date'}>{formattedDate}</p>
            </div>
            : <div className={'delete-notification'}>
                    <span>Уведомление скрыто. </span>
                    <span
                        className={'delete-notification__cancel'}
                        onClick={() => canselNotification(notification._id)}>
                        Отменить
                    </span>
                </div>
            }
        </>

    );
};

export default NotificationCard;