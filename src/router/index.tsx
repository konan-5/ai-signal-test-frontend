import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/app/Home";
import RegisterPage from "../pages/auth/Register";
import LoginPage from "../pages/auth/Login";
import VerifyEmailPage from "../pages/auth/VerifyEmail";
export default function Router() {

    return (
        <BrowserRouter>
            <div className="bg-primary relative w-full h-screen">
                <main className="relative w-full h-full z-10">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/verify-email" element={<VerifyEmailPage />} />
                    </Routes>
                </main >
                <div className="absolute w-full bottom-20 left-0 flex justify-center">
                    <img src="./assets/img/effect.png" alt="background" />
                </div>
            </div>
        </BrowserRouter>
    )
}
