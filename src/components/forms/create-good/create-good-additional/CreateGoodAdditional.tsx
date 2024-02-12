import { useFormContext } from 'react-hook-form';

interface IProps {
    type: 'clothes'| "wallets" | "bags" | 'watch'
}

const CreateGoodAdditional = ({type}: IProps) => {
    const { register } = useFormContext();

    // const material = watch('material');
    // const recommendations = watch('recommendations');

    // useEffect(() => {
    //     // Действия, которые необходимо выполнить при изменении значений полей
    // }, [material, recommendations]);

    // const onChecked = () => {
    //     setIsNotChecked(!isNotChecked)
    // }

    return (
        <div className="description">
            <h3 className="subtitle">Дополнительная информация</h3>
            {
                type === "clothes" && <>
                    <div className="description__block">
                        <label className="label" htmlFor="material">
                            Материал, состав ткани
                        </label>
                        <input
                            id="material"
                            className="modalInput description__input"
                            {...register('material')}
                        />
                    </div>
                    <div className="description__block">
                        <label className="label" htmlFor="recommendations">
                            Рекомендации
                        </label>
                        <input
                            id="recommendations"
                            className="modalInput description__input"
                            {...register('recommendations')}
                        />
                    </div>
                </>
            }
            {(type === 'wallets' || type === 'bags') && <>
                <div className="description__block">
                    <label className="label" htmlFor="brand">
                        Бренд
                    </label>
                    <input
                        id="brand"
                        className="modalInput description__input"
                        {...register('brand')}
                    />
                    {/*<div className={'brand'}>*/}
                    {/*    <Checkbox sizes={20} isChecked={isNotChecked} onChange={onChecked}/>*/}
                    {/*    <p>Отсутствует бренд</p>*/}
                    {/*</div>*/}
                </div>
                <div className="description__block">
                    <label className="label" htmlFor="upperMaterial">
                        Материал верха
                    </label>
                    <input
                        id="upperMaterial"
                        className="modalInput description__input"
                        {...register('upperMaterial')}
                    />
                </div>
            </>}
            {type === 'bags' &&
                <div className="description__block">
                    <label className="label" htmlFor="liningMaterial">
                        Материал подкладки
                    </label>
                    <input
                        id="liningMaterial"
                        className="modalInput description__input"
                        {...register('liningMaterial')}
                    />
                </div>
            }
            {(type === 'wallets' || type === 'bags') && <>
                <div className="description__block">
                    <label className="label" htmlFor="accessoriesColor">
                        Цвет фурнитуры
                    </label>
                    <input
                        id="accessoriesColor"
                        className="modalInput description__input"
                        {...register('accessoriesColor')}
                    />
                </div>
                <div className="description__block">
                    <label className="label" htmlFor="claspType">
                        Вид застежки
                    </label>
                    <input
                        id="claspType"
                        className="modalInput description__input"
                        {...register('claspType')}
                    />
                </div>
                <div className="description__block">
                    <label className="label" htmlFor="numberOfBranches">
                        Количество отделений
                    </label>
                    <input
                        id="numberOfBranches"
                        className="modalInput description__input"
                        {...register('numberOfBranches')}
                    />
                </div>
            </>}
            {type === 'bags' &&
                <div className="description__block">
                    <label className="label" htmlFor="pockets">
                        Карманы
                    </label>
                    <input
                        id="pockets"
                        className="modalInput description__input"
                        {...register('pockets')}
                    />
                </div>
            }
            {(type === 'wallets' || type === 'bags') && <>
                <div className="description__block">
                    <label className="label" htmlFor="decorativeElements">
                        Декоративные элементы
                    </label>
                    <input
                        id="decorativeElements"
                        className="modalInput description__input"
                        {...register('decorativeElements')}
                    />
                </div>
                <div className="description__block">
                    <label className="label" htmlFor="countryOfOrigin">
                        Страна производства
                    </label>
                    <input
                        id="countryOfOrigin"
                        className="modalInput description__input"
                        {...register('countryOfOrigin')}
                    />
                </div>
            </>}
        </div>
    );
};

export default CreateGoodAdditional;
