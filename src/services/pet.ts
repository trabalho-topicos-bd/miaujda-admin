import { PetData, PetFormData, PetFormUpdateData } from '../types/pet';
import { api } from './api';

interface petServicesData {
    _createOne(values: PetFormData): Promise<void>;
    _getAll(): Promise<PetData[]>;
    _getOne(id: number): Promise<PetData>;
    _updateOne(id: number, values: PetFormUpdateData): Promise<void>;
    _deleteOne(id: number): Promise<void>;
    _uploadImage(files: File[]): Promise<string[]>;
}

const _createOne = async (values: PetFormData): Promise<void> => {
    try {
        await api.post('/pet', values);
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

const _getOne = async (id: number): Promise<PetData> => {
    try {
        const { data } = await api.get(`/pet/${id}`);

        return data;
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

const _uploadImage = async (files: File[]): Promise<string[]> => {
    try {
        const formData = new FormData();

        files.forEach((file) => {
            formData.append('files', file);
        });

        const { data = [] } = await api.post('/storage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return data;
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
    _uploadImage,
});
