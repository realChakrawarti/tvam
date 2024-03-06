import SideSplash from '@/renderer/element/sideSplash';
import LoginForm from './loginForm';

export default function Login() {
    return (
        <div className="w-full h-full flex">
            <div className="w-1/2 h-full">
                <SideSplash />
            </div>
            <div className="w-1/2 h-full flex flex-col p-6 justify-center bg-[var(--tvam-bg-2)]">
                <LoginForm />
            </div>
        </div>
    );
}
