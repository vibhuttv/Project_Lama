import create from "zustand";

const useAuthStore = create((set) => ({
  isLogin: true,
  error: null,

  toggleLogin: () => set((state) => ({ isLogin: !state.isLogin })),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
