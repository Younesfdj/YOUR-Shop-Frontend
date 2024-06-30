import { create } from "zustand";

interface User {
  UserEmail: string;
  UserName: string;
}

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  removeUser: () => void;
};

// read from the "user" local storage
const initState = JSON.parse(localStorage.getItem("user") || "null");

const useUser = create<UserState>((set) => ({
  user: initState,
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    return set({ user });
  },
  removeUser: () => {
    localStorage.removeItem("user");
    return set({ user: null });
  },
}));

export default useUser;
