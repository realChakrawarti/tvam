import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Channel } from '@/common/channel';
import { useForm } from 'react-hook-form';
import DbApi from '@/renderer/view/utils/api';
import { PasswordInput } from '@/components/ui/password-input';
import { zodResolver } from '@hookform/resolvers/zod';
import HttpStatusCode from '@/common/httpStatusCode';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTE } from '@/renderer/types';
import type { SignupFormSchema } from '@/renderer/types/schema';
import { signupFormSchema } from '@/renderer/types/schema';
import useUserStore from '@/renderer/store/user';
import { useToast } from '@/components/ui/use-toast';

export default function SignupForm() {
    const allUsers = useUserStore((state) => state.users);

    const form = useForm<SignupFormSchema>({
        resolver: zodResolver(signupFormSchema),
        defaultValues: {
            name: '',
            passcode: '',
            verifyPasscode: '',
            loginAfterSignup: false,
        },
    });

    const navigate = useNavigate();
    const { toast } = useToast();

    const onSubmit = async (data: SignupFormSchema) => {
        const signupResponse = await DbApi.invoke(Channel.CREATE_USER, data);
        if (signupResponse.status === HttpStatusCode.CREATED) {
            toast({
                title: signupResponse.message,
            });
            if (data.loginAfterSignup) {
                const loginResponse = await DbApi.invoke(Channel.LOGIN_USER, {
                    userId: signupResponse.data.userId,
                    passcode: data.passcode,
                });
                if (loginResponse.status === HttpStatusCode.OK) {
                    window.localStorage.setItem(
                        'loggedIn',
                        JSON.stringify({
                            userId: loginResponse.data.userId,
                            name: loginResponse.data.name,
                            iat: Date.now(),
                        })
                    );
                    navigate(ROUTE.DASHBOARD);
                }
            } else {
                navigate(ROUTE.LOGIN);
            }
        }
    };

    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This will show up in your profile
                            </FormDescription>
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
                            <FormDescription>
                                This is your passcode which will be used to
                                login
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="verifyPasscode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Verify passcode</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="loginAfterSignup"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex space-x-2">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormLabel>
                                    Accept to login after signup
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button className="bg-[#070110]" type="submit">
                    Signup
                </Button>
                {allUsers.length ? (
                    <p className="text-sm">
                        Already have a profile? Click{' '}
                        <Link
                            className="font-semibold text-indigo-500 hover:text-indigo-800 hover:underline"
                            to={ROUTE.AUTHENTICATE + '/' + ROUTE.LOGIN}
                        >
                            here
                        </Link>{' '}
                        to login
                    </p>
                ) : null}
            </form>
        </Form>
    );
}
