import { LoginData, SessionData } from '../types/session';

interface sessionServicesData {
    _login(values: LoginData): Promise<SessionData>;
}

const _login = async (values: LoginData) => {
    try {
        return {
            token: `token-${values.email}-${values.password}`,
        };
    } catch (err) {
        throw JSON.stringify(err);
    }
};

export const sessionServices = (): sessionServicesData => ({
    _login,
});
