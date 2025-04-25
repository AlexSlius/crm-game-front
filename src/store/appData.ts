import { create } from 'zustand';

interface AppDataStore {
    user: any,
    roles: any[];
    statuses: any[];
    setData: (data: Partial<AppDataStore>) => void;
}

export const useAppData = create<AppDataStore>((set) => ({
    user: null,
    roles: [],
    statuses: [],
    setData: (data) => set((state) => ({
        ...state,
        ...data,
    }))
}));
