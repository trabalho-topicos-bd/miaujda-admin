import { LoginData, SessionData } from '../types/session';
import { serviceErrorHandler } from '../utils/helpers';
import { api } from './api';

interface sessionServicesData {
    _login(values: LoginData): Promise<SessionData>;
}

const _login = async (values: LoginData) => {
    try {
        const { data } = await api.post('/user/login', values);

        return data;
    } catch (err) {
        throw serviceErrorHandler(err);
    }
};

export const sessionServices = (): sessionServicesData => ({
    _login,
});
