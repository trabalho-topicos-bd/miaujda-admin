import { AdminData } from '../types/admin';
import { serviceErrorHandler } from '../utils/helpers';
import { api } from './api';

interface adminServicesData {
    _getAll(): Promise<AdminData[]>;
}

const _getAll = async (): Promise<AdminData[]> => {
    try {
        const { data } = await api.get('/user');

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

export const adminServices = (): adminServicesData => ({
    _getAll,
});
