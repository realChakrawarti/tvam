import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { AppListType } from '../view/dashboard/modules/apps';
import { Info } from 'lucide-react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@radix-ui/react-hover-card';
import { useNavigate } from 'react-router-dom';

export default function AppCard(props: AppListType) {
    const navigate = useNavigate();

    const handleOpenApp = () => {
        navigate(props.path);
    };

    return (
        <Card
            onClick={props.active ? handleOpenApp : () => {}}
            className={`w-auto min-h-[150px] max-h-full bg-[var(--tvam-bg-2)] ${
                props.active ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
        >
            <CardHeader className="h-full">
                <div className="flex justify-between items-center">
                    <CardTitle>
                        <div className="flex gap-2">
                            {props.icon}
                            {props.name}
                        </div>
                    </CardTitle>
                    {props.longDescription && (
                        <HoverCard>
                            <HoverCardTrigger>
                                <Info size={16} className="cursor-pointer" />
                            </HoverCardTrigger>
                            <HoverCardContent className="w-[300px] bg-[var(--tvam-bg-2)] shadow-sm border border-[var(--tvam-bg-1)] p-3 rounded-sm">
                                <div className="text-sm">
                                    {props.longDescription}
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    )}
                </div>
                <CardDescription className="flex-grow">
                    {props.shortDescription}
                </CardDescription>
                {!props.active && (
                    <p className="font-semibold text-slate-700 tracking-wide">
                        COMING SOON
                    </p>
                )}
            </CardHeader>
        </Card>
    );
}
