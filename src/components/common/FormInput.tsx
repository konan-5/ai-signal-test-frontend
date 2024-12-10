import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface FormInputProps {
    title: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    error?: string;
    type?: 'text' | 'password' | 'email';
}

export default function FormInput({
    title,
    value,
    onChange,
    placeholder,
    error,
    type = 'text'
}: FormInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full flex flex-col gap-1">
            <p className="text-white text-sm font-bold font-open-sans">{title}</p>
            <div className="w-full border-[1px] border-primary-light rounded-lg p-1 relative">
                <input
                    type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full text-white text-sm font-bold font-open-sans bg-gray-dark px-4 py-2 border-[1px] border-gray rounded-lg focus:outline-none ${type === 'password' ? 'pr-12' : ''}`}
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-gray"
                    >
                        {showPassword ? (
                            <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                            <EyeIcon className="h-5 w-5" />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p className="px-2 text-red-500 text-sm font-open-sans">{error}</p>
            )}
        </div>
    );
}