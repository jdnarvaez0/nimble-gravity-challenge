import { useFetch } from './useFetch';
import { applyToJob } from '../services/api';
import type { ApplicationPayload, ApiResponse } from '../types';

export function useApply() {
    const { data: response, loading, error, execute } = useFetch<ApiResponse>();

    const submitApplication = async (payload: ApplicationPayload) => {
        await execute(() => applyToJob(payload));
    };

    return {
        response,
        loading,
        error,
        submitApplication,
    };
}
