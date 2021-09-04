import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { BiSave } from 'react-icons/bi';
import { Input } from '../../../../components/form/input';
import { Select } from '../../../../components/form/select';
import { PetData, PetFormData } from '../../../../types/pet';
import { species, genders, sizes } from './data';
import { Checkbox } from '../../../../components/form/checkbox';
import { File } from '../../../../components/form/file';
import { petServices } from '../../../../services/pet';

const formSchema: yup.SchemaOf<PetFormData> = yup.object().shape({
    name: yup.string().required('Preencha o campo'),
    species: yup.number(),
    breed: yup.string().required('Preencha o campo'),
    gender: yup.number(),
    age: yup
        .number()
        .required('Preencha o campo')
        .min(1, 'Valor deve ser maior ou igual a 1'),
    size: yup.number(),
    castrated: yup.boolean(),
    adopted: yup.boolean(),
    images: yup.array().of(yup.string()),
});

interface PetsFormProps {
    setPets: React.Dispatch<React.SetStateAction<PetData[]>>;
}

export const PetsForm = ({ setPets }: PetsFormProps): JSX.Element => {
    const [images, setImages] = useState<File[]>([]);

    const { _createOne, _getAll, _uploadImage } = petServices();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PetFormData>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: '',
            species: 0,
            breed: '',
            gender: 0,
            age: 0,
            size: 0,
            castrated: false,
            adopted: false,
            images: [],
        },
    });

    const handleForm = useCallback<SubmitHandler<PetFormData>>(
        async (values) => {
            try {
                const imageIds = await _uploadImage(images);

                const obj = { ...values };
                obj.images = imageIds;

                await _createOne(obj);

                const data = await _getAll();

                setPets(data);

                setImages([]);

                reset();
            } catch (err) {
                console.log(err);
            }
        },
        [_createOne, _getAll, _uploadImage, images, reset, setPets],
    );

    const handleChangeImages = useCallback<
        React.ChangeEventHandler<HTMLInputElement>
    >((e) => {
        setImages(Array.from(e.target.files));
    }, []);

    return (
        <form className="form" onSubmit={handleSubmit(handleForm)}>
            <Controller
                render={({ field }) => (
                    <Input
                        title="Nome"
                        placeholder="Nome"
                        type="text"
                        autoComplete="name"
                        error={errors.name}
                        {...field}
                    />
                )}
                control={control}
                name="name"
            />
            <Controller
                render={({ field }) => (
                    <Select
                        title="Espécie"
                        placeholder="Espécie"
                        options={species}
                        error={errors.species}
                        {...field}
                    />
                )}
                control={control}
                name="species"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Raça"
                        placeholder="Raça"
                        type="text"
                        autoComplete="name"
                        error={errors.breed}
                        {...field}
                    />
                )}
                control={control}
                name="breed"
            />
            <Controller
                render={({ field }) => (
                    <Select
                        title="Gênero"
                        placeholder="Gênero"
                        options={genders}
                        error={errors.gender}
                        {...field}
                    />
                )}
                control={control}
                name="gender"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Idade (em meses)"
                        placeholder="Idade"
                        type="number"
                        autoComplete="text"
                        error={errors.age}
                        {...field}
                    />
                )}
                control={control}
                name="age"
            />
            <Controller
                render={({ field }) => (
                    <Select
                        title="Porte"
                        placeholder="Porte"
                        options={sizes}
                        error={errors.size}
                        {...field}
                    />
                )}
                control={control}
                name="size"
            />
            <Controller
                render={({ field }) => (
                    <Checkbox
                        title="Castrado"
                        placeholder="Castrado"
                        error={errors.castrated}
                        {...field}
                        value={String(field.value)}
                    />
                )}
                control={control}
                name="castrated"
            />
            <Controller
                render={({ field }) => (
                    <Checkbox
                        title="Adotado"
                        placeholder="Adotado"
                        error={errors.adopted}
                        {...field}
                        value={String(field.value)}
                    />
                )}
                control={control}
                name="adopted"
            />
            <Controller
                render={({ fieldState }) => (
                    <File
                        title="Imagens"
                        placeholder="Imagens"
                        type="file"
                        accept="image/*"
                        multiple
                        error={fieldState.error}
                        onChange={handleChangeImages}
                    />
                )}
                control={control}
                name="images"
            />
            <div className="image-preview-wrapper">
                {images.map((image, index) => (
                    <img
                        key={`image-${index + 1}`}
                        className="image-preview"
                        src={URL.createObjectURL(image)}
                        alt={`Imagem ${index + 1}`}
                    />
                ))}
            </div>
            <button type="submit" disabled={isSubmitting}>
                <BiSave size="16px" />
                <span>Confirmar</span>
            </button>
        </form>
    );
};
