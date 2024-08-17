import { create } from "zustand";

// Define the store
const useStore = create((set) => ({
  users: [],
  setUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user._id === id ? { ...user, ...updatedUser } : user
      ),
    })),
  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user._id !== id),
    })),

  // Project state
  projects: [],
  setProject: (project) =>
    set((state) => ({ projects: [...state.projects, project] })),
  updateProject: (id, updatedProject) =>
    set((state) => ({
      projects: state.projects.map((project) =>
        project._id === id ? { ...project, ...updatedProject } : project
      ),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((project) => project._id !== id),
    })),

  // Podcast state
  podcasts: [],
  setPodcast: (podcast) =>
    set((state) => ({ podcasts: [...state.podcasts, podcast] })),
  updatePodcast: (id, updatedPodcast) =>
    set((state) => ({
      podcasts: state.podcasts.map((podcast) =>
        podcast._id === id ? { ...podcast, ...updatedPodcast } : podcast
      ),
    })),
  deletePodcast: (id) =>
    set((state) => ({
      podcasts: state.podcasts.filter((podcast) => podcast._id !== id),
    })),
}));

export default useStore;
