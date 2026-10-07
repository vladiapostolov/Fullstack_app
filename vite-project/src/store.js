import { create } from 'zustand'
import noteServices from '../services/noteServices'

export const useNotesStore = create((set) => ({
    notes: [],
    actions: {
        add: async (note) => {
            const note_ = await noteServices.sendUserNote(note);
            set(state => ({ notes: [state.notes.concat(note_)]} ))
        },
        initialize: async (user) => {
            const newNotes = await noteServices.getUserNotes(user);
            set(() => ({notes: newNotes}))
        },
        updateNote: (note) => {
            noteServices.updateNote(note)
            .then((updated) => {
                set(state => ({notes: state.notes.map(note => note._id === updated._id ? 
                    updated : note
                )}))
            })
        },
        deleteNote: (note) => {
            noteServices.deleteNote(note).then(() =>{
                set((state) => ({notes: state.notes.filter((note_) =>
                                    note_._id !== note._id)
            }))
            })
        }
    }
}))

export const useNotes = () => useNotesStore(state => state.notes);
export const useNotesActions = (() => useNotesStore(state => state.actions));
