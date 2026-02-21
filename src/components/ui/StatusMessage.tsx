import styles from './StatusMessage.module.css';

interface StatusMessageProps {
    loading?: boolean;
    error?: string | null;
    success?: string;
}

export default function StatusMessage({ loading, error, success }: StatusMessageProps) {
    if (loading) return <div className={`${styles.message} ${styles.loading}`}>Cargando...</div>;
    if (error) return <div className={`${styles.message} ${styles.error}`}>Error: {error}</div>;
    if (success) return <div className={`${styles.message} ${styles.success}`}>✓ {success}</div>;
    return null;
}
