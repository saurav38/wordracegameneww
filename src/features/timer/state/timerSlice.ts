/* eslint-disable no-param-reassign */
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { TimerState } from '../types/timerTypes';

const shouldStartTimerReducer: CaseReducer<
  TimerState,
  PayloadAction<boolean>
> = (state, action: PayloadAction<boolean>) => {
  state.shouldStart = action.payload;
};
const shouldPauseTimerReducer: CaseReducer<
  TimerState,
  PayloadAction<boolean>
> = (state, action: PayloadAction<boolean>) => {
  state.shouldPause = action.payload;
};
const shouldStopTimerReducer: CaseReducer<
  TimerState,
  PayloadAction<boolean>
> = (state, action: PayloadAction<boolean>) => {
  state.shouldStop = action.payload;
};
const setInitTimeReducer: CaseReducer<TimerState, PayloadAction<number>> = (
  state,
  action: PayloadAction<number>,
) => {
  state.initialTime = action.payload;
};
const setIntervalReducer: CaseReducer<TimerState, PayloadAction<number>> = (
  state,
  action: PayloadAction<number>,
) => {
  state.interval = action.payload;
};

const initialState = {
  shouldStart: false,
  shouldPause: false,
  shouldStop: false,
  currentTime: 0,
  initialTime: 0,
  timerType: 'INCREMENTAL',
  interval: 10,
  status: 'STOPPED',
} as TimerState;
export const slice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    shouldStartTimer: shouldStartTimerReducer,
    shouldPauseTimer: shouldPauseTimerReducer,
    shouldStopTimer: shouldStopTimerReducer,
    setInitTime: setInitTimeReducer,
    setIntervalTimer: setIntervalReducer,
  },
});

export const {
  shouldStartTimer,
  shouldPauseTimer,
  shouldStopTimer,
  setInitTime,
  setIntervalTimer,
} = slice.actions;

export const selectCurrentWord = (state: RootState) => state.timer.status;

export const selectCurrentTime = (state: RootState) => state.timer.currentTime;

export const selectShouldStart = (state: RootState) => state.timer.shouldStart;

export const selectShouldStop = (state: RootState) => state.timer.shouldStop;

export const selectShouldPause = (state: RootState) => state.timer.shouldPause;

export const selectInterval = (state: RootState) => state.timer.interval;

export default slice.reducer;
