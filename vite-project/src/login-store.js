import { create } from 'zustand'

export const useLoginStore = create((set) => ({
    username: "",
    password: "",
    actions: {
        handleUsername: (e) => {
            set(() => ({ username: e.target.value }))
        },
        handlePassword: (e) => {
            set(() => ({ password: e.target.value }))
        },
        reset: () => {
            set(() => ({ username: "", password: "" }))
        }
    }
}))

export const useLoginUsername = () => useLoginStore(state => state.username);
export const useLoginPassword = () => useLoginStore(state => state.password);
export const useLoginActions = () => useLoginStore(state => state.actions);
