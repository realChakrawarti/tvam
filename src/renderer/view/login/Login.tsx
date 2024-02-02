import logo from 'assets/logo.png';
import { Channel } from '@/common/channel';
import { FormEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

export const Login = () => {
    const [databaseResponse, setDatabaseResponse] = useState();
    const form = useForm();

    const onSubmit = async (data: any) => {
        const response = await window.electron.ipcRenderer.invoke(
            Channel.CREATE_USER,
            {
                name: data.name,
                passcode: data.passcode,
            }
        );

        console.log('response', response);
        setDatabaseResponse(response);
    };

    return (
        <div className="w-full h-full flex">
            <div className="w-1/2 h-full flex flex-col items-center justify-center bg-[#070110]">
                <motion.img
                    animate={{ rotate: 360 }}
                    transition={{
                        repeat: Infinity,
                        ease: 'linear',
                        duration: 12,
                    }}
                    width="96px"
                    height="96px"
                    src={logo}
                />
            </div>
            <div className="w-1/2 h-full flex flex-col p-6 justify-center">
                <Form {...form}>
                    <form
                        className="space-y-4"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
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
                                        This is your passcode which will be used
                                        to login
                                    </FormDescription>
                                </FormItem>
                            )}
                        />

                        <Button type="submit">Signup</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Login;
