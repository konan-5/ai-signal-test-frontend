import Button from "../../components/common/Button";
import Navbar from "../../layout/Navbar";
import { useAuth } from "../../contexts/authProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { DashboardData } from "../../utils/interface";

export default function DashboardPage() {

    const { token, logout } = useAuth();
    const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (token) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/api/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setDashboardData(response.data); // Store the response data
                    setLoading(false); // Set loading to false when the request completes
                })
                .catch((err) => {
                    setError('Error fetching protected data'); // Handle errors
                    setLoading(false);
                    if (err.response?.status === 401) {
                        logout(); // Log out the user
                    }
                });
        } else {
            setLoading(false);
            logout();
            setError('No token found. Please log in.');
        }
    }, [logout]); // Only re-run if the logout changes the state

    return (
        <div className="">
            <Navbar />
            {/* Hero Section */}
            <div className="container px-4 mx-auto pt-[10vh]">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-gray-light text-5xl lg:text-7xl font-bold font-open-sans mb-6">
                        Welcome to AI-signals
                    </h1>
                    <p className="text-white text-xl mb-8 max-w-2xl mx-auto">
                        Access your personalized trading dashboard, real-time signals, and performance analytics all in one place. Let's make data-driven decisions together.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Button
                            title="Learn More"
                            variant="secondary"
                        />
                    </div>
                </div>
            </div>
            {
                loading && (
                    <div className="container px-4 mx-auto pt-[10vh] text-center">
                        <p className="text-gray-light">Loading...</p>
                    </div>
                )
            }
            {
                error && (
                    <div className="container px-4 mx-auto pt-[10vh] text-center">
                        <p className="text-red-500">{error}</p>
                    </div>
                )
            }
            {/* Features Section */}
            <div className="container px-4 mx-auto mt-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {(dashboardData?.features || []).map((feature, index) => (
                        <div key={index} className="bg-primary-light p-6 rounded-lg">
                            <div className="text-secondary text-2xl mb-4">{feature.icon}</div>
                            <h3 className="text-gray-light text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-gray-light/80">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats Section */}
            <div className="container px-4 mx-auto mt-20">
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    {(dashboardData?.stats || []).map((stat, index) => (
                        <div key={index}>
                            <div className="text-secondary text-4xl font-bold">{stat.value}</div>
                            <div className="text-gray-light mt-2">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}