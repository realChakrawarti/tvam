import type { RoutePath } from '@/renderer/types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PageTimeoutProps {
    path: string;
    timeoutInSeconds: number;
    callback?: () => void | undefined;
}

export default function usePageTimeout({
    path,
    timeoutInSeconds,
}: PageTimeoutProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate(path);
        }, timeoutInSeconds * 1000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [navigate, path, timeoutInSeconds]);
}
