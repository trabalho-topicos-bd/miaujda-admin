import { PetData, PetFormData, PetFormUpdateData } from '../types/pet';
import { serviceErrorHandler } from '../utils/helpers';
import { api } from './api';

interface getAllData {
    count: number;
    rows: PetData[];
}

interface petServicesData {
    _createOne(values: PetFormData): Promise<void>;
    _getAll(
        params?: { [key in keyof PetFormData]?: PetFormData[key] },
    ): Promise<getAllData>;
    _getOne(id: number): Promise<PetData>;
    _updateOne(id: number, values: PetFormUpdateData): Promise<void>;
    _deleteOne(id: number): Promise<void>;
    _uploadImage(files: File[]): Promise<string[]>;
}

const _createOne = async (values: PetFormData): Promise<void> => {
    try {
        await api.post('/pet', values);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _getAll = async (params = {}): Promise<getAllData> => {
    try {
        const { data } = await api.get('/pet', { params });

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _getOne = async (id: number): Promise<PetData> => {
    try {
        const { data } = await api.get(`/pet/${id}`);

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _updateOne = async (
    id: number,
    values: PetFormUpdateData,
): Promise<void> => {
    try {
        await api.patch(`/pet/${id}`, values);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _deleteOne = async (id: number): Promise<void> => {
    try {
        await api.delete(`/pet/${id}`);
    } catch (err) {
        throw serviceErrorHandler(err);
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
        throw serviceErrorHandler(err);
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
