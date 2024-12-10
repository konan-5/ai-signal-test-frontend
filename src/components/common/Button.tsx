interface ButtonProps {
    title: string;
    variant?: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
}

export default function Button({ title, className, onClick, variant = "primary" }: ButtonProps) {
    return (
        <button className="border-[1px] border-primary-light rounded-lg p-1" onClick={onClick}>
            <p className={`text-white text-sm font-bold font-open-sans px-4 lg:px-6 py-2 border-[1px] border-gray rounded-lg ${variant === "primary" ? "bg-gray-dark hover:bg-secondary" : "bg-secondary hover:bg-secondary-dark"}  transition-all duration-300 ${className}`}>
                {title}
            </p>
        </button>
    )
}