import { create } from "zustand";

interface ModalChangePasswordState {
    isOpenModalChange: boolean;
    openModalChange: () => void;
    closeModalChange: () => void;
}

export const useModalChangePasswordStore = create<ModalChangePasswordState>((set) => ({
    isOpenModalChange: false,
    openModalChange: () => set({ isOpenModalChange: true }),
    closeModalChange: () => set({ isOpenModalChange: false }),
}));