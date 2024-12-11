import Button from "./Button";
import { useAuth } from "../../contexts/authProvider";
import { useState, useRef, useEffect } from "react";

const getRelativeTime = (unix: number) => {
    const unixInSeconds = unix > 1e10 ? Math.floor(unix / 1000) : unix;
    const seconds = Math.floor(Date.now() / 1000 - unixInSeconds);
    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
        }
    }
    return 'Just now';
};

export default function UserMenu() {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative flex items-center gap-4" ref={menuRef}>
            <button className="flex gap-2 items-center" onClick={() => setOpen(!open)}>
                <p className="w-10 h-10 text-white text-2xl font-bold font-open-sans rounded-full bg-gradient-to-r from-primary-light to-secondary flex items-center justify-center uppercase">{user?.email.slice(0, 1)}</p>
                <p className="text-white text-sm font-bold font-open-sans">Joined {getRelativeTime(user?.created_unix ?? 0)}</p>
            </button>
            {
                open && (
                    <div className="absolute top-10 right-0">
                        <Button title="Logout" onClick={logout} />
                    </div>
                )
            }
        </div>
    )
}