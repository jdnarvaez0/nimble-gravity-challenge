import type { ButtonHTMLAttributes } from 'react';

// Props del boton - extiende las props nativas de HTML button
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
            disabled={loading || disabled}
            {...props}
        >
            {loading ? 'Cargando...' : children}
        </button>
    );
}
