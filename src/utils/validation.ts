// Valida que sea una URL de GitHub válida
export function isValidGitHubUrl(url: string): boolean {
    try {
        const parsed = new URL(url);
        // Debe ser https://github.com/usuario/repo
        return parsed.hostname === 'github.com' && 
               parsed.pathname.split('/').filter(Boolean).length >= 2;
    } catch {
        return false;
    }
}

// Mensaje de error específico
export function getGitHubUrlError(url: string): string | null {
    if (!url) return null;
    if (!url.startsWith('https://')) {
        return 'La URL debe comenzar con https://';
    }
    if (!url.includes('github.com')) {
        return 'La URL debe ser de GitHub (github.com)';
    }
    if (!isValidGitHubUrl(url)) {
        return 'Formato inválido. Use: https://github.com/usuario/repo';
    }
    return null;
}
