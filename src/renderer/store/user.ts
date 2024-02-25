import { create } from 'zustand';

type User = {
    name: string;
    id: string;
};

interface UserStore {
    users: User[];
    currentUser: User;
    setCurrentUser: (payload: User) => void;
    setUsers: (payload: User[]) => void;
}

const useUserStore = create<UserStore>((set) => ({
    users: [],
    currentUser: {
        name: '',
        id: '',
    },
    setCurrentUser: (payload: User) =>
        set({
            currentUser: payload,
        }),
    setUsers: (payload: User[]) => set({ users: payload }),
}));

export default useUserStore;
