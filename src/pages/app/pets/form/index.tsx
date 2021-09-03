import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback } from 'react';
import { Input } from '../../../../components/form/input';
import { Select } from '../../../../components/form/select';
import { PetFormData } from '../../../../types/pet';
import { species, genders } from './data';
import { Checkbox } from '../../../../components/form/checkbox';

const formSchema: yup.SchemaOf<PetFormData> = yup.object().shape({
    name: yup.string().required('Preencha o campo'),
    species: yup.number(),
    breed: yup.string().required('Preencha o campo'),
    gender: yup.number(),
    age: yup
        .number()
        .required('Preencha o campo')
        .min(1, 'Valor deve ser maior ou igual a 1'),
    adopted: yup.boolean(),
    images: yup.array().of(yup.string()),
});

export const PetsForm = (): JSX.Element => {
    const handleForm = useCallback<SubmitHandler<PetFormData>>((values) => {
        try {
            console.log(values);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PetFormData>({
        resolver: yupResolver(formSchema),
        defaultValues: {
            name: '',
            species: 0,
            breed: '',
            gender: 0,
            age: 0,
            adopted: false,
            images: [],
        },
    });

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
                render={({ field, fieldState }) => (
                    <Input
                        title="Imagens"
                        placeholder="Imagens"
                        type="file"
                        accept="image/*"
                        error={fieldState.error}
                        {...field}
                    />
                )}
                control={control}
                name="images"
            />
            <button type="submit">Confirmar</button>
        </form>
    );
};
