import { useCallback, useEffect, useState } from 'react';
import { BiEdit, BiPlusCircle, BiTrash, BiXCircle } from 'react-icons/bi';
import Lottie from 'react-lottie';
import { Layout } from '../../../components/layout';
import { petServices } from '../../../services/pet';
import { PetData } from '../../../types/pet';
import { PetsForm } from './form';
import { PetItem } from './item';
import loadingLottie from '../../../assets/lottie/loading.json';
import noneFoundLottie from '../../../assets/lottie/none-found.json';
import submittingLottie from '../../../assets/lottie/submitting.json';
import { getLottieOptions, showToast } from '../../../utils/helpers';

export const PetsPage = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [removing, setRemoving] = useState(false);
    const [pets, setPets] = useState<PetData[]>([]);
    const [selected, setSelected] = useState<PetData | null>(null);
    const [editing, setEditing] = useState<PetData | boolean>(false);

    const { _getAll, _deleteOne } = petServices();

    const handleGetData = useCallback(async () => {
        try {
            const data = await _getAll();

            setPets(data);
        } catch (err) {
            showToast(err, 'error');
        } finally {
            setLoading(false);
        }
    }, [_getAll]);

    useEffect(() => {
        handleGetData();
    }, [handleGetData]);

    const handleCancelEditing = useCallback(() => {
        setEditing((prev) => !prev);

        setSelected(null);
    }, []);

    const handleClickDelete = useCallback(async () => {
        if (selected) {
            const result = window.confirm(
                `Deseja mesmo remover "${selected.name}"?`,
            );

            if (result) {
                try {
                    setRemoving(true);

                    await _deleteOne(selected.id);

                    showToast('Registro removido com sucesso!');

                    await handleGetData();

                    setSelected(null);
                } catch (err) {
                    showToast(err, 'error');
                } finally {
                    setRemoving(false);
                }
            }
        }
    }, [_deleteOne, handleGetData, selected]);

    const handleFinishAction = useCallback(async () => {
        await handleGetData();

        setSelected(null);

        setEditing(false);
    }, [handleGetData]);

    return (
        <Layout title="Pets" isLogged>
            <div id="pets-page">
                <div className="row">
                    <h1>Pets</h1>
                    {!selected || editing ? (
                        <button
                            className="filled"
                            type="button"
                            onClick={handleCancelEditing}>
                            {editing ? (
                                <BiXCircle size="16px" />
                            ) : (
                                <BiPlusCircle size="16px" />
                            )}
                            <span>
                                {editing ? 'Cancelar' : 'Cadastrar novo'}
                            </span>
                        </button>
                    ) : (
                        <span className="button-container">
                            <button
                                className="filled remove"
                                type="button"
                                onClick={handleClickDelete}
                                disabled={removing}>
                                {removing ? (
                                    <Lottie
                                        options={getLottieOptions(
                                            submittingLottie,
                                        )}
                                        height={32}
                                        width={196}
                                    />
                                ) : (
                                    <>
                                        <BiTrash size="16px" />
                                        <span>Remover</span>
                                    </>
                                )}
                            </button>
                            <button
                                className="filled"
                                type="button"
                                onClick={() => setEditing(selected)}>
                                <BiEdit size="16px" />
                                <span>Editar</span>
                            </button>
                        </span>
                    )}
                </div>
                {editing && (
                    <PetsForm
                        editing={editing}
                        handleFinishAction={handleFinishAction}
                    />
                )}
                {pets.length > 0 && !editing ? (
                    <ul>
                        <PetItem item={null} header />
                        {pets.map((pet) => (
                            <PetItem
                                key={`pet-${pet.id}`}
                                item={pet}
                                isSelected={selected === pet}
                                setSelected={setSelected}
                            />
                        ))}
                    </ul>
                ) : loading && !editing ? (
                    <div className="flex-container">
                        <Lottie
                            options={getLottieOptions(loadingLottie)}
                            height={300}
                            width={400}
                        />
                        <h3>Carregando...</h3>
                    </div>
                ) : (
                    !editing && (
                        <div className="flex-container">
                            <Lottie
                                options={getLottieOptions(noneFoundLottie)}
                                height={300}
                                width={300}
                            />
                            <h3>Nenhum pet cadastrado</h3>
                        </div>
                    )
                )}
            </div>
        </Layout>
    );
};
