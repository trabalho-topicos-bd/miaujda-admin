import axios from 'axios';
import { TOKEN_KEY } from '../utils/constants';
import { getApiUrl, showToast } from '../utils/helpers';

const api = axios.create({
    baseURL: getApiUrl(),
});

api.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401) {
            showToast('Credenciais inválidas! Deslogando...', 'error');

            localStorage.removeItem(TOKEN_KEY);

            window.location.reload();
        }

        return Promise.reject(err);
    },
);

export { api };
