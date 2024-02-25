import Sidebar, { SidebarItem } from '@/renderer/element/sidebar';
import { useState } from 'react';
import { ActivitySquare, LayoutGrid } from 'lucide-react';
import { useGetLocalStorage } from '@/renderer/utils/hooks';

const sidebarMenuItems = [
    {
        icon: ActivitySquare,
        label: 'Dashboard',
        key: 'dashbaord',
        action: (cb: any) => cb(),
    },
    {
        icon: LayoutGrid,
        label: 'Apps',
        key: 'apps',
        action: (cb: any) => cb(),
    },
];

export default function DashboardPage() {
    const [expanded, setExpanded] = useState(true);
    const [activeTab, setActiveTab] = useState<string>('');

    const user: { name: string; userId: string; iat: string } =
        useGetLocalStorage('loggedIn');

    const handleMenuItemClick = (tab: string, action: any) => {
        action(() => {
            setActiveTab(tab);
        });
    };
    return (
        <div className="w-screen h-svh flex text-[var(--tvam-bg-2)]">
            <div
                className={`transition-all ${expanded} ? 'w-[270px]' : 'w-[52px]'`}
            >
                <Sidebar
                    name={user.name}
                    expanded={expanded}
                    setExpanded={setExpanded}
                >
                    {sidebarMenuItems.map((item) => (
                        <SidebarItem
                            onClick={handleMenuItemClick}
                            key={item.key}
                            icon={item.icon}
                            alert={item.label}
                            text={item.label}
                            tab={item.key}
                            action={item.action}
                            active={item.key === activeTab}
                        />
                    ))}
                </Sidebar>
            </div>
            <div className="flex-grow">Main Content</div>
        </div>
    );
}
