import logo from 'assets/logo.png';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';

export default function Login() {
    return (
        <div className="w-full h-full flex">
            <div className="w-2/3 h-full">
                <div className="h-full flex flex-col items-center justify-center bg-[#070110] gap-4">
                    <motion.img
                        animate={{ rotate: 360 }}
                        transition={{
                            repeat: Infinity,
                            ease: 'linear',
                            duration: 12,
                        }}
                        width="96px"
                        height="96px"
                        src={logo}
                    />
                    <p className="text-5xl text-white">Tvam | त्वम्</p>
                </div>
            </div>
            <div className="w-1/3 h-full flex flex-col p-6 justify-center bg-[var(--tvam-bg-2)]">
                <Outlet />
            </div>
        </div>
    );
}
