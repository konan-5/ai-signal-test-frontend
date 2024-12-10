import Button from "../../components/common/Button";
import Navbar from "../../layout/Navbar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="">
            <Navbar />
            <div className="container px-4 mx-auto mt-[10vh] text-center">
                <h1 className="text-gray-light text-4xl lg:text-6xl font-bold text-center font-open-sans">
                    Start trading With <br />
                    <span className="text-secondary text-2xl lg:text-4xl">AI-signals
                    </span>
                </h1>
                <p className="text-white text-center font-open-sans my-10 max-w-[500px] mx-auto">
                    Join thousands of traders already profiting with our AI-powered signals. Try it for FREE
                </p>
                <Button
                    title="Register for Free"
                    variant="secondary"
                    onClick={() => navigate("/register")} />
            </div>
        </div>
    )
}