import '@/renderer/styles/global.css';
import { ErrorBoundary } from 'react-error-boundary';
import AppRouter from './router';
import FallbackErrorComponent from './element/fallbackErrorBoundary';

export default function App() {
    return (
        <ErrorBoundary FallbackComponent={FallbackErrorComponent}>
            <AppRouter />
        </ErrorBoundary>
    );
}
