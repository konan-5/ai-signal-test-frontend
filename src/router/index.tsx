import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authProvider";
import HomePage from "../pages/app/Home";
import RegisterPage from "../pages/auth/Register";
import LoginPage from "../pages/auth/Login";
import VerifyEmailPage from "../pages/auth/VerifyEmail";
import DashboardPage from "../pages/app/Dashboard";
import SetPasswordPage from "../pages/auth/SetPassword";

// Add this helper component for protected auth routes
const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    const { token } = useAuth();

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default function Router() {

    return (
        <div className="bg-primary relative w-full h-screen">
            <main className="relative w-full h-full z-10">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/login"
                        element={
                            <RedirectIfAuthenticated>
                                <LoginPage />
                            </RedirectIfAuthenticated>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <RedirectIfAuthenticated>
                                <RegisterPage />
                            </RedirectIfAuthenticated>
                        }
                    />
                    <Route
                        path="/verify-email"
                        element={
                            <RedirectIfAuthenticated>
                                <VerifyEmailPage />
                            </RedirectIfAuthenticated>
                        }
                    />
                    <Route
                        path="/set-password"
                        element={
                            <RedirectIfAuthenticated>
                                <SetPasswordPage />
                            </RedirectIfAuthenticated>
                        }
                    />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </main >
            <div className="absolute w-full bottom-20 left-0 flex justify-center">
                <img src="./assets/img/effect.png" alt="background" />
            </div>
        </div>
    )
}
