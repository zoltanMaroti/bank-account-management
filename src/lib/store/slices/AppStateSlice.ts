"use client";

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

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
        openMenu: (state, action: PayloadAction<boolean | undefined>) => {
            state.isMenuOpen = true;
        },
        closeMenu: (state, action: PayloadAction<boolean | undefined>) => {
            state.isMenuOpen = false;
        },
        resetState: (state) => {
            state.isMenuOpen = false;
        },
    },
});

export const { openMenu, closeMenu, resetState } = AppStateSlice.actions;
export default AppStateSlice.reducer;
