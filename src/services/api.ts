import type { ApplicationPayload } from '../types';

const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

// Funcion para obtener los datos del candidato por email
export async function getCandidateByEmail(email: string) {
    const url = `${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error al obtener candidato: ${response.status}`);
    }

    return response.json();
}

// Funcion para obtener la lista de trabajos
export async function getJobs() {
    const url = `${BASE_URL}/api/jobs/get-list`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Error al obtener trabajos: ${response.status}`);
    }

    return response.json();
}

// Funcion para enviar la postulacion a un trabajo
export async function applyToJob(payload: ApplicationPayload) {
    const url = `${BASE_URL}/api/candidate/apply-to-job`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Error al aplicar al trabajo: ${response.status}`);
    }

    return response.json();
}
