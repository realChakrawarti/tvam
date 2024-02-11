import SideSplash from '@/renderer/element/sideSplash';
import SignupForm from './signupForm';

export default function SignupPage() {
    return (
        <div className="w-full h-full flex">
            <div className="w-1/2 h-full">
                <SideSplash />
            </div>
            <div className="w-1/2 h-full flex flex-col p-6 justify-center">
                <SignupForm />
            </div>
        </div>
    );
}
