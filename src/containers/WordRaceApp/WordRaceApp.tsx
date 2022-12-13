import React, { useEffect } from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import useSound from 'use-sound';

import logo from '../../logo.svg';
import styles from './WordRaceApp.module.scss';
import Keyboard from '../../features/keyboard/Keyboard';
import WordStack from '../../features/wordStack/WordStack';

import { useAppSelector } from '../../app/hooks';
import {
  incrementScore,
  recieveAppStatus,
  recieveCorrect,
  selectBaseScore,
  selectLevel,
  selectRecieveCorrect,
  selectScore,
  selectStatus,
  setLevel,
} from './state/wordRaceAppSlice';
import Timer from '../../features/timer/Timer';
import {
  setKey,
  setKeyCount,
} from '../../features/keyboard/state/keyboardSlice';
import {
  changeWord,
  randomizeWordArray,
  selectMaxWordStackLength,
  selectWordIndex,
  selectWordStackLength,
  setCharacter,
  setMaxWordStackLength,
  setWordIndex,
  setWordStackLength,
} from '../../features/wordStack/state/wordStackSlice';
import {
  setIntervalTimer,
  shouldStopTimer,
} from '../../features/timer/state/timerSlice';
/** Initialize sound effects */
const warningSound = require('../../assets/sounds/warning.mp3');
const failedSound = require('../../assets/sounds/failed.mp3');
const successSound = require('../../assets/sounds/countdown.mp3');

function WordRaceApp() {
  /** Initialize selectors */
  const score = useAppSelector(selectScore);
  const baseScore = useAppSelector(selectBaseScore);
  const status = useAppSelector(selectStatus);
  const triggerCorrect = useAppSelector(selectRecieveCorrect);
  const wordIndexValue = useAppSelector(selectWordIndex);
  const wordStackLength = useAppSelector(selectWordStackLength);
  const maxWordStackLength = useAppSelector(selectMaxWordStackLength);
  const currentLevel = useAppSelector(selectLevel);

  const dispatch = useDispatch();

  const [playFailed] = useSound(failedSound, {
    volume: 0.75,
  });
  const [playWarning, { pause }] = useSound(warningSound, {
    volume: 0.75,
    interrupt: true,
  });
  const [playSuccess] = useSound(successSound, {
    volume: 0.75,
  });
  useEffect(() => {
    /** If the status is over, reset scores, play the sound effect */
    switch (status) {
      case 'OVER':
      case 'FINISHED':
        dispatch(setKey(''));
        dispatch(setKeyCount(0));
        dispatch(setCharacter(0));
        dispatch(setWordIndex(1));
        dispatch(setWordStackLength(0));
        dispatch(shouldStopTimer(true));
        dispatch(setMaxWordStackLength(0));
        dispatch(randomizeWordArray());
        pause();
        if (status === 'OVER') {
          playFailed();
        } else {
          playSuccess();
        }
        break;
      default:
        break;
    }
  }, [status]);

  /** Recieve the status of the word typed from Keyboard.tsx */
  useEffect(() => {
    if (triggerCorrect) {
      /** Set the next word */
      const nextWordCount = wordIndexValue + 1;
      dispatch(setWordIndex(nextWordCount));
      dispatch(setKey(''));
      dispatch(changeWord(nextWordCount));
      dispatch(setKeyCount(0));
      dispatch(setCharacter(0));
      /** The score is calculated on the basis of a base score, decremented by word stack length,
       * multiplied by the the number of words typed added with the current level */
      const scoreToIncrement =
        (baseScore - wordStackLength) * (wordIndexValue + currentLevel);
      dispatch(incrementScore(scoreToIncrement));

      /** Handle leveling upto level 5 */
      switch (wordIndexValue) {
        case 5:
          dispatch(setLevel(2));
          dispatch(setIntervalTimer(7));
          break;
        case 10:
          dispatch(setLevel(3));
          dispatch(setIntervalTimer(5));
          break;
        case 15:
          dispatch(setLevel(4));
          dispatch(setIntervalTimer(3));
          break;
        case 20:
          dispatch(setLevel(5));
          dispatch(setIntervalTimer(2));
          break;
        case 25:
          dispatch(recieveAppStatus('FINISHED'));
          break;
        default:
          break;
      }
    }

    /** Reset status of isCorrect to false */
    return () => {
      dispatch(recieveCorrect(false));
    };
  }, [triggerCorrect]);

  /** Play warning sound to alert user that stack is almost done, hurry! */
  useEffect(() => {
    if (maxWordStackLength === 3 || maxWordStackLength === 2) {
      playWarning();
    }
  }, [maxWordStackLength]);

  return (
    <div className="flex-column">
      <main className={cx(styles.main)}>
        <div className={cx(styles.header, 'frosted-glass', 'flex-row')}>
          <h1>
            Word Race!
            <img src={logo} className={cx(styles.logo)} alt="logo" />
          </h1>
          {maxWordStackLength < 4 ? (
            <div className={cx(styles.wordsLeft, 'flex-column')}>
              <p>{maxWordStackLength} left</p>
              <p className="bold">HURRY!</p>
            </div>
          ) : (
            ''
          )}
          <Timer />
          <div className="flex-column">
            <p>{score}</p>
            <p className="bold">SCORE</p>
          </div>
          <div className="flex-column">
            <p>{currentLevel}</p>
            <p className="bold">LEVEL</p>
          </div>
        </div>

        <WordStack />
        <Keyboard />
      </main>
    </div>
  );
}

export default WordRaceApp;
