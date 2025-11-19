    export const safeDate = (iso?: string): string => {
    if (!iso) return '';
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('ru-RU'); // 19.11.2025
    };