import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';

export function useApiData<T>(path: string, fallback: T) {
    const [data, setData] = useState<T>(fallback);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}${path}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }
                return response.json();
            })
            .then((result) => setData(result))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path]);

    return { data, loading, error };
}
