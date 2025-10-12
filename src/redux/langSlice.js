import { createSlice } from '@reduxjs/toolkit';

import ar from "../local/ar";
import en from "../local/en";

const langSlice = createSlice({
    name: "language",
    initialState:{
        lang: "EN",
        content: en
    },
    reducers: {
        toggleLang: (state) => {
            if(state.lang === "EN"){
                state.lang = "AR"
                state.content = ar
            }else{
                state.lang = "EN"
                state.content = en
            }
        }
    }
})

export const {toggleLang} = langSlice.actions;
export default langSlice.reducer;
