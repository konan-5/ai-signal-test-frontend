import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/auth/Home";

export default function Router() {

    return (
        <BrowserRouter>
            <div className="bg-primary relative w-full h-screen">
                <main className="relative w-full h-full z-10">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </main >
                <div className="absolute w-full bottom-20 left-0 flex justify-center">
                    <img src="./assets/img/effect.png" alt="background" />
                </div>
            </div>
        </BrowserRouter>
    )
}
