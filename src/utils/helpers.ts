import { AxiosError } from 'axios';
import { Options } from 'react-lottie';
import { toast, ToastOptions } from 'react-toastify';

export const getApiUrl = (): string => {
    if (process.env.REACT_APP_NODE_ENV === 'development') {
        return process.env.REACT_APP_API_URL_DEV;
    }
    if (process.env.REACT_APP_NODE_ENV === 'test') {
        return process.env.REACT_APP_API_URL_TEST;
    }
    return process.env.REACT_APP_API_URL_PROD;
};

const toastOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};

export const showToast = (message: string, status = 'success'): void => {
    toast[status](message, toastOptions);
};

export const getLottieOptions = (animationData): Options => ({
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
    },
});

export const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const serviceErrorHandler = (err: AxiosError): string => {
    if (typeof err === 'string') return err;

    if (err.response.data) {
        if ('message' in err.response.data) {
            return err.response.data.message;
        }
    }

    if (typeof err === 'object') {
        if (err.message) return err.message;

        if ('message' in err.response.data) return err.response.data.message;
    }

    return JSON.stringify(err);
};
