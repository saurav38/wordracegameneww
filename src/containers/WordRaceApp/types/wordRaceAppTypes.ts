export type AppStatus =
  | 'STARTED'
  | 'STOPPED'
  | 'FINISHED'
  | 'IDLE'
  | 'LOADING'
  | 'OVER';

export interface WordRaceAppState {
  /** Current status of the application, @type AppStatus */
  status: AppStatus;
  /** Current score */
  score: number;
  /** Base score to increment */
  baseScore: number;
  /** Boolean value to indicate word typed is correct or not */
  recieveCorrect: boolean;
  /** Current level */
  level: number;
}
