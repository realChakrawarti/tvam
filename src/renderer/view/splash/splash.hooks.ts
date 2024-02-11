import type { RoutePath } from '@/renderer/types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PageTransitionProps {
    path: RoutePath;
    timeoutInSecond: number;
    callback?: () => void | undefined;
}

export default function usePageTransition({
    path,
    timeoutInSecond,
}: PageTransitionProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            navigate(path);
        }, timeoutInSecond);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [navigate, path, timeoutInSecond]);
}
