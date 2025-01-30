import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import axios from 'axios';
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom';



const SignUp = () => {
    const { toast } = useToast()
    const navigate = useNavigate();


    const [showPassword, setShowPassword] = useState(false);
    const form = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            setError('');

            await axios.post('http://localhost:8000/api/v1/users', data);

            toast({
                title: "Success!",
                description: "Your account has been created, sign in.",
                duration: 3000,
            });

            setTimeout(() => {
                navigate('/signin');

            }, 1000);

        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during sign up');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sm:max-w-sm mx-auto my-auto sm:space-y-4 p-6">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
            <p className="text-center text-sm text-gray-500 mt-2">
                &quot;A good financial future starts with smart decisions today&quot;
            </p>
            {error && (
                <p className="text-red-500 text-sm text-center mt-2">
                    {error}
                </p>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        {...field}
                                        type="email"
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-3"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <EyeIcon className="w-5 h-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignUp;
