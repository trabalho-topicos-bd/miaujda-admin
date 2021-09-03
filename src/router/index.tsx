import { useContext } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { SessionContext } from '../context/session';
import { DashboardPage } from '../pages/app/dashboard';
import { PetsPage } from '../pages/app/pets';
import { LoginPage } from '../pages/auth/login';

export const AppRouter = (): JSX.Element => {
    const { token } = useContext(SessionContext);

    return (
        <Router>
            {!token ? (
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Redirect to="/login" />
                </Switch>
            ) : (
                <Switch>
                    <Route path="/dashboard" component={DashboardPage} />
                    <Route path="/pets" component={PetsPage} />
                    <Redirect to="/dashboard" />
                </Switch>
            )}
        </Router>
    );
};
