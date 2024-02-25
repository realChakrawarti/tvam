import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';

export default function FallbackErrorBoundary({
    error,
    resetErrorBoundary,
}: FallbackProps) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
        <div
            className="flex flex-col w-full h-full items-center justify-center text-[var(--tvam-bg-2)] space-y-8"
            role="alert"
        >
            <div className="flex items-center justify-between space-x-4">
                <AlertTriangle className="size-24 text-red-800" />
                <div className="flex flex-col space-y-4">
                    <div>Something went wrong</div>
                    <Button type="button" onClick={resetErrorBoundary}>
                        Try Again
                    </Button>
                </div>
            </div>
            <pre style={{ color: 'red' }}>{error.message}</pre>
        </div>
    );
}
