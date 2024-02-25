import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE } from '@/renderer/types';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useEffect } from 'react';
import DbApi from '@/renderer/utils/api';
import { Channel } from '@/common/channel';
import HttpStatusCode from '@/common/httpStatusCode';
import { PasswordInput } from '@/components/ui/password-input';
import type { LoginFormSchema } from '@/renderer/types/schema';
import { loginFormSchema } from '@/renderer/types/schema';
import useUserStore from '@/renderer/store/user';
import { useSetLocalStorageUsers } from '@/renderer/utils/hooks';

function loggedInExpired(unixEpoch: number, expiryAfterMinutes: number) {
    // Get the current timestamp in milliseconds
    const now = Date.now();

    // Calculate the expiry timestamp by adding (expiryAfterMinutes * 60 * 1000) milliseconds
    const expiryTime = unixEpoch + expiryAfterMinutes * 60 * 1000;
    return now > expiryTime;
}

export default function LoginForm() {
    useSetLocalStorageUsers();

    const allUsers = useUserStore((state) => state.users);

    const navigate = useNavigate();
    const previouslyLoggedIn = () => {
        const currentUser = localStorage.getItem('loggedIn');
        if (currentUser) {
            const { userId, iat } = JSON.parse(currentUser);
            const hasExpired = loggedInExpired(iat, 10);
            return { userId, hasExpired };
        }
        return { hasExpired: true };
    };

    const form = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            userId: previouslyLoggedIn().userId || '',
            passcode: '',
        },
    });

    async function onSubmit(values: LoginFormSchema) {
        const response = await DbApi.invoke(Channel.LOGIN_USER, values);
        if (response.status === HttpStatusCode.OK) {
            window.localStorage.setItem(
                'loggedIn',
                JSON.stringify({
                    userId: response.data.userId,
                    name: response.data.name,
                    iat: Date.now(),
                })
            );
            navigate(ROUTE.DASHBOARD);
        }
    }

    useEffect(() => {
        if (!previouslyLoggedIn().hasExpired) {
            navigate(ROUTE.DASHBOARD);
        }
    }, [navigate]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Profile</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an account to login into" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {allUsers.map((user: any) => {
                                        return (
                                            <SelectItem
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passcode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Passcode</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
                <p className="text-sm">
                    Click{' '}
                    <Link
                        className="font-semibold text-indigo-500 hover:text-indigo-800 hover:underline"
                        to={ROUTE.SIGNUP}
                    >
                        here
                    </Link>{' '}
                    to register a new profile
                </p>
            </form>
        </Form>
    );
}
