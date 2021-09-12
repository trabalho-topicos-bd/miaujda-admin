import { useCallback, useEffect, useState } from 'react';
import { BiEdit, BiPlusCircle, BiTrash, BiXCircle } from 'react-icons/bi';
import Lottie from 'react-lottie';
import { Layout } from '../../../components/layout';
import { featureServices } from '../../../services/feature';
import { FeatureData } from '../../../types/feature';
import { FeaturesForm } from './form';
import { FeatureItem } from './item';
import loadingLottie from '../../../assets/lottie/loading.json';
import noneFoundLottie from '../../../assets/lottie/none-found.json';
import submittingLottie from '../../../assets/lottie/submitting.json';
import { getLottieOptions, showToast } from '../../../utils/helpers';

export const FeaturesPage = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [removing, setRemoving] = useState(false);
    const [features, setFeatures] = useState<FeatureData[]>([]);
    const [selected, setSelected] = useState<FeatureData | null>(null);
    const [editing, setEditing] = useState<FeatureData | boolean>(false);

    const { _getAll, _deleteOne } = featureServices();

    const handleGetData = useCallback(async () => {
        try {
            const data = await _getAll();

            setFeatures(data);
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
                `Deseja mesmo remover este nodo de característica?`,
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
        <Layout title="Características" isLogged>
            <div id="features-page">
                <div className="row">
                    <h1>Características</h1>
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
                                {editing ? 'Cancelar' : 'Cadastrar nova'}
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
                    <FeaturesForm
                        editing={editing}
                        handleFinishAction={handleFinishAction}
                    />
                )}
                {features.length > 0 && !editing ? (
                    <ul>
                        <FeatureItem item={null} header />
                        {features.map((feature) => (
                            <FeatureItem
                                key={`feature-${feature.id}`}
                                item={feature}
                                isSelected={selected === feature}
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
                            <h3>Nenhuma característica cadastrado</h3>
                        </div>
                    )
                )}
            </div>
        </Layout>
    );
};
