interface StatusMessageProps {
    loading?: boolean;
    error?: string | null;
    success?: string;
}

export default function StatusMessage({ loading, error, success }: StatusMessageProps) {
    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error}</div>;
    if (success) return <div>✓ {success}</div>;
    return null;
}
