import React, {useEffect, useState} from 'react';
import './admin-good-card.scss'
import {IProductCardRes} from "../../../../models/IProductCard";
import {API_URL} from "../../../../http";
import {useNavigate} from "react-router-dom";
import {AdminService} from "../../../../services/AdminService";

interface IProps {
    good: IProductCardRes,
    onDelete: (id: string) => void
}

const AdminGoodCard = ({ good, onDelete }: IProps) => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [formattedDate, setFormattedDate] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [rejectText, setRejectText] = useState('')

    const fetchNameShelter = async () => {
        try {
            const response = await AdminService.fetchShelterName(good.shelterId);
            setName(response.data);
        } catch (error) {
            console.log('Ошибка при получении карточек товаров:', error);
        }
    };

    useEffect(() => {
        fetchNameShelter();

        // Преобразование даты и времени в нужный формат
        const createdAtDate = new Date(good.updatedAt);
        const hours = String(createdAtDate.getUTCHours()).padStart(2, '0');
        const minutes = String(createdAtDate.getUTCMinutes()).padStart(2, '0');
        const day = String(createdAtDate.getUTCDate()).padStart(2, '0');
        const month = String(createdAtDate.getUTCMonth() + 1).padStart(2, '0');
        const year = createdAtDate.getUTCFullYear();

        setFormattedDate(`${hours}:${minutes} ${day}.${month}.${year}`);
    }, []);

    const onClickCard = () => {
        navigate(`/card/${good._id}`, {
            state: {
                ...good
            }
        });
    };

    const onAgreement = async (id: string, shelterId: string) => {
        const response = await AdminService.agreementGood(id)
        const responseNotification = await AdminService.createNotification(
            shelterId,
            `Ваш товар <b>“${good.information.name}”</b> успешно прошел проверку и выпущен в продажу`
        )
        if (response.data && responseNotification.data) {
            onDelete(id)
        }
    }

    const onReject = async () => {
        setIsOpenModal(true)
        if (!rejectText) return

        const responseNotification = await AdminService.createNotification(
            good._id,
            `Ваш товар <b>“${good.information.name}”</b> не прошёл проверку администрации. Причина ${rejectText}`
        )
        if (responseNotification.data) {
            // onDelete(good._id)
        }
    }

    return (
        <div className={'admin-good-card'}>
            <div className={'admin-good-card__image'} onClick={onClickCard}>
                <img src={`${API_URL}${good.mainPhoto}`} alt={good.information.name} />
            </div>
            <div>
                <p className={'admin-good-card__shelter'}>Продавец: {name}</p>
                <p className={'admin-good-card__updated'}>Дата публикации: {formattedDate}</p>
                <div className={'admin-shelter-card__buttons'}>
                    <img src="/images/svg/admin/agreement.svg" alt="Принять" onClick={() => onAgreement(good._id, good.shelterId)}/>
                    <img src="/images/svg/admin/refusal.svg" alt="Отклонить" onClick={onReject}/>
                </div>
            </div>
        </div>
    );
};

export default AdminGoodCard;