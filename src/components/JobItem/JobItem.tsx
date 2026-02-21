import { useState } from 'react';
import { useApply } from '../../hooks/useApply';
import Input from '../ui/Input';
import Button from '../ui/Button';
import StatusMessage from '../ui/StatusMessage';
import type { Job, Candidate } from '../../types';
import styles from './JobItem.module.css';

interface JobItemProps {
    job: Job;
    candidate: Candidate;
}

export default function JobItem({ job, candidate }: JobItemProps) {
    const [repoUrl, setRepoUrl] = useState('');
    const { response, loading, error, submitApplication } = useApply();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!repoUrl.trim()) return;

        await submitApplication({
            uuid: candidate.uuid,
            jobId: job.id,
            candidateId: candidate.candidateId,
            repoUrl: repoUrl,
        });
    };

    if (response?.ok) {
        return (
            <div className={styles.card}>
                <h3 className={styles.title}>{job.title}</h3>
                <div className={styles.successMessage}>
                    ✓ Postulación enviada correctamente
                </div>
            </div>
        );
    }

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{job.title}</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    type="url"
                    placeholder="https://github.com/tu-usuario/tu-repo"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    required
                />
                <Button type="submit" loading={loading}>
                    Aplicar
                </Button>
                <StatusMessage loading={loading} error={error} />
            </form>
        </div>
    );
}
