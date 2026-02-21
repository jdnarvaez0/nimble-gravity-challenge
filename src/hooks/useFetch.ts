import { useState, useCallback } from 'react';

// Hook para manejar peticiones a la API con estados de carga y error
export function useFetch<T>() {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const execute = useCallback(async (fetchFunction: () => Promise<T>) => {
        setError(null);
        setLoading(true);

        try {
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Ocurrio un error inesperado');
            }
        } finally {
            setLoading(false);
        }
    }, []);

    return { data, loading, error, execute };
}
