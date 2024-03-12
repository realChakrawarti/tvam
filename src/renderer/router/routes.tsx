import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import {
    SplashPage,
    DashboardPage,
    AuthenticatePage,
    ErrorPage,
    FeaturePage,
} from '../view';
import { ROUTE } from '../types';
import { ActivityPage, AppsPage } from '../view/dashboard/modules';
import { LoginForm, SignupForm } from '../view/authenticate/modules';
import { FearSettingPage } from '../view/features/modules';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Splash */}
                <Route path={ROUTE.ROOT} element={<SplashPage />} />

                {/* Signup/Login */}
                <Route path={ROUTE.AUTHENTICATE} element={<AuthenticatePage />}>
                    <Route path={ROUTE.LOGIN} element={<LoginForm />} />
                    <Route path={ROUTE.SIGNUP} element={<SignupForm />} />
                </Route>

                {/* Dashboard */}
                <Route path={ROUTE.DASHBOARD} element={<DashboardPage />}>
                    <Route path={ROUTE.ACTIVITY} element={<ActivityPage />} />
                    <Route path={ROUTE.APPS} element={<AppsPage />} />
                </Route>

                {/* Applications */}
                <Route path={ROUTE.FEATURE} element={<FeaturePage />}>
                    <Route
                        path={ROUTE.FEAR_SETTING}
                        element={<FearSettingPage />}
                    />
                </Route>

                {/* Error */}
                <Route path={ROUTE.WILDCARD} element={<ErrorPage />} />
            </Routes>
        </Router>
    );
}
