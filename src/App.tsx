import { useEffect, useMemo, useState } from 'react';
import { SessionContext } from './context/session';
import { AppRouter } from './router';
import { api } from './services/api';
import { SessionContextData } from './types/session';

const TOKEN_KEY = 'miaujuda-token';

export const App = (): JSX.Element => {
    const [token, setToken] = useState<string | null>(null);

    const sessionContextValue = useMemo<SessionContextData>(
        () => ({
            token,
            handleLogin: (newToken) => {
                setToken(newToken);

                localStorage.setItem(TOKEN_KEY, newToken);

                api.defaults.headers.Authorization = `Bearer ${newToken}`;
            },
            handleLogout: () => {
                localStorage.removeItem(TOKEN_KEY);

                delete api.defaults.headers.Authorization;
            },
        }),
        [token],
    );

    useEffect(() => {
        const oldToken = localStorage.getItem(TOKEN_KEY);

        setToken(oldToken);
    }, []);

    return (
        <SessionContext.Provider value={sessionContextValue}>
            <AppRouter />
        </SessionContext.Provider>
    );
};
