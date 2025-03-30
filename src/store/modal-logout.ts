import { create } from "zustand";

interface ModalLogoutState {
    isOpenModal: boolean;
    openModal: () => void;
    closeModal: () => void;
}

export const useModalLogoutStore = create<ModalLogoutState>((set) => ({
    isOpenModal: false,
    openModal: () => set({ isOpenModal: true }),
    closeModal: () => set({ isOpenModal: false }),
}));