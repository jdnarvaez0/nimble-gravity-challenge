import { useFetch } from '../../hooks/useFetch';
import { getCandidateByEmail } from '../../services/api';
import type { Candidate } from '../../types';

// Hook especifico para manejar la busqueda de candidatos
export function useCandidate() {
    const { data: candidate, loading, error, execute } = useFetch<Candidate>();

    const searchCandidate = async (email: string) => {
        await execute(() => getCandidateByEmail(email));
    };

    return {
        candidate,
        loading,
        error,
        searchCandidate,
    };
}
