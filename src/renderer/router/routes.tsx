import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage, SignupPage, SplashPage, DashboardPage } from '../view';
import { ROUTE } from '../types';

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path={ROUTE.ROOT} element={<SplashPage />} />
                <Route path={ROUTE.LOGIN} element={<LoginPage />} />
                <Route path={ROUTE.SIGNUP} element={<SignupPage />} />
                <Route path={ROUTE.DASHBOARD} element={<DashboardPage />} />
            </Routes>
        </Router>
    );
}
