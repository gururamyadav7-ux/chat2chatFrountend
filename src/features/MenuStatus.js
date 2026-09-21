import { createSlice } from "@reduxjs/toolkit";

const MenuStatus = createSlice({
    name: "MenuStatus",
    initialState: {
        OpenChate: true,
        OpenStatus: false,
        OpenChanel: false,
        OpenCommunaty: false,
        OpenMeadia: false,
        OpenProfile: false,
        ModelMeadia:false
    },
    reducers: {
        setOpenChate: (state) => {
            state.OpenChate = true
            state.OpenStatus = false
            state.OpenChanel = false
            state.OpenCommunaty = false
            state.OpenMeadia = false
            state.OpenProfile = false

        },
        setOpenStatus: (state) => {
            state.OpenStatus = true
            state.OpenChate = false
            state.OpenChanel = false
            state.OpenCommunaty = false
            state.OpenMeadia = false
            state.OpenProfile = false
        },
        setOpenChanel: (state) => {
            state.OpenChanel = true
            state.OpenStatus = false
            state.OpenChate = false
            state.OpenCommunaty = false
            state.OpenMeadia = false
            state.OpenProfile = false

        },
        setOpenCommunaty: (state) => {
            state.OpenCommunaty = true
            state.OpenChanel = false
            state.OpenStatus = false
            state.OpenChate = false
            state.OpenMeadia = false
            state.OpenProfile = false
        },
        setOpenMeadia: (state) => {
            state.OpenMeadia = true
            state.OpenCommunaty = false
            state.OpenChanel = false
            state.OpenStatus = false
            state.OpenChate = true
            state.OpenProfile = false
        },
        setModelMeadia:(state)=>{
            state.ModelMeadia=false
            state.OpenMeadia=false

        },
        setOpenProfile: (state) => {
            state.OpenProfile = true
            state.OpenMeadia = false
            state.OpenCommunaty = false
            state.OpenChanel = false
            state.OpenStatus = false
            state.OpenChate = false

        },
    },

}
)

export const {
    setOpenChate,
    setOpenStatus,
    setOpenChanel,
    setOpenCommunaty,
    setOpenMeadia,
    setOpenProfile,
    setModelMeadia
} = MenuStatus.actions


export default MenuStatus.reducer