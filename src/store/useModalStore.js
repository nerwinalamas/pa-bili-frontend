import { create } from "zustand";

export const ModalTypes = {
    CREATE_PRODUCT: "createProduct",
    UPDATE_PRODUCT: "updateProduct",
    DELETE_PRODUCT: "deleteProduct",
};

const useModalStore = create((set) => ({
    type: null,
    data: undefined,
    isOpen: false,
    onOpen: (type, data = undefined) => set({ isOpen: true, type, data }),
    onClose: () => set({ isOpen: false, type: null, data: undefined }),
}));

export default useModalStore;
