import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
    name: 'page',
    initialState: {
        list: ['/', '/auth', '/user', '/config', '/layer', '/art', '/chain', '/mint'],
        index: 0,
        canContinue: true,
        curr: '/',
        next: '/auth',
        prev: null,
    },
    reducers: {
        nextPage: (state) => {
            if (state.next) {
                state.prev = state.curr
                state.curr = state.next
                state.index++
                state.next = state.index < state.list.length - 1 ? state.list[state.index + 1] : null
            }
        },
        prevPage: (state) => {
            if (state.prev) {
                state.next = state.curr
                state.curr = state.prev
                state.index--
                state.prev = state.index > 0 ? state.list[state.index - 1] : null
            }
        },
        setCanContinue: (state, action) => {
            state.canContinue = action.payload
        }

    }
});

export const { prevPage, nextPage, setCanContinue } = pageSlice.actions;

export default pageSlice;