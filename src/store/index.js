import { configureStore, createSlice } from "@reduxjs/toolkit";

/**
 * Secret key slice
 */

const initialSecretKeyState = { key: 1234 };

const secretKeySlice = createSlice({
  name: "secretKey",
  initialState: initialSecretKeyState,
  reducers: {
    generateKey(state) {
      state.key = Math.floor(1000 + Math.random() * 9000);
    },
  },
});

/**
 * Enable row slice
 * enableRow represent the row that must be enabled
 */

const initialEnableRowState = { enableRow: 0 };
const enableRowSlice = createSlice({
  name: "rowSlice",
  initialState: initialEnableRowState,
  reducers: {
    enableNextRow(state) {
      state.enableRow = state.enableRow + 1;
    },

    resetEnableRows(state) {
      Object.assign(state,initialEnableRowState);
    },
  },
});

/**
 * Circles color Slice
 */

const initialCirclesColorState = {
  row0: {
    c0: "none",
    c1: "none",
    c2: "none",
    c3: "none",
  },
  row1: {
    c0: "none",
    c1: "none",
    c2: "none",
    c3: "none",
  },
  row2: {
    c0: "none",
    c1: "none",
    c2: "none",
    c3: "none",
  },
  row3: {
    c0: "none",
    c1: "none",
    c2: "none",
    c3: "none",
  },
  row4: {
    c0: "none",
    c1: "none",
    c2: "none",
    c3: "none",
  },
  row5: {
    c0: "none",
    c1: "none",
    c2: "none",
    c3: "none",
  },
  row6: {
    c0: "none",
    c1: "none",
    c2: "none",
    c3: "none",
  },
  row7: {
    c0: "none",
    c1: "none",
    c2: "none",
    c3: "none",
  },
};

const circlesColorSlice = createSlice({
  name: "circlesSlice",
  initialState: initialCirclesColorState,
  reducers: {
    circle0Color(state, colorData) {
      state[colorData.payload[1]].c0 = colorData.payload[0];
    },
    circle1Color(state, colorData) {
      state[colorData.payload[1]].c1 = colorData.payload[0];
    },
    circle2Color(state, colorData) {
      state[colorData.payload[1]].c2 = colorData.payload[0];
    },
    circle3Color(state, colorData) {
      state[colorData.payload[1]].c3 = colorData.payload[0];
    },
    resetCircles(state){
      // Reassign circles color to the initial state which is none for all circles
      console.log("Inside INDEXJS initial staTE: => "+initialCirclesColorState.row0.c0);
      Object.assign(state,initialCirclesColorState);
    }
  }
});

/**
 * start and end game slice
 */
const initialStartState ={endGame:false, result:"You lost"};
const startSlice = createSlice({
  name:'startSlice',
  initialState:initialStartState,
  reducers:{
    endGameByAttempts(state){
      state.endGame=true;
      state.result="You lost";
    },
    endGameByUser(state){
      state.endGame=true;
      state.result="You won";
    },
    startNewGame(state){
      state.endGame=false;
    }
  }
})

/**
 * Configure Store
 */

const store = configureStore({
  reducer: {
    secretKey: secretKeySlice.reducer,
    rowSlice: enableRowSlice.reducer,
    circlesSlice: circlesColorSlice.reducer,
    startSlice: startSlice.reducer
  },
});

export const secretKeyAction = secretKeySlice.actions;
export const enableRowAction = enableRowSlice.actions;
export const circlesColorAction = circlesColorSlice.actions;
export const startAction = startSlice.actions;

export default store;
