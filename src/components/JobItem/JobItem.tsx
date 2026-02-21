import { useState } from 'react';
import { useApply } from '../../hooks/useApply';
import Input from '../ui/Input';
import Button from '../ui/Button';
import StatusMessage from '../ui/StatusMessage';
import { getGitHubUrlError } from '../../utils/validation';
import type { Job, Candidate } from '../../types';
import styles from './JobItem.module.css';

interface JobItemProps {
    job: Job;
    candidate: Candidate;
}

export default function JobItem({ job, candidate }: JobItemProps) {
    const [repoUrl, setRepoUrl] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);
    const { response, loading, error, submitApplication } = useApply();

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Validación de URL antes de enviar
        const validation = getGitHubUrlError(repoUrl);
        if (validation) {
            setValidationError(validation);
            return;
        }
        
        setValidationError(null);

        // Debug: verificar que todos los datos existan
        const payload = {
            uuid: candidate.uuid,
            jobId: job.id,
            candidateId: candidate.candidateId,
            applicationId: candidate.applicationId,
            repoUrl: repoUrl,
        };
        
        console.log('Enviando payload:', payload);
        
        // Verificar que no haya valores undefined
        if (!payload.uuid || !payload.jobId || !payload.candidateId || !payload.applicationId || !payload.repoUrl) {
            console.error('Faltan datos:', payload);
            return;
        }

        await submitApplication(payload);
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRepoUrl(value);
        
        // Validación en tiempo real mientras escribe
        if (value) {
            const error = getGitHubUrlError(value);
            setValidationError(error);
        } else {
            setValidationError(null);
        }
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
                    onChange={handleUrlChange}
                    error={validationError || undefined}
                />
                <Button 
                    type="submit" 
                    loading={loading}
                    disabled={!!validationError || !repoUrl}
                >
                    Aplicar
                </Button>
                <StatusMessage loading={loading} error={error} />
            </form>
        </div>
    );
}
