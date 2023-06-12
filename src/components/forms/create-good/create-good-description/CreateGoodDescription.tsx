import "easymde/dist/easymde.min.css";
import React, { useCallback, useMemo } from 'react';
import { useFormContext } from "react-hook-form";
import { SimpleMdeReact } from "react-simplemde-editor";
import '../../../../styles/elements/inputs.scss';
import './create-good-description.scss';

interface IProps {
  description: string;
  setDescription: (description: string) => void;
}

const CreateGoodDescription = React.memo(({ description, setDescription }: IProps) => {
  const { register } = useFormContext();

  // const name = watch('name');
  // const description = watch('description');

  const mdeReactOptions = useMemo(() => {
    return {
      autosave: {
        enabled: true,
        uniqueId: "create-good",
        delay: 1000,
      },
      lineNumbers: false,
      maxHeight: '281px',
      spellChecker: false,
      status: false,
    };
  }, []);

  // useEffect(() => {
  //     setDescriptionGood(description || '');
  // }, [setDescriptionGood, description]);

  const handleChangeDescription = useCallback((value: string) => {
    setDescription(value);
  }, [setDescription]);

  return (
    <div className='description'>
      <div className='description__block'>
        <label className='label' htmlFor='name'>Название</label>
        <input id='name' placeholder='Введите название товара' className='modalInput description__input' {...register('name')} />
      </div>
      <div>
        <label className='label' htmlFor='good-description'>Описание</label>
        <SimpleMdeReact
          className='mde'
          placeholder='Добавьте описание вашему товару'
          options={mdeReactOptions}
          value={description}
          onChange={handleChangeDescription}
        />
      </div>
    </div>
  );
});

export default CreateGoodDescription;
