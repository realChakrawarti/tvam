import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
    SplashPage,
    DashboardPage,
    AuthenticatePage,
    ErrorPage,
} from '../view';
import { ROUTE } from '../types';
import { ActivityPage, AppsPage } from '../view/dashboard/modules';
import { LoginForm, SignupForm } from '../view/authenticate/modules';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTE.ROOT} element={<SplashPage />} />
                <Route path={ROUTE.AUTHENTICATE} element={<AuthenticatePage />}>
                    <Route path={ROUTE.LOGIN} element={<LoginForm />} />
                    <Route path={ROUTE.SIGNUP} element={<SignupForm />} />
                </Route>
                <Route path={ROUTE.DASHBOARD} element={<DashboardPage />}>
                    <Route path={ROUTE.ACTIVITY} element={<ActivityPage />} />
                    <Route path={ROUTE.APPS} element={<AppsPage />} />
                </Route>
                <Route path={ROUTE.WILDCARD} element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
