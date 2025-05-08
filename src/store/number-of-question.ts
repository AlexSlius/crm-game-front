import { create } from "zustand";

interface NumberOfQuestionState {
    quntity: number;
    record: (value: number) => void;
}

export const useNumberOfQuestionStore = create<NumberOfQuestionState>((set) => ({
    quntity: 0,
    record: (value: number) => set({ quntity: value }),
}));