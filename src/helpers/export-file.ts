import config from "../config.json";
import { Api } from "../api/apiClass";

const api = new Api();

export const handleExportFile = async (queries?: string, setLoad?: any) => {
    setLoad(true);

    try {
        const response = await fetch(`${config.API}teams/export${queries ?? ''}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${api.getToken()}`,
            },
        });

        if (!response.ok) throw new Error('Помилка при експорті');

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'teams.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        setLoad(false);
    } catch (error) {
        console.error('Export error:', error);

        setLoad(false);
    }
};