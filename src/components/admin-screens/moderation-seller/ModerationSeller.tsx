import React, {useMemo, useState} from 'react';
import './moderation-seller.scss'
import Title from "../title/Title";
import {AdminService} from "../../../services/AdminService";
import {IShelterRes} from "../../../models/response/IShelter";
import AdminShelterCard from "../admin-cards/admin-shelter-card/AdminShelterCard";

const ModerationSeller = () => {
    const [
        notVerifiedShelters,
        setNotVerifiedShelters
    ] = useState<IShelterRes[]>([])

    const fetchNotVerifiedShelters = async () => {
        try {
            const response = await AdminService.fetchNotVerifiedShelters();
            console.log('response', response)

            setNotVerifiedShelters(response.data)
        } catch (error) {
            console.log('Ошибка при получении карточек товаров:', error);
        }
    }

    useMemo(() => {
        fetchNotVerifiedShelters()
    }, [])

    const handleDeleteShelter = (shelterId: string) => {
        // Filter out the shelter with the specified ID from the notVerifiedShelters array
        setNotVerifiedShelters((prevShelters) =>
            prevShelters.filter((shelter) => shelter._id !== shelterId)
        );
    };

    return (
        <div className={'moderation-shelter'}>
            <Title>
                Модерация регистрируемых продавцов
            </Title>
            {notVerifiedShelters.map(shelter => (
                <AdminShelterCard shelter={shelter} key={shelter._id} onDelete={handleDeleteShelter}/>
                ))}
        </div>
    );
};

export default ModerationSeller;