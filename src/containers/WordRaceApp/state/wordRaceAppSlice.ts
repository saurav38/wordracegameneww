/* eslint-disable no-param-reassign */
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { AppStatus, WordRaceAppState } from '../types/wordRaceAppTypes';

const recieveAppStatusReducer: CaseReducer<
  WordRaceAppState,
  PayloadAction<AppStatus>
> = (state, action) => {
  state.status = action.payload;
};

const incrementScoreReducer: CaseReducer<
  WordRaceAppState,
  PayloadAction<number>
> = (state, action) => {
  state.score += action.payload;
};

const decrementScoreReducer: CaseReducer<
  WordRaceAppState,
  PayloadAction<number>
> = (state, action) => {
  state.score -= action.payload;
};

const resetScoreReducer: CaseReducer<WordRaceAppState> = (state) => {
  state.score = 0;
};

const recieveCorrectReducer: CaseReducer<
  WordRaceAppState,
  PayloadAction<boolean>
> = (state, action) => {
  state.recieveCorrect = action.payload;
};

const setLevelReducer: CaseReducer<WordRaceAppState, PayloadAction<number>> = (
  state,
  action,
) => {
  state.level = action.payload;
};
const initialState = {
  status: 'IDLE',
  score: 0,
  baseScore: 10,
  recieveCorrect: false,
  level: 1,
} as WordRaceAppState;

export const slice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    recieveAppStatus: recieveAppStatusReducer,
    incrementScore: incrementScoreReducer,
    decrementScore: decrementScoreReducer,
    resetScore: resetScoreReducer,
    recieveCorrect: recieveCorrectReducer,
    setLevel: setLevelReducer,
  },
});

export const {
  recieveAppStatus,
  incrementScore,
  decrementScore,
  resetScore,
  recieveCorrect,
  setLevel,
} = slice.actions;

export const selectStatus = (state: RootState) => state.wordRaceApp.status;
export const selectScore = (state: RootState) => state.wordRaceApp.score;
export const selectBaseScore = (state: RootState) =>
  state.wordRaceApp.baseScore;
export const selectRecieveCorrect = (state: RootState) =>
  state.wordRaceApp.recieveCorrect;
export const selectLevel = (state: RootState) => state.wordRaceApp.level;

export default slice.reducer;
