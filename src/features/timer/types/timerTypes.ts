type TimerType = 'INCREMENTAL' | 'DECREMENTAL';
export interface TimerState {
  /** Dispatch to start the timer, remember to cleanup */
  shouldStart: boolean;
  /** Dispatch to pause the timer, remember to cleanup */
  shouldPause: boolean;
  /** Dispatch to stop the timer, remember to cleanup */
  shouldStop: boolean;
  /** Current time in the timer */
  currentTime: number;
  /** What time to initialize timer on */
  initialTime: number;
  /** INCREMENTAL or DECREMENTAL */
  timerType: TimerType;
  /** Interval to render out new words */
  interval: number;
  /** Status of the timer */
  status: string;
}
