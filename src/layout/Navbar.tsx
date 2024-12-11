import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import UserMenu from "../components/common/UserMenu";
import { useAuth } from "../contexts/authProvider";

export default function Navbar() {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <div className="bg-primary shadow-2xl w-full">
            <div className="p-4 container mx-auto flex justify-between items-center">
                <Link to="/">
                    <img className="w-40" src="./assets/logo/logo.svg" alt="Logo" />
                </Link>
                <div className="flex items-center gap-2">
                    {
                        user ? (
                            <UserMenu />
                        ) : (
                            <>
                                <Button title="Login" onClick={() => navigate("/login")} />
                                <Button title="Register" variant="secondary" onClick={() => navigate("/register")} />
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}