import axios from 'axios';

import { Api } from "./apiClass";
import config from "../config.json";

const api = new Api();

export const uploadImage = (file: File, onProgress: (percent: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);

    return axios.post(`${config.API}uploads/image`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${api.getToken()}`,
        },

        onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));

            onProgress(percent);
        },
    });
};
