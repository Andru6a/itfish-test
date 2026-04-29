import { create } from "zustand";

type Post = { id: number; title: string; body: string; userId: number };

type Store = {
  login: string;
  posts: Post[];
  setLogin: (login: string) => void;
  setPosts: (posts: Post[]) => void;
};

export const useStore = create<Store>((set) => ({
  login: "",
  posts: [],
  setLogin: (login) => set({ login }),
  setPosts: (posts) => set({ posts }),
}));
