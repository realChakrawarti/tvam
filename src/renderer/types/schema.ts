import { z } from 'zod';

export const loginFormSchema = z.object({
    userId: z.string(),
    passcode: z
        .string()
        .min(4, {
            message: 'Passcode cannot be less than 4 characters.',
        })
        .max(8, {
            message: 'Passcode cannot be more than 8 characters.',
        }),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

export const signupFormSchema = z
    .object({
        name: z
            .string()
            .min(3, {
                message: 'Name must be atleast 3 characters',
            })
            .max(32, {
                message: 'Name is too long, at-most 32 characters',
            })
            .refine((value) => isNaN(Number(value)), {
                message: 'Name cannot be all numeric',
            }),
        passcode: z
            .string()
            .min(4, {
                message: 'Passcode cannot be less than 4 characters.',
            })
            .max(8, {
                message: 'Passcode cannot be more than 8 characters.',
            }),
        verifyPasscode: z.string(),
        loginAfterSignup: z.boolean(),
    })
    .refine((data) => data.passcode === data.verifyPasscode, {
        message: "Passcode doesn't match",
        path: ['verifyPasscode'],
    });

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
