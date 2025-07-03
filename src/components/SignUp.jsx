import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/Auth'
import { login } from '../Features/authSlice'
import { useForm } from 'react-hook-form'
import Button from './Button'
import Input from './Input'




function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { register, handleSubmit } = useForm();

    const signUp = async (data) => {
        setError(null)
        try {
            const userAccount = await authService.createAccount(data)
            if (userAccount) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login(userData))
                    navigate('/') // Redirect to home or dashboard after login


                }
            }
        }
        catch (error) {
            console.log('Error creating account')
            setError('Failed to create account. Please try again.')
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create your NerdLed Blog account</h2>
                {error && (
                    <div className="mb-4 text-red-600 text-sm text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit(signUp)} className="space-y-5">
                    <Input
                        label="Name"
                        type="text"
                        {...register("name", { required: true })}
                        placeholder="Enter your name"
                    />
                    <Input
                        label="Email"
                        type="email"
                        {...register("email", {
                            required: true, validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Enter a valid email address",
                            }
                        })}
                        placeholder="Enter your email"
                    />
                    <Input
                        label="Password"
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Enter your password"
                    />
                    <Button
                        type="button"
                        bgColor="bg-red-600"
                        textColor="text-white"
                        className="w-full py-2 rounded hover:bg-red-700 transition flex items-center justify-center mt-2"
                        onClick={() => authService.loginWithGoogle()}
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.5 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" /><path fill="#34A853" d="M6.3 14.7l7 5.1C14.7 17.1 19 14 24 14c3.1 0 5.9 1.2 8 3.1l6-6C34.5 5.1 29.6 3 24 3 15.7 3 8.6 8.5 6.3 14.7z" /><path fill="#FBBC05" d="M24 44c5.6 0 10.5-1.9 14.3-5.2l-6.6-5.4C29.6 36 24 36 24 36c-5.6 0-10.5-1.9-14.3-5.2l6.6-5.4C18.4 33.1 22.9 36 24 36z" /><path fill="#EA4335" d="M44.5 20H24v8.5h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l6-6C34.5 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.2-4z" /></g></svg>
                        Sign in with Google
                    </Button>
                    <Button
                        type="submit"
                        textColor="text-white"
                        bgColor="bg-blue-600"
                        className="w-full py-2 rounded hover:bg-blue-700 transition"
                    >
                        Sign Up
                    </Button>
                </form>
                <p className="mt-6 text-center text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp