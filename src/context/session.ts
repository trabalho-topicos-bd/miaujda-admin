import { createContext } from 'react';
import { SessionContextData } from '../types/session';

export const SessionContext = createContext<SessionContextData>(
    {} as SessionContextData,
);
