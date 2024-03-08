import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from '../../types';

export default function ErrorPage() {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            className="flex flex-col w-full h-full items-center justify-center text-[var(--tvam-bg-2)] space-y-8"
            role="alert"
        >
            <div className="flex items-center justify-between space-x-4">
                <AlertTriangle className="size-24 text-red-800" />
                <div className="flex flex-col space-y-4">
                    <div>{location.pathname} doesn&apos;t exists!</div>
                    <Button type="button" onClick={() => navigate(ROUTE.ROOT)}>
                        Try Again
                    </Button>
                </div>
            </div>
        </div>
    );
}
