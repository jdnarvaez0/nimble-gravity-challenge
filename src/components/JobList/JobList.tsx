import { useEffect } from 'react';
import { useJobs } from '../../hooks/useJobs';
import JobItem from '../JobItem';
import type { Candidate } from '../../types';
import styles from './JobList.module.css';

interface JobListProps {
    candidate: Candidate;
}

export default function JobList({ candidate }: JobListProps) {
    const { jobs, loading, error, fetchJobs } = useJobs();

    useEffect(() => {
        fetchJobs();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Cargando trabajos...</div>;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }

    if (!jobs || jobs.length === 0) {
        return <div className={styles.empty}>No hay trabajos disponibles</div>;
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Hola {candidate.firstName}, estas son las posiciones disponibles</h2>
            <div className={styles.list}>
                {jobs.map((job) => (
                    <JobItem key={job.id} job={job} candidate={candidate} />
                ))}
            </div>
        </div>
    );
}
