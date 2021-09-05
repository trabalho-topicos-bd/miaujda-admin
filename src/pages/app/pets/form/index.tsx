import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useMemo, useState } from 'react';
import { BiSave } from 'react-icons/bi';
import Lottie from 'react-lottie';
import { Input } from '../../../../components/form/input';
import { Select } from '../../../../components/form/select';
import { PetData, PetFormData } from '../../../../types/pet';
import { species, genders, sizes } from '../../../../utils/constants';
import { Checkbox } from '../../../../components/form/checkbox';
import { File } from '../../../../components/form/file';
import { petServices } from '../../../../services/pet';
import {
    getApiUrl,
    getLottieOptions,
    showToast,
} from '../../../../utils/helpers';
import submittingLottie from '../../../../assets/lottie/submitting.json';

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
    editing: PetData | boolean;
    handleFinishAction(): Promise<void>;
}

export const PetsForm = ({
    editing,
    handleFinishAction,
}: PetsFormProps): JSX.Element => {
    const [images, setImages] = useState<File[]>([]);

    const { _createOne, _updateOne, _uploadImage } = petServices();

    const defaultValues = useMemo(
        () => {
            if (typeof editing === 'object') return editing
            return {
                name: '',
                species: 0,
                breed: '',
                gender: 0,
                age: 0,
                size: 0,
                castrated: false,
                adopted: false,
                images: [],
            }
        },
        [editing],
    );

    const {
        control,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<PetFormData>({
        resolver: yupResolver(formSchema),
        defaultValues,
    });

    const imagesWatch = watch('images');

    const handleForm = useCallback<SubmitHandler<PetFormData>>(
        async (values) => {
            try {
                const imageIds = await _uploadImage(images);

                const obj = { ...values };
                obj.images = [...obj.images, ...imageIds] as string[];

                const isEditing = typeof editing === 'object';

                if (isEditing) {
                    await _updateOne(typeof editing === 'object' && editing.id, obj);
                } else await _createOne(obj);

                showToast(
                    `Registro ${
                        isEditing ? 'atualizado' : 'criado'
                    } com sucesso`,
                );

                await handleFinishAction();

                setImages([]);

                reset();
            } catch (err) {
                showToast(err, 'error');
            }
        },
        [
            _createOne,
            _updateOne,
            _uploadImage,
            editing,
            handleFinishAction,
            images,
            reset,
        ],
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
                        checked={field.value}
                        onChange={field.onChange}
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
                        checked={field.value}
                        onChange={field.onChange}
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
                {imagesWatch.map((image, index) => (
                    <img
                        key={`preloaded-image-${index + 1}`}
                        className="image-preview"
                        src={`${getApiUrl()}/public/img/${image}`}
                        alt={`Imagem ${index + 1}`}
                    />
                ))}
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
                {isSubmitting ? (
                    <Lottie
                        options={getLottieOptions(submittingLottie)}
                        height={32}
                        width={196}
                    />
                ) : (
                    <>
                        <BiSave size="16px" />
                        <span>Confirmar</span>
                    </>
                )}
            </button>
        </form>
    );
};
