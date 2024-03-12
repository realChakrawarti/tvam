import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { ROUTE } from '@/renderer/types';
import { Link, Outlet } from 'react-router-dom';

export default function FeaturePage() {
    return (
        <div className="flex flex-col">
            <nav className="bg-[var(--tvam-bg-2)] flex items-center font-medium p-8">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={ROUTE.DASHBOARD}>Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link to={ROUTE.DASHBOARD + '/' + ROUTE.APPS}>
                                    Apps
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="tracking-wide font-semibold">
                                Fear Setting
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </nav>
            <main>
                <Outlet />
            </main>
        </div>
    );
}
