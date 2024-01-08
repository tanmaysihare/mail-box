import { createSlice } from "@reduxjs/toolkit";
  const composeSlice = createSlice({
    name: 'compose',
    initialState: {
        isComposeOpen : false,
        selectedMassage:null,
    },
    reducers:{
        openCompose(state){
            state.isComposeOpen = true;
        },
        closeCompose(state){
            state.isComposeOpen = false;
        },
        openMessage:(state,action) => {
            state.selectedMassage = action.payload;
        },
    },
  });
  export const composeActions = composeSlice.actions;
  export default composeSlice.reducer;