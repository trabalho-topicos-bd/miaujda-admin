import { useEffect, useMemo, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { SessionContext } from './context/session';
import { AppRouter } from './router';
import { api } from './services/api';
import { SessionContextData } from './types/session';
import 'react-toastify/dist/ReactToastify.css';
import { TOKEN_KEY } from './utils/constants';

export const App = (): JSX.Element => {
    const [token, setToken] = useState<string | null>('temp');

    const sessionContextValue = useMemo<SessionContextData>(
        () => ({
            handleLogin: (newToken) => {
                setToken(newToken);

                localStorage.setItem(TOKEN_KEY, newToken);

                api.defaults.headers.Authorization = `Bearer ${newToken}`;
            },
            handleLogout: () => {
                setToken(null);

                localStorage.removeItem(TOKEN_KEY);

                delete api.defaults.headers.Authorization;
            },
        }),
        [],
    );

    useEffect(() => {
        const oldToken = localStorage.getItem(TOKEN_KEY);

        if (oldToken) {
            sessionContextValue.handleLogin(oldToken);
        } else {
            sessionContextValue.handleLogout();
        }
    }, [sessionContextValue]);

    return (
        <SessionContext.Provider value={sessionContextValue}>
            <AppRouter token={token} />
            <ToastContainer />
        </SessionContext.Provider>
    );
};
