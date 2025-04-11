import { configureStore } from "@reduxjs/toolkit";
import AppStateSlice from "@/lib/store/slices/AppStateSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            appState: AppStateSlice,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
