import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import HttpStatusCode from '@/main/controller/httpStatusCode';
import { Channel } from '@/common/channel';
import { useForm } from 'react-hook-form';

export default function SignupForm() {
    const form = useForm();

    const onSubmit = async (data: any) => {
        const response = await window.electron.ipcRenderer.invoke(
            Channel.CREATE_USER,
            {
                name: data.name,
                passcode: data.passcode,
            }
        );

        if (response.status === HttpStatusCode.CREATED) {
            console.log({
                title: 'Account created successfully!',
            });
        } else {
            console.log({
                title: 'Uh oh! Something went wrong.',
                description: response.message,
            });
        }

        console.log('response', response);
    };

    return (
        <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }: any) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This will show up in your profile
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="passcode"
                    render={({ field }: any) => (
                        <FormItem>
                            <FormLabel>Passcode</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is your passcode which will be used to
                                login
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="verify-passcode"
                    render={({ field }: any) => (
                        <FormItem>
                            <FormLabel>Verify passcode</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="login-after-signup"
                    render={({ field }: any) => (
                        <FormItem>
                            <div className="flex space-x-2">
                                <FormControl>
                                    <Checkbox {...field} />
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
            </form>
        </Form>
    );
}
