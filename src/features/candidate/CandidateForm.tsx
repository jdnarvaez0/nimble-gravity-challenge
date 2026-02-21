import { useState } from 'react';
import { useCandidate } from './useCandidate';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import StatusMessage from '../../components/ui/StatusMessage';
import styles from './CandidateForm.module.css';

export default function CandidateForm() {
    const [email, setEmail] = useState('');
    const { candidate, loading, error, searchCandidate } = useCandidate();

    if (candidate) return null;

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email.trim()) return;
        await searchCandidate(email);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Ingresa tu email</h2>
            <Input
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Button type="submit" loading={loading}>
                Buscar
            </Button>
            <StatusMessage loading={loading} error={error} />
        </form>
    );
}
