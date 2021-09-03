import axios from 'axios';
import { getApiUrl } from '../utils/helpers';

export const api = axios.create({
    baseURL: getApiUrl(),
});
