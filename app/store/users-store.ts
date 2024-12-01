import { create } from 'zustand';

interface User {
  _id: string;
}

interface UserStore {
  loggedInUserData: User | null;
  setLoggedInUserData: (data: User) => void;
}

const usersGlobalStore = create<UserStore>((set) => ({
  loggedInUserData: null,
  setLoggedInUserData: (data: User) => set({ loggedInUserData: data }),
}));

export default usersGlobalStore;

// import { create } from 'zustand';


// const usersGlobalStore = create((set) => ({

//     loggedInUserData: null,
//     setLoggedInUserData: (data: any) => set({loggedInUserData: data})

// }));


// export default usersGlobalStore;