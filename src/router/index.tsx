import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { DashboardPage } from '../pages/app/dashboard';
import { PetsPage } from '../pages/app/pets';
import { LoginPage } from '../pages/auth/login';

interface AppRouterProps {
    token: string;
}

export const AppRouter = ({ token }: AppRouterProps): JSX.Element => (
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
