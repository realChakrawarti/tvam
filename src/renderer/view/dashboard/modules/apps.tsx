import AppCard from '@/renderer/element/appCard';
import { ROUTE } from '@/renderer/types';
import { BookMarked, Hourglass, Music, NotepadText } from 'lucide-react';

const appList = [
    {
        name: 'Fear Setting',
        shortDescription: 'Decision-making tool for high-stakes situations',
        longDescription: (
            <>
                <p>
                    Tim Ferriss uses it to “avoid self-destruction, and make
                    business decisions.”
                </p>
                <a
                    className="text-indigo-600 hover:underline hover:text-indigo-800 font-semibold"
                    target="_blank"
                    href="https://tim.blog/2017/05/15/fear-setting/"
                >
                    Read more
                </a>
            </>
        ),
        icon: <NotepadText />,
        path: ROUTE.FEAR_SETTING,
        active: true,
    },
    {
        name: 'Ambience',
        shortDescription:
            'Soothing background noises to help mask loud noises, reduce stress, improve focus and productivity',
        longDescription: '',
        icon: <Music />,
        path: '',
        active: false,
    },
    {
        name: 'Knowledge Inbox',
        shortDescription: 'Inbox for your bookmarks',
        longDescription: '',
        icon: <BookMarked />,
        path: '',
        active: false,
    },
    {
        name: 'Pomodoro',
        shortDescription:
            'Time management method to break work into intervals, typically 25 minutes in length, separated by short breaks.',
        longDescription: '',
        icon: <Hourglass />,
        path: '',
        active: false,
    },
];

export type AppListType = (typeof appList)[0];

export default function AppsPage() {
    return (
        <div className="overflow-y-auto p-8 w-full h-full grid grid-cols-[repeat(3,minmax(300px,1fr))] grid-rows-4 gap-4">
            {appList.map((item) => {
                return <AppCard key={item.name} {...item} />;
            })}
        </div>
    );
}
