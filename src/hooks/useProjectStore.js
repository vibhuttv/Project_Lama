import { create } from "zustand";

const useProjectStore = create((set) => ({
  projects: [],
  loading: true,
  seen: false,
  userId: null,

  setProjects: (projects) => set({ projects }),

  fetchProjectById: async (id) => {
    try {
      const response = await fetch(`/api/project/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch project");
      }
      const project = await response.json();
      set((state) => ({
        projects: [...state.projects.filter((p) => p._id !== id), project],
      }));
      return project;
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    }
  },

  getProjectById: (id) => {
    return set((state) => state.projects.find((project) => project._id === id));
  },

  setLoading: (loading) => set({ loading }),
  togglePop: () => set((state) => ({ seen: !state.seen })),
  setUserId: (userId) => set({ userId }),

  addProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
}));

export default useProjectStore;
