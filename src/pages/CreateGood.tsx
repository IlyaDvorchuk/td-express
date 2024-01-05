import React from 'react';
import FormCreateGood from "../components/forms/create-good/FormCreateGood";
import useFetchCard from "../hooks/fetch-card";
import {useAppSelector} from "../hooks/redux";
import Loader from "../components/loader/Loader";

const CreateGood = () => {
    const card = useFetchCard();
    const {isLoadingGood} = useAppSelector(state => state.shelterReducer)

    return (
        <>
            <div style={{width: '100%'}}>
                <FormCreateGood card={card}/>
                {isLoadingGood && <Loader/>}
            </div>

        </>

    );
};

export default CreateGood;
