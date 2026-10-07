import { create } from 'zustand'
import userServices from '../services/userServices'

export const useUserStore = create((set) => ({
    username:"",
    id: "",
    actions: {
        sendUserData: async (username, password) => {
                return userServices
                .logUser(username, password)
                .then((data) => {
                    set(() => ({ username: data.user.username, id: data.user._id }))
                    window.localStorage.setItem('loggedNoteappUser', JSON.stringify(data))
                    userServices.setToken(data.token)
                })
        },
        setUsername: (username) => {
            set(() => ({username}))
        },
        setId: (id) => {
            set(() => ({id}))
        },
        handleLogout: () => {
            set(() => ({ username: "" }))
        }
    }
}))

export const useUsername = () => useUserStore(state => state.username);
export const useId = () => useUserStore(state => state.id);
export const useUserActions = () => useUserStore(state => state.actions);
