/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BiSave } from 'react-icons/bi';
import Lottie from 'react-lottie';
import { Autocomplete } from '@material-ui/lab';
import { Input } from '../../../../components/form/input';
import { OptionData } from '../../../../components/form/select';
import { FeatureData, FeatureFormData } from '../../../../types/feature';
import { featureServices } from '../../../../services/feature';
import { getLottieOptions, showToast } from '../../../../utils/helpers';
import submittingLottie from '../../../../assets/lottie/submitting.json';
import { PetData } from '../../../../types/pet';
import { useToggle } from '../../../../hooks/useToggle';
import { petServices } from '../../../../services/pet';
import { useDebounce } from '../../../../hooks/useDebounce';

const formSchema: yup.SchemaOf<FeatureFormData> = yup.object().shape({
    id_pet: yup.number().required('Pet obrigatório').typeError('Pet inválido'),
    experience: yup
        .number()
        .min(1, 'Valor deve ser maior que 0')
        .max(4, 'Valor deve ser menor que 5'),
    cost: yup
        .number()
        .min(1, 'Valor deve ser maior que 1')
        .max(4, 'Valor deve ser menor que 5'),
    love: yup
        .number()
        .min(1, 'Valor deve ser maior que 1')
        .max(4, 'Valor deve ser menor que 5'),
    peace: yup
        .number()
        .min(1, 'Valor deve ser maior que 1')
        .max(4, 'Valor deve ser menor que 5'),
    intelligence: yup
        .number()
        .min(1, 'Valor deve ser maior que 1')
        .max(4, 'Valor deve ser menor que 5'),
    loyalty: yup
        .number()
        .min(1, 'Valor deve ser maior que 1')
        .max(4, 'Valor deve ser menor que 5'),
    spare_time: yup
        .number()
        .min(1, 'Valor deve ser maior que 1')
        .max(4, 'Valor deve ser menor que 5'),
    space_to_explore: yup
        .number()
        .min(1, 'Valor deve ser maior que 1')
        .max(4, 'Valor deve ser menor que 5'),
    trainable: yup
        .number()
        .min(1, 'Valor deve ser maior que 1')
        .max(4, 'Valor deve ser menor que 5'),
    cuteness: yup
        .number()
        .min(1, 'Valor deve ser maior que 1')
        .max(4, 'Valor deve ser menor que 5'),
});

interface FeaturesFormProps {
    editing: FeatureData | boolean;
    handleFinishAction(): Promise<void>;
}

export const FeaturesForm = ({
    editing,
    handleFinishAction,
}: FeaturesFormProps): JSX.Element => {
    const [pets, setPets] = useState<PetData[]>([]);
    const [petValue, setPetValue] = useState('');
    const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);

    const [autoCompleteOpen, onOpen, onClose] = useToggle(false);

    const { _createOne, _updateOne } = featureServices();
    const { _getAll: _getAllPets } = petServices();

    const defaultValues = useMemo(() => {
        if (typeof editing === 'object') {
            const { pet, ...values } = editing;

            const obj: FeatureFormData = { id_pet: pet.id, ...values };

            return obj;
        }
        return {
            id_pet: null,
            experience: 2,
            cost: 2,
            love: 2,
            peace: 2,
            intelligence: 2,
            loyalty: 2,
            spare_time: 2,
            space_to_explore: 2,
            trainable: 2,
            cuteness: 2,
        };
    }, [editing]);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FeatureFormData>({
        resolver: yupResolver(formSchema),
        defaultValues,
    });

    const handleForm = useCallback<SubmitHandler<FeatureFormData>>(
        async (values) => {
            try {
                const isEditing = typeof editing === 'object';

                if (isEditing) {
                    await _updateOne(
                        typeof editing === 'object' && editing.id,
                        values,
                    );
                } else await _createOne(values);

                showToast(
                    `Registro ${
                        isEditing ? 'atualizado' : 'criado'
                    } com sucesso`,
                );

                await handleFinishAction();

                reset();
            } catch (err) {
                showToast(err, 'error');
            }
        },
        [_createOne, _updateOne, editing, handleFinishAction, reset],
    );

    const petOptions = useMemo<OptionData[]>(
        () =>
            pets.map((el) => ({
                value: el.id,
                label: el.name,
            })),
        [pets],
    );

    const handleGetPets = useCallback(
        async (value) => {
            setAutoCompleteLoading(true);

            try {
                const petData = await _getAllPets({
                    name: value,
                });

                setPets(petData.rows);
            } catch (err) {
                showToast(err, 'error');
            } finally {
                setAutoCompleteLoading(false);
            }
        },
        [_getAllPets],
    );

    const handleGetInitialName = useCallback(async () => {
        try {
            if (typeof editing === 'object') {
                handleGetPets(editing.pet.name);
            }
        } catch (err) {
            showToast(err, 'error');
        }
    }, [editing, handleGetPets]);

    useEffect(() => {
        handleGetInitialName();
    }, [handleGetInitialName]);

    useDebounce(
        () => (() => petValue.length >= 3 && handleGetPets(petValue))(),
        1000,
        [petValue],
    );

    const autoCompleteDefaultValue = useMemo(() => {
        if (typeof editing === 'object') {
            return {
                value: editing.pet.id,
                label: editing.pet.name,
            };
        }

        return null;
    }, [editing]);

    return (
        <form className="form" onSubmit={handleSubmit(handleForm)}>
            <Autocomplete
                id="pet-field"
                open={autoCompleteOpen}
                onOpen={onOpen}
                onClose={onClose}
                getOptionSelected={(option, value) =>
                    option.value === value.value
                }
                getOptionLabel={(option) => option.label ?? ''}
                options={petOptions}
                loading={autoCompleteLoading}
                onInputChange={(_, newInputValue) => {
                    setPetValue(newInputValue);
                }}
                onChange={(_, newValue) => {
                    setValue(
                        'id_pet',
                        typeof newValue === 'string'
                            ? Number(newValue)
                            : Number(newValue.value),
                    );
                }}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                        <Input
                            title="Pet"
                            error={errors.id_pet}
                            loading={autoCompleteLoading}
                            {...params.inputProps}
                        />
                    </div>
                )}
                defaultValue={autoCompleteDefaultValue}
                disabled={typeof editing === 'object'}
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Demanda experiência"
                        placeholder="Demanda experiência"
                        type="number"
                        error={errors.experience}
                        min={1}
                        max={4}
                        {...field}
                    />
                )}
                control={control}
                name="experience"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Custo"
                        placeholder="Custo"
                        type="number"
                        error={errors.cost}
                        min={1}
                        max={4}
                        {...field}
                    />
                )}
                control={control}
                name="cost"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Demanda carinho"
                        placeholder="Demanda carinho"
                        type="number"
                        error={errors.love}
                        min={1}
                        max={4}
                        {...field}
                    />
                )}
                control={control}
                name="love"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Sossego"
                        placeholder="Sossego"
                        type="number"
                        error={errors.peace}
                        min={1}
                        max={4}
                        {...field}
                    />
                )}
                control={control}
                name="peace"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Inteligencia"
                        placeholder="Inteligencia"
                        type="number"
                        error={errors.intelligence}
                        min={1}
                        max={4}
                        {...field}
                    />
                )}
                control={control}
                name="intelligence"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Lealdade"
                        placeholder="Lealdade"
                        type="number"
                        error={errors.loyalty}
                        min={1}
                        max={4}
                        {...field}
                    />
                )}
                control={control}
                name="loyalty"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Demanda tempo"
                        placeholder="Demanda tempo"
                        type="number"
                        error={errors.spare_time}
                        min={1}
                        max={4}
                        {...field}
                    />
                )}
                control={control}
                name="spare_time"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Demanda espaço"
                        placeholder="Demanda espaço"
                        type="number"
                        error={errors.space_to_explore}
                        min={1}
                        max={4}
                        {...field}
                    />
                )}
                control={control}
                name="space_to_explore"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Treinável"
                        placeholder="Treinável"
                        type="number"
                        error={errors.trainable}
                        min={1}
                        max={4}
                        {...field}
                    />
                )}
                control={control}
                name="trainable"
            />
            <Controller
                render={({ field }) => (
                    <Input
                        title="Fofura"
                        placeholder="Fofura"
                        type="number"
                        error={errors.cuteness}
                        min={1}
                        max={4}
                        {...field}
                    />
                )}
                control={control}
                name="cuteness"
            />
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
