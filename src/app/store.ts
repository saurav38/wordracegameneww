import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import wordRaceAppReducer from '../containers/WordRaceApp/state/wordRaceAppSlice';
import keyboardReducer from '../features/keyboard/state/keyboardSlice';
import timerReducer from '../features/timer/state/timerSlice';
import wordStackReducer from '../features/wordStack/state/wordStackSlice';

export const store = configureStore({
  reducer: {
    keyboard: keyboardReducer,
    wordStack: wordStackReducer,
    wordRaceApp: wordRaceAppReducer,
    timer: timerReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
