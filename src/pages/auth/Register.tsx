import { useState } from "react";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import GoogleLoginButton from "../../components/common/GoogleLoginButton";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        const newErrors = {
            email: "",
            password: ""
        };

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        if (!newErrors.email && !newErrors.password) {
            setLoading(true);
            axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                email,
                password
            }).then((res) => {
                navigate('/verify-email');
                console.log(res.data)
            }).catch((err) => {
                if (err.response?.data) {
                    setErrors({
                        ...newErrors,
                        email: err.response.data
                    });
                }
            }).finally(() => {
                setLoading(false);
            });
        }
    };

    return (
        <div className="container px-4 mx-auto h-full flex items-center justify-center">
            <div className="border-[1px] border-primary-light rounded-lg p-6 flex flex-col gap-4 items-center justify-center max-w-[500px] w-full">
                <p className="text-white font-open-sans text-3xl font-bold">
                    Register
                </p>
                <GoogleLoginButton title="Register with Google" />
                <FormInput
                    title="Email"
                    type="email"
                    value={email}
                    onChange={(value) => setEmail(value)}
                    placeholder="Enter your email"
                    error={errors.email}
                />
                <FormInput
                    title="Password"
                    type="password"
                    value={password}
                    onChange={(value) => setPassword(value)}
                    placeholder="Enter your password"
                    error={errors.password}
                />
                <p className="text-gray-light text-sm font-open-sans">Already have an account? <Link to="/login" className="text-secondary underline">Login</Link></p>
                <Button title="Register" variant="secondary" onClick={handleSubmit} isLoading={loading} />
            </div>
        </div>
    )
}