import { useCallback, useEffect, useState } from 'react';
import { Layout } from '../../../components/layout';
import { petServices } from '../../../services/pet';
import { PetData } from '../../../types/pet';
import { PetsForm } from './form';

export const PetsPage = (): JSX.Element => {
    const [pets, setPets] = useState<PetData[]>([]);
    const [editing, setEditing] = useState<PetData | boolean>(false);

    const { _getAll } = petServices();

    const handleGetData = useCallback(async () => {
        try {
            const data = await _getAll();

            setPets(data);
        } catch (err) {
            console.log(err);
        }
    }, [_getAll]);

    useEffect(() => {
        handleGetData();
    }, [handleGetData]);

    return (
        <Layout title="Pets" isLogged>
            <div id="pets-page">
                <div className="row">
                    <h1>Pets</h1>
                    <button
                        className="filled"
                        type="button"
                        onClick={() => setEditing(true)}>
                        <span>+ Cadastrar</span>
                    </button>
                </div>
                {editing && <PetsForm />}
                <ul>
                    {pets.map((pet) => (
                        <li>
                            <h1 key={`pet-${pet.id}`}>{pet.name}</h1>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};
