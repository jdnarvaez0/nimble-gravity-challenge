import { useFetch } from './useFetch';
import { getJobs } from '../services/api';
import type { Job } from '../types';

export function useJobs() {
    const { data: jobs, loading, error, execute } = useFetch<Job[]>();

    const fetchJobs = async () => {
        await execute(() => getJobs());
    };

    return {
        jobs,
        loading,
        error,
        fetchJobs,
    };
}
