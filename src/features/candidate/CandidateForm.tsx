import { useState } from 'react';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import StatusMessage from '../../components/ui/StatusMessage';
import styles from './CandidateForm.module.css';

interface CandidateFormProps {
    loading: boolean;
    error: string | null;
    searchCandidate: (email: string) => Promise<void>;
}

export default function CandidateForm({ loading, error, searchCandidate }: CandidateFormProps) {
    const [email, setEmail] = useState('');

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
