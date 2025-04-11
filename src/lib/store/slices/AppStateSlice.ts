"use client";

import { createSlice } from "@reduxjs/toolkit";

export type AppState = {
    isMenuOpen: boolean;
};

const initialState: AppState = {
    isMenuOpen: false,
};

export const AppStateSlice = createSlice({
    name: "appState",
    initialState,
    reducers: {
        openMenu: (state) => {
            state.isMenuOpen = true;
        },
        closeMenu: (state) => {
            state.isMenuOpen = false;
        },
        toggleMenu: (state) => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        resetState: (state) => {
            state.isMenuOpen = false;
        },
    },
});

export const { openMenu, closeMenu, toggleMenu, resetState } =
    AppStateSlice.actions;
export default AppStateSlice.reducer;
