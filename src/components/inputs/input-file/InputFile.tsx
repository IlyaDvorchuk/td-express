import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef} from 'react';
import '../../../styles/elements/inputs.scss'

interface IInputFile {
    image: File | null,
    setImage: Dispatch<SetStateAction<File | null>>,
    position: 'right' | 'bottom'
}

const InputFile = ({image, setImage, position}: IInputFile) => {
    const inputFileRef = useRef<HTMLInputElement>(null)

    const onSubmitFile = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const selectedFiles = files as FileList;
        setImage(selectedFiles?.[0])
        // if (e.target.files) {
        //     setImage(e.target.files[0])
        // }
        if (inputFileRef.current?.files) {
            // setImage(inputFileRef.current?.files?.[0].name)
        }
        // try {
        //     const formData = new FormData()
        //     if (e.target.files?.[0]) {
        //         const file = e.target.files[0]
        //         formData.append('image', file)
        //     }
        // } catch (e) {
        //
        // }
    }

    const onDeleteFile = () => {
        setImage(null)
    }

    useEffect(() => {
        console.log('position', position)
    }, [position])

    return (
        <div className={`input-file ${position}`}>
            <label className={image ? 'current' : ''} onClick={() => {
                if (inputFileRef.current) inputFileRef.current.click()
            }}>
                <img src={image ? '/images/svg/input-file-success.svg' : "/images/svg/input-file.svg"} alt="Прикрепите скан"/>
                <span>{image ? 'Загружено' : 'Загрузить'}</span>
            </label>
            <input
                type="file"
                id={'Scan'}
                onChange={onSubmitFile}
                ref={inputFileRef}
                value={''}
            />
            {
                image && (position === 'right') &&
                <div className={'name-image'}>
                                <span>
                                    {image.name}
                                </span>
                    <img src="/images/svg/close.svg" alt="Убрать фото" onClick={onDeleteFile}/>
                </div>
            }
            {
                image && (position === 'bottom') &&
                <>
                    <img className={'image-user'} src={URL.createObjectURL(image)} alt="Фото"/>
                    <div className={'name-image'}>
                    <span>
                        {image.name}
                    </span>
                        <img src="/images/svg/close.svg" alt="Убрать фото" onClick={onDeleteFile}/>
                    </div>
                </>
            }
        </div>
    );
};

export default InputFile;
