import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Logout() {
    const { logoutHandler } = useAuth();

    useEffect(() => {
        logoutHandler();
    }, []); // Empty dependency array means "run once when component mounts"

    return null; // Don't render anything visible
}