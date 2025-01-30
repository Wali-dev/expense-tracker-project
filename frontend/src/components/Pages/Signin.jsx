import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const form = useForm({
        defaultValues: {
            identifier: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const response = await axios.post(`http://localhost:8000/api/v1/users/log-in`, {
                identifier: data.identifier,
                password: data.password
            });
            const token = response.data.data.accessToken
            login(token);
            localStorage.setItem('token', token);
            navigate('/home');
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "An error occurred during sign in");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="sm:max-w-sm mx-auto my-auto sm:space-y-4 p-6">
            <h2 className="text-2xl font-bold text-center">Sign In</h2>
            <p className="text-center text-sm text-gray-500 mt-2">
                &quot;Managing your expenses wisely is the key to a secure future&quot;
            </p>

            {errorMessage && (
                <div className="text-red-500 text-sm text-center mt-2">
                    {errorMessage}
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
                    <FormField
                        control={form.control}
                        name="identifier"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        {...field}
                                        disabled={isLoading}
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
                                            disabled={isLoading}
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
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default SignIn;