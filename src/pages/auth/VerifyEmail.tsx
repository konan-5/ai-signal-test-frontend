import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/common/Button';

const EmailVerificationPage: React.FC = () => {
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get('token');

        if (token) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/api/auth/verify-email?token=${token}`)
                .then((response) => {
                    setMessage(response.data.message);
                    setIsVerified(true);
                    setLoading(false);
                })
                .catch((err) => {
                    setMessage(err.response.data);
                    setLoading(false);
                });
        } else {
            setMessage('Token is missing.');
            setLoading(false);
        }
    }, [location.search]);

    const redirectToLogin = () => {
        navigate('/login');
    };

    return (

        <div className="container px-4 mx-auto h-full flex items-center justify-center">
            <div className="border-[1px] border-primary-light rounded-lg p-6 flex flex-col gap-4 items-center justify-center max-w-[500px] w-full">
                {loading ? (
                    <p className="text-gray-light text-sm font-open-sans">Verifying your email...</p>
                ) : isVerified ? (
                    <p className="text-green-500 text-sm font-open-sans">Your email has been verified successfully!</p>
                ) : (
                    <p className="text-red-500 text-sm font-open-sans">{message}</p>
                )}
                <Button title="Go to Login" variant="primary" onClick={redirectToLogin} />
            </div>
        </div>

    );
};

export default EmailVerificationPage;
