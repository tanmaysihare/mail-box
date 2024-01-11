import { createSlice } from "@reduxjs/toolkit";
  const composeSlice = createSlice({
    name: 'compose',
    initialState: {
        isComposeOpen : false,
        selectedMassage:null,
        docId:null,
        isActive:false,
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
        docId:(state,action)=>{
            state.docId = action.payload;
        },
        isActiveTrue(state){
            state.isActive = true;
        },
        isActiveFalse(state){
            state.isActive = false;
        },
    },
  });
  export const composeActions = composeSlice.actions;
  export default composeSlice.reducer;