import type { ApplicationPayload } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL;

// Lee el mensaje de error del body de la respuesta
async function getErrorMessage(response: Response): Promise<string> {
    try {
        const data = await response.json();
        // La API devuelve el mensaje en diferentes formatos posibles
        return data.message || data.error || `Error ${response.status}: ${response.statusText}`;
    } catch {
        // Si no puede parsear el JSON, usa el statusText
        return `Error ${response.status}: ${response.statusText}`;
    }
}

export async function getCandidateByEmail(email: string) {
    const url = `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`;

    const response = await fetch(url);

    if (!response.ok) {
        const text = await response.text();
        console.error('Error response body:', text);
        throw new Error(text || `Error ${response.status}`);
    }

    return response.json();
}

export async function getJobs() {
    const url = `${BASE_URL}/api/jobs/get-list`;

    const response = await fetch(url);

    if (!response.ok) {
        const message = await getErrorMessage(response);
        throw new Error(message);
    }

    return response.json();
}

export async function applyToJob(payload: ApplicationPayload) {
    const url = `${BASE_URL}/api/candidate/apply-to-job`;
    
    const bodyString = JSON.stringify(payload);
    console.log('Request URL:', url);
    console.log('Request body:', bodyString);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: bodyString,
    });

    if (!response.ok) {
        const text = await response.text();
        console.error('Error response:', text);
        throw new Error(text || `Error ${response.status}`);
    }

    return response.json();
}
