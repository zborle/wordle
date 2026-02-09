/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                // Game state colors - consistent across themes
                correct: {
                    DEFAULT: '#22c55e',
                    dark: '#16a34a',
                },
                present: {
                    DEFAULT: '#eab308',
                    dark: '#ca8a04',
                },
                absent: {
                    DEFAULT: '#64748b',
                    dark: '#475569',
                },
                // Surface colors
                surface: {
                    DEFAULT: '#ffffff',
                    dark: '#0f172a',
                },
                // Cell colors
                cell: {
                    border: '#e2e8f0',
                    'border-dark': '#334155',
                    bg: '#ffffff',
                    'bg-dark': '#1e293b',
                    text: '#0f172a',
                    'text-dark': '#f1f5f9',
                },
                // Keyboard colors
                key: {
                    bg: '#e2e8f0',
                    'bg-dark': '#334155',
                    hover: '#cbd5e1',
                    'hover-dark': '#475569',
                    active: '#94a3b8',
                    'active-dark': '#64748b',
                    text: '#0f172a',
                    'text-dark': '#f1f5f9',
                },
                // Modal colors
                modal: {
                    overlay: 'rgba(0, 0, 0, 0.5)',
                    bg: '#ffffff',
                    'bg-dark': '#1e293b',
                    text: '#0f172a',
                    'text-dark': '#f1f5f9',
                },
            },
            animation: {
                'pop-in': 'popIn 0.1s ease-in-out',
                flip: 'flip 0.5s ease-in-out',
                shake: 'shake 0.5s ease-in-out',
                'bounce-short': 'bounceShort 0.5s ease-in-out',
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                popIn: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '40%': { transform: 'scale(1.1)', opacity: '1' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                flip: {
                    '0%': { transform: 'rotateX(0)' },
                    '50%': { transform: 'rotateX(90deg)' },
                    '100%': { transform: 'rotateX(0)' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
                    '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
                },
                bounceShort: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
            transitionProperty: {
                theme: 'background-color, border-color, color, fill, stroke',
            },
        },
    },
    plugins: [],
}
