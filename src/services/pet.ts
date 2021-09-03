import { PetData, PetFormData, PetFormUpdateData } from '../types/pet';
import { api } from './api';

interface petServicesData {
    _createOne(values: PetFormData): Promise<void>;
    _getAll(): Promise<PetData[]>;
    _getOne(): Promise<PetData>;
    _updateOne(id: number, values: PetFormUpdateData): Promise<void>;
    _deleteOne(id: number): Promise<void>;
}

const mockedPet: PetData = {
    id: 0,
    images: ['1.jpeg', '2.jpeg'],
    gender: 0,
    species: 0,
    name: 'Rex',
    breed: 'Vira-lata',
    adopted: false,
    age: 2,
};

const _createOne = async (values: PetFormData): Promise<void> => {
    try {
        console.log(values);
    } catch (err) {
        throw JSON.stringify(err);
    }
};

const _getAll = async (): Promise<PetData[]> => {
    try {
        const { data } = await api.get('/pet');

        return data;
    } catch (err) {
        throw JSON.stringify(err);
    }
};

const _getOne = async (): Promise<PetData> => {
    try {
        console.log('get one');

        return mockedPet;
    } catch (err) {
        throw JSON.stringify(err);
    }
};

const _updateOne = async (
    id: number,
    values: PetFormUpdateData,
): Promise<void> => {
    try {
        console.log(id, values);
    } catch (err) {
        throw JSON.stringify(err);
    }
};

const _deleteOne = async (id: number): Promise<void> => {
    try {
        console.log(id);
    } catch (err) {
        throw JSON.stringify(err);
    }
};

export const petServices = (): petServicesData => ({
    _createOne,
    _getAll,
    _getOne,
    _updateOne,
    _deleteOne,
});
