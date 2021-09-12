import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import { AdminsPage } from '../pages/app/admins';
import { DashboardPage } from '../pages/app/dashboard';
import { PetsPage } from '../pages/app/pets';
import { FeaturesPage } from '../pages/app/features';
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
                <Route path="/features" component={FeaturesPage} />
                <Route path="/admins" component={AdminsPage} />
                <Redirect to="/dashboard" />
            </Switch>
        )}
    </Router>
);
