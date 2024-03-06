import { cn } from '@/lib/utils';
import logo from 'assets/logo.png';
import { motion } from 'framer-motion';

export default function SideSplash({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'h-full flex flex-col items-center justify-center bg-[#070110] gap-4',
                className
            )}
        >
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
    );
}
