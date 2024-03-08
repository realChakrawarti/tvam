import type { LucideIcon } from 'lucide-react';
import { MoreVertical, ChevronLast, ChevronFirst } from 'lucide-react';
import type { PropsWithChildren, Dispatch, SetStateAction } from 'react';
import { useContext, createContext } from 'react';
import logo from 'assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTE } from '../types';
import { useToast } from '@/components/ui/use-toast';

const SidebarContext = createContext({ expanded: false });

interface SidebarProps extends PropsWithChildren {
    setExpanded: Dispatch<SetStateAction<boolean>>;
    expanded: boolean;
    name: string;
    exp?: string;
}

export default function Sidebar({
    name,
    exp = '2500',
    children,
    expanded,
    setExpanded,
}: SidebarProps) {
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleAccountSwitch = () => {
        window.localStorage.removeItem('loggedIn');
        navigate(ROUTE.AUTHENTICATE + '/' + ROUTE.LOGIN);
        toast({
            title: 'Logged out sucessfully!',
        });
    };

    return (
        <aside className="h-screen">
            <nav className="h-full flex flex-col border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <img
                        src={logo}
                        className={`overflow-hidden ${
                            expanded ? 'size-8' : 'w-0'
                        }`}
                        alt=""
                    />
                    <button
                        type="button"
                        onClick={() => setExpanded(!expanded)}
                        className="p-1.5 rounded-lg"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

                <div className="border-t flex p-3">
                    <div
                        tabIndex={0}
                        onKeyDown={handleAccountSwitch}
                        role="button"
                        onClick={handleAccountSwitch}
                    >
                        <img
                            src={`https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true&name=${name}`}
                            alt={name}
                            className="w-10 h-10 rounded-md"
                        />
                    </div>

                    <div
                        className={`
              flex justify-between items-center
              overflow-hidden transition-[width] ${
                  expanded ? 'w-52 ml-3' : 'w-0 h-0'
              }
          `}
                    >
                        <div className="leading-4">
                            <h4 className="font-semibold whitespace-nowrap">
                                {name}
                            </h4>
                            <span className="text-xs text-gray-600">
                                {exp} EXP
                            </span>
                        </div>
                        <MoreVertical size={20} />
                    </div>
                </div>
            </nav>
        </aside>
    );
}

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    path: string;
}

export function SidebarItem({ icon: Icon, label, path }: SidebarItemProps) {
    const { expanded } = useContext(SidebarContext);
    const navigate = useNavigate();
    const location = useLocation();

    const active = location.pathname.includes(path);

    const navigateSidebar = () => {
        navigate(ROUTE.DASHBOARD + '/' + path);
    };

    return (
        <button className="block" type="button" onClick={navigateSidebar}>
            <li
                className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer text-[var(--tvam-bg-2)] hover:text-[var(--tvam-bg-1)]
        transition-colors group
        ${
            active
                ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-[var(--tvam-bg-1)]'
                : 'hover:bg-indigo-50 text-[var(--tvam-bg-2)]'
        }
    `}
            >
                <Icon size={20} />
                <span
                    className={`overflow-hidden transition-all text-left ${
                        expanded ? 'w-52 ml-3' : 'w-0'
                    }`}
                >
                    {label}
                </span>
                {label && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 hidden ${
                            expanded ? '' : 'top-2'
                        }`}
                    />
                )}

                {!expanded && (
                    <div
                        className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-[var(--tvam-bg-1)] text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 none
      `}
                    >
                        {label}
                    </div>
                )}
            </li>
        </button>
    );
}
