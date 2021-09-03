export const getApiUrl = (): string => {
    if (process.env.REACT_APP_NODE_ENV === 'development') {
        return process.env.REACT_APP_API_URL_DEV;
    }
    return process.env.REACT_APP_API_URL_PROD;
};
