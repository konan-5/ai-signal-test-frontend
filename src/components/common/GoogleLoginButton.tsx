import { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';
import axios from 'axios';
import { useAuth } from '../../contexts/authProvider';

const GoogleLogin = ({ title }: { title: string }) => {
    const { login } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const initGoogleSignIn = () => {
            gapi.load('auth2', () => {
                gapi.auth2.init({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
                });
            });
        };

        initGoogleSignIn();
    }, []);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            const auth2 = gapi.auth2.getAuthInstance();
            const googleUser = await auth2.signIn();
            const token = googleUser.getAuthResponse().id_token;

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google-login`, { token });

            if (response.data.token) {
                login(response.data.token);
            }
        } catch (error) {
            console.error('Google login error', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <button
                className="border-[1px] border-primary-light rounded-lg p-1"
                onClick={handleLogin}
                disabled={isLoading}
            >
                <p className={`text-white text-sm font-bold font-open-sans px-4 lg:px-6 py-2 border-[1px] border-gray rounded-lg bg-secondary hover:bg-secondary-dark transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {title}
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            {title}
                        </span>
                    )}
                </p>
            </button>
        </div>
    );
};

export default GoogleLogin;