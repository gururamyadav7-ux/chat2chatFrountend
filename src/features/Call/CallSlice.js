import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import api from "../../refreshTokenLogic/refreshToken"
// ==========================================
// CREATE CALL
// ==========================================

export const createCall = createAsyncThunk(
    "call/createCall",
    async (
        { receiverId, type },
        { rejectWithValue }
    ) => {
        try {
            const res = await api.post(
                "/call",
                {
                    receiverId,
                    type,
                }
            );

            return res.data.call;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Call failed"
            );
        }
    }
);

// ==========================================
// ACCEPT
// ==========================================

export const acceptCall = createAsyncThunk(
    "call/acceptCall",
    async (
        callId,
        { rejectWithValue }
    ) => {
        try {
            const res = await api.put(
                `/call/${callId}/accept`
            );

            return res.data.call;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Accept call failed"
            );
        }
    }
);

// ==========================================
// REJECT
// ==========================================

export const rejectCall = createAsyncThunk(
    "call/rejectCall",
    async (
        callId,
        { rejectWithValue }
    ) => {
        try {
            const res = await api.put(
                `/call/${callId}/reject`
            );

            return res.data.call;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "Reject call failed"
            );
        }
    }
);

// ==========================================
// END
// ==========================================

export const endCall = createAsyncThunk(
    "call/endCall",
    async (
        callId,
        { rejectWithValue }
    ) => {
        try {
            const res = await api.put(
                `/call/${callId}/end`
            );

            return res.data.call;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                "End call failed"
            );
        }
    }
);

// ==========================================
// STATE
// ==========================================

const initialState = {
    status: "idle",

    callId: null,

    type: null,

    callerId: null,

    receiverId: null,

    caller: null,

    incoming: false,

    outgoing: false,

    active: false,

    accepted: false,

    muted: false,

    cameraEnabled: true,

    remoteMuted: false,

    remoteCameraEnabled: true,

    errorCall: null,
};

// ==========================================
// SLICE
// ==========================================

const callSlice = createSlice({
    name: "call",

    initialState,

    reducers: {
        // ---------------------------------------
        // INCOMING
        // ---------------------------------------

        incomingCall: (state, action) => {
            state.callId =
                action.payload.callId;

            state.type =
                action.payload.type;

            state.callerId =
                action.payload.callerId;

            state.receiverId =
                action.payload.receiverId;

            state.caller =
                action.payload.caller;

            state.incoming = true;
            state.outgoing = false;
            state.active = false;
            state.accepted = false;

            state.status = "incoming";
        },

        // ---------------------------------------
        // OUTGOING
        // ---------------------------------------

        outgoingCall: (state, action) => {
            state.callId =
                action.payload.callId;

            state.type =
                action.payload.type;

            state.callerId =
                action.payload.callerId;

            state.receiverId =
                action.payload.receiverId;

            state.caller =
                action.payload.caller;

            state.outgoing = true;
            state.incoming = false;
            state.active = false;
            state.accepted = false;

            state.status = "calling";
        },

        // ---------------------------------------
        // ACCEPT LOCAL
        // ---------------------------------------

        callAccepted: (state) => {
            state.incoming = false;
            state.outgoing = false;
            state.active = true;
            state.accepted = true;

            state.status = "active";
        },

        // ---------------------------------------
        // REJECT LOCAL
        // ---------------------------------------

        callRejected: (state) => {
            state.incoming = false;
            state.outgoing = false;
            state.active = false;
            state.accepted = false;

            state.status = "rejected";
        },

        // ---------------------------------------
        // CALL ENDED
        // ---------------------------------------

        callEnded: (state) => {
            state.incoming = false;
            state.outgoing = false;
            state.active = false;
            state.accepted = false;

            state.status = "ended";

            state.callId = null;
        },

        // ---------------------------------------
        // MUTE
        // ---------------------------------------

        setMuted: (state, action) => {
            state.muted =
                action.payload;
        },

        // ---------------------------------------
        // CAMERA
        // ---------------------------------------

        setCameraEnabled: (
            state,
            action
        ) => {
            state.cameraEnabled =
                action.payload;
        },

        // ---------------------------------------
        // REMOTE MUTE
        // ---------------------------------------

        setRemoteMuted: (
            state,
            action
        ) => {
            state.remoteMuted =
                action.payload;
        },

        // ---------------------------------------
        // REMOTE CAMERA
        // ---------------------------------------

        setRemoteCameraEnabled: (
            state,
            action
        ) => {
            state.remoteCameraEnabled =
                action.payload;
        },

        // ---------------------------------------
        // RESET
        // ---------------------------------------

        resetCall: () => initialState,
    },

    extraReducers: (builder) => {
        builder

            .addCase(
                createCall.fulfilled,
                (state, action) => {
                    state.callId =
                        action.payload._id;
                }
            )

            .addCase(
                createCall.rejected,
                (state, action) => {
                    state.error =
                        action.payload;
                }
            )

            .addCase(
                acceptCall.fulfilled,
                (state) => {
                    state.incoming = false;
                    state.active = true;
                    state.accepted = true;
                    state.status = "active";
                }
            )

            .addCase(
                rejectCall.fulfilled,
                (state) => {
                    state.incoming = false;
                    state.status = "rejected";
                }
            )

            .addCase(
                endCall.fulfilled,
                (state) => {
                    state.active = false;
                    state.status = "ended";
                    state.callId = null;
                }
            );
    },
});

export const {
    incomingCall,
    outgoingCall,
    callAccepted,
    callRejected,
    callEnded,
    setMuted,
    setCameraEnabled,
    setRemoteMuted,
    setRemoteCameraEnabled,
    resetCall,
} = callSlice.actions;

export default callSlice.reducer;