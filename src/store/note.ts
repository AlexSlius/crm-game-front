import { create } from "zustand";

type typeNote = "error" | "info" | "success" | "warning" | undefined;

interface NoteState {
    message: string;
    type: typeNote;
    setMessage: (message: string, type?: typeNote) => void;
    cleanMessage: () => void;
}

export const useNoteStore = create<NoteState>((set) => ({
    message: '',
    type: 'error',
    setMessage: (message, type) => set({ message, ...(type?.length ? { type } : { type: "error" }) }),
    cleanMessage: () => set({ message: '' }),
}));
