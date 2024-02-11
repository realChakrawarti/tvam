import { ROUTE } from '@/renderer/types';
import usePageTransition from './splash.hooks';

export default function SplashPage() {
    usePageTransition({
        path: ROUTE.LOGIN,
        timeoutInSecond: 3,
    });

    return <div>Loading...</div>;
}
