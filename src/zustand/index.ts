import { create } from "zustand";

type Store = {
  snkModal: boolean;
  snkToggle: () => void;
};

export default create<Store>()((set) => ({
  snkModal: false,
  snkToggle: () => set((state) => ({ snkModal: !state.snkModal })),
}));
