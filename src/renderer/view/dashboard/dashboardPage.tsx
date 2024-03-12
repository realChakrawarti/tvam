import Sidebar, { SidebarItem } from '@/renderer/element/sidebar';
import { useState } from 'react';
import { ActivitySquare, LayoutGrid } from 'lucide-react';
import { useGetLocalStorage } from '@/renderer/view/utils/hooks';
import { Outlet } from 'react-router-dom';
import { ROUTE } from '@/renderer/types';

const sidebarMenuItems = [
    {
        icon: ActivitySquare,
        label: 'Activity',
        navigatePath: ROUTE.ACTIVITY,
    },
    {
        icon: LayoutGrid,
        label: 'Apps',
        navigatePath: ROUTE.APPS,
    },
];

export default function DashboardPage() {
    const [expanded, setExpanded] = useState(true);

    const user: { name: string; userId: string; iat: string } =
        useGetLocalStorage('loggedIn');

    return (
        <div className="overflow-y-hidden w-screen h-svh flex text-[var(--tvam-bg-2)]">
            <div
                className={`sticky transition-all ${expanded} ? 'w-[270px]' : 'w-[52px]'`}
            >
                <Sidebar
                    name={user.name}
                    expanded={expanded}
                    setExpanded={setExpanded}
                >
                    {sidebarMenuItems.map((item) => (
                        <SidebarItem
                            key={item.navigatePath}
                            icon={item.icon}
                            label={item.label}
                            path={item.navigatePath}
                        />
                    ))}
                </Sidebar>
            </div>
            <Outlet />
        </div>
    );
}
