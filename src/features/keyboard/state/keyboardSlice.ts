/* eslint-disable no-param-reassign */
import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { KeyboardState } from '../types/keyboardTypes';

const setKeyReducer: CaseReducer<KeyboardState, PayloadAction<string>> = (
  state,
  action: PayloadAction<string>,
) => {
  state.keyPressed = action.payload;
};

const keyCountReducer: CaseReducer<KeyboardState, PayloadAction<number>> = (
  state,
  action: PayloadAction<number>,
) => {
  state.keyCount = action.payload;
};

const initialState = { keyPressed: '', keyCount: 0 } as KeyboardState;
export const slice = createSlice({
  name: 'keyboard',
  initialState,
  reducers: {
    setKey: setKeyReducer,
    setKeyCount: keyCountReducer,
  },
});

export const { setKey, setKeyCount } = slice.actions;

export const selectKeyPressed = (state: RootState) => state.keyboard.keyPressed;
export const selectKeyCount = (state: RootState) => state.keyboard.keyCount;

export default slice.reducer;
