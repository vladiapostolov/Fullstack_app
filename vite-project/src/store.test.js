import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('../services/noteServices');

import noteService from '../services/noteServices'
import { useNotesStore, useNotes, useNotesActions } from './store'

beforeEach(() => {
    useNotesStore.setState({notes: []});
    vi.clearAllMocks();
})

describe('testing notes',  () => {
    it('initialize loads notes from service',async () => {
        const mockNote = [{text: "meow", important: true}];
        const mockUser = {_id: "me"};
        noteService.getUserNotes.mockResolvedValue(mockNote);

        const { result } = renderHook(() => useNotesActions());
        await act(async ()=>{
            await result.current.initialize(mockUser);
        })

        const {result: notesResult} = renderHook(() => useNotes());
        expect(notesResult.current).toEqual(mockNote);
    })

    it('add note from service', async () => {
        const mockNote = [{text:"me", important: true}];
        noteService.sendUserNote.mockResolvedValue(mockNote);

        const {result} = renderHook(() => useNotesActions());
        await act(async () => {
            await result.current.add(mockNote);
        })

        const {result: notesResult} = renderHook(() => useNotes());
        expect(notesResult.current).toEqual(mockNote);

    })
})