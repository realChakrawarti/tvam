import * as React from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Input } from './input';
import { Button } from './button';

export interface PasswordInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, ...props }, ref) => {
        const [showPassword, setShowPassword] = React.useState<boolean>(false);
        const disabled =
            props.value === '' || props.value === undefined || props.disabled;

        return (
            <div className="relative">
                <Input
                    type={showPassword ? 'text' : 'password'}
                    className={className}
                    ref={ref}
                    {...props}
                />
                <Button
                    type="button"
                    variant="ghost"
                    className="absolute top-0 right-0 hover:bg-transparent"
                    disabled={disabled}
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? <EyeIcon /> : <EyeOffIcon />}
                </Button>
            </div>
        );
    }
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
