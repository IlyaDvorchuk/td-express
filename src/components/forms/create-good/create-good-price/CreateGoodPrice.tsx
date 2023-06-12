import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import './create-good-price.scss';

const CreateGoodPrice = () => {
  const { register, watch } = useFormContext();

  const price = watch('price');
  const priceDiscount = watch('priceDiscount');
  const quantityInStock = watch('quantityInStock');

  useEffect(() => {
    // Действия, которые необходимо выполнить при изменении значений полей
  }, [price, priceDiscount, quantityInStock]);

  return (
    <>
      <h3 className='subtitle'>Цена и наличие товара</h3>
      <div className='good-price'>
        <div className='description__block'>
          <label className='label' htmlFor='price'>
            Цена
          </label>
          <input id='price' className='modalInput description__input good-price__input' {...register('price')} />
        </div>
        <div className='description__block'>
          <label className='label' htmlFor='priceDiscount'>
            Цена до скидки
          </label>
          <input id='priceDiscount' className='modalInput description__input good-price__input' {...register('priceDiscount')} />
        </div>
        <div className='description__block'>
          <label className='label' htmlFor='quantityInStock'>
            Количество на складе (единиц в наличии)
          </label>
          <input id='quantityInStock' className='modalInput description__input good-price__input' {...register('quantityInStock')} />
        </div>
      </div>
    </>
  );
};

export default CreateGoodPrice;
