import { useEffect, useState } from 'react';

export const useDarkMode = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        // Inicializa a partir do localStorage ou da preferência do sistema
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'light' || savedTheme === 'dark') {
                return savedTheme;
            }
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return systemPrefersDark ? 'dark' : 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return { theme, isDark: theme === 'dark', toggleTheme };
};
