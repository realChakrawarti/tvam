import { ROUTE } from '@/renderer/types';
import { motion } from 'framer-motion';
import logo from 'assets/logo.png';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import DbApi from '@/renderer/utils/api';
import { Channel } from '@/common/channel';
import usePageTimeout from './splash.hooks';

const tasks = [
    { label: 'Establishing database connection...', value: 30 },
    { label: 'Verifying database connection...', value: 40 },
    { label: 'Fetching user profiles...', value: 30 },
];

export default function SplashPage() {
    const [progress, setProgress] = useState<any>({
        message: '',
        value: 0,
    });
    usePageTimeout({
        path: ROUTE.LOGIN,
        timeoutInSeconds: 6,
    });

    useEffect(() => {
        const response = DbApi.read(Channel.GET_ALL_USERS);
        console.log('Users', response);

        let index = 0;

        const intervalId = setInterval(() => {
            if (index === tasks.length) {
                clearInterval(intervalId);
                return;
            }

            const task = tasks[index];
            setProgress((prev: any) => ({
                message: task.label,
                value: prev.value + task.value,
            }));
            index += 1;
        }, 1500);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="h-full w-full flex flex-col items-center justify-center bg-[#070110] gap-4">
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

            <div
                className={`flex flex-col space-y-2 w-1/3 ${
                    progress.value ? 'visible' : 'invisible'
                }`}
            >
                <Progress className="bg-[#070110]" value={progress.value} />
                <p className="text-center text-sm text-white">
                    {progress.message}
                </p>
            </div>
        </div>
    );
}
