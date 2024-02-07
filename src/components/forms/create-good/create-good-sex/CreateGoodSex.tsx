import React from "react";
import {SEX} from "../../../../constants";
import Checkbox from "../../../checkbox/Checkbox";

interface IProps {
    sex: string,
    setSex: (selectedOptions: string) => void;
}

const CreateGoodSex = ({ sex, setSex }: IProps) => {

    const changeSeasons = (item: string) => {
        if (sex === item) {
            setSex('')
        } else {
            setSex(item)
        }
    };

    // useEffect(() => {
    //     if (cardQuantity) {
    //         setSelectedOptions(cardQuantity.filter(type => type).map(type => type.size))
    //     }
    // }, [cardQuantity])

    return (
        <div>
            <h3 className={'subtitle'}>
                Пол
            </h3>
            <div className={'seasons-inputs'}>
                {SEX.map((item, index) => (
                    <div className={'seasons-input'} key={index}>
                        <Checkbox
                            sizes={20}
                            isChecked={sex === item}
                            onChange={() => changeSeasons(item)}
                        />
                        <p>{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CreateGoodSex;
