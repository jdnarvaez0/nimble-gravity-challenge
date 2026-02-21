import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
}

export default function Button({ 
    children, 
    loading = false, 
    disabled,
    ...props 
}: ButtonProps) {
    return (
        <button 
            className={styles.button}
            disabled={loading || disabled}
            {...props}
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
}
