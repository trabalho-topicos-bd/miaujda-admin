import {
    FeatureData,
    FeatureFormData,
    FeatureFormUpdateData,
} from '../types/feature';
import { serviceErrorHandler } from '../utils/helpers';
import { api } from './api';

interface featureServicesData {
    _createOne(values: FeatureFormData): Promise<void>;
    _getAll(): Promise<FeatureData[]>;
    _getOne(id: number): Promise<FeatureData>;
    _updateOne(id: number, values: FeatureFormUpdateData): Promise<void>;
    _deleteOne(id: number): Promise<void>;
}

const _createOne = async (values: FeatureFormData): Promise<void> => {
    try {
        await api.post('/feature', values);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _getAll = async (): Promise<FeatureData[]> => {
    try {
        const { data } = await api.get('/feature');

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _getOne = async (id: number): Promise<FeatureData> => {
    try {
        const { data } = await api.get(`/feature/${id}`);

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _updateOne = async (
    id: number,
    values: FeatureFormUpdateData,
): Promise<void> => {
    try {
        await api.patch(`/feature/${id}`, values);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

const _deleteOne = async (id: number): Promise<void> => {
    try {
        await api.delete(`/feature/${id}`);
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

export const featureServices = (): featureServicesData => ({
    _createOne,
    _getAll,
    _getOne,
    _updateOne,
    _deleteOne,
});
