import { create } from 'zustand';

interface useStoreModalStore {
  isModalOpen: boolean;
  onModalOpenAction: () => void;
  onModalCloseAction: () => void;
}

// this is a store that manages the state of the modal
// it knows the state of the modal
// when we open the modal, we set the state to true
// when we close the modal, we set the state to false
export const useStoreModal = create<useStoreModalStore>((set) => ({
  isModalOpen: false,
  onModalOpenAction: () => set({ isModalOpen: true }),
  onModalCloseAction: () => set({ isModalOpen: false }),
}));
