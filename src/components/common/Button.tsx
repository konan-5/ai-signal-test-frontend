interface ButtonProps {
    title: string;
    variant?: "primary" | "secondary";
    className?: string;
    onClick?: () => void;
    isLoading?: boolean;
}

export default function Button({ 
    title, 
    className, 
    onClick, 
    variant = "primary",
    isLoading = false 
}: ButtonProps) {
    return (
        <button 
            className="border-[1px] border-primary-light rounded-lg p-1" 
            onClick={onClick}
            disabled={isLoading}
        >
            <p className={`text-white text-sm font-bold font-open-sans px-4 lg:px-6 py-2 border-[1px] border-gray rounded-lg ${
                variant === "primary" ? "bg-gray-dark hover:bg-secondary" : "bg-secondary hover:bg-secondary-dark"
            } transition-all duration-300 ${className} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isLoading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {title}
                    </span>
                ) : (
                    title
                )}
            </p>
        </button>
    )
}