import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import axios from "axios";

export default function SetPasswordPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        const newErrors = {
            password: "",
            confirmPassword: ""
        };

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        if (!newErrors.password && !newErrors.confirmPassword) {
            setLoading(true);
            axios.post(`${import.meta.env.VITE_API_URL}/api/auth/set-password`, {
                token,
                password
            }).then(() => {
                navigate("/login");
            }).catch((err) => {
                if (err.response?.data) {
                    setErrors({
                        ...newErrors,
                        password: err.response.data
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
                    Set New Password
                </p>
                <FormInput
                    title="New Password"
                    type="password"
                    value={password}
                    onChange={(value) => setPassword(value)}
                    placeholder="Enter your new password"
                    error={errors.password}
                />
                <Button
                    title="Set Password"
                    variant="primary"
                    onClick={handleSubmit}
                    isLoading={loading}
                />
            </div>
        </div>
    );
}