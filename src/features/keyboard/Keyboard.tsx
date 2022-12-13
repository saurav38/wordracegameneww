import React, { MouseEvent, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import useConstant from 'use-constant';
import useSound from 'use-sound';
import { useAppSelector, useAppDispatch, getLetter } from '../../app/hooks';
import {
  setKeyCount,
  selectKeyCount,
  selectKeyPressed,
  setKey,
} from './state/keyboardSlice';
import styles from './Keyboard.module.scss';
import {
  selectCharIndex,
  selectCurrentWord,
  setCharacter,
} from '../wordStack/state/wordStackSlice';
import {
  decrementScore,
  recieveAppStatus,
  recieveCorrect,
  resetScore,
  selectStatus,
  setLevel,
} from '../../containers/WordRaceApp/state/wordRaceAppSlice';
import { setIntervalTimer, shouldStartTimer } from '../timer/state/timerSlice';
/** Initialize sound effects */
const correctSound = require('../../assets/sounds/correct.mp3');
const wrongSound = require('../../assets/sounds/wrong.mp3');
const startSound = require('../../assets/sounds/start.mp3');

function Keyboard() {
  /** Add some selector */
  const charIndex = useAppSelector(selectCharIndex);
  const keyCountValue = useAppSelector(selectKeyCount);
  const lasKeyPressed = useAppSelector(selectKeyPressed);
  const currentWord = useAppSelector(selectCurrentWord);
  const status = useAppSelector(selectStatus);

  const [isCorrect, setIsCorrect] = useState(true);

  const dispatch = useAppDispatch();

  /** Key list separated by rows */
  const keyList = useConstant(() => [
    {
      '0': 'Q',
      '1': 'W',
      '2': 'E',
      '3': 'R',
      '4': 'T',
      '5': 'Y',
      '6': 'U',
      '7': 'I',
      '8': 'O',
      '9': 'P',
    },
    {
      '0': 'A',
      '1': 'S',
      '2': 'D',
      '3': 'F',
      '4': 'G',
      '5': 'H',
      '6': 'J',
      '7': 'K',
      '8': 'L',
    },
    { '0': 'Z', '1': 'X', '2': 'C', '3': 'V', '4': 'B', '5': 'N', '6': 'M' },
  ]);

  const [playCorrect] = useSound(correctSound, {
    volume: 0.75,
  });
  const [playWrong] = useSound(wrongSound, {
    volume: 0.75,
  });
  const [playStart] = useSound(startSound, {
    volume: 0.75,
  });

  /** Disallow keys not in the array */
  const allowedKeys: string[] = useConstant(() =>
    keyList.flatMap((row) => Object.values(row)),
  );

  /** Get key from the data-char */
  const getKey = (code: string, kb: HTMLElement) =>
    kb.querySelector(`[data-char="${code}"]`) as HTMLElement;

  /** Event handler for keydown events */
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.stopPropagation();
      /** Return if status is idle, over */
      if (['IDLE', 'OVER'].includes(status)) {
        return;
      }
      const kb = event.target as HTMLElement;
      const code = event.key.toUpperCase();
      const key = getKey(code, kb);
      /** Return if its a disallowed key */
      if (!allowedKeys.includes(code)) {
        return;
      }
      key?.setAttribute('data-pressed', 'on');
    },
    [status],
  );
  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  /** Event handler for keyup events */
  const onKeyUp = useCallback(
    (event: KeyboardEvent) => {
      event.stopPropagation();
      const kb = event.target as HTMLElement;
      const code = event.key.toUpperCase();
      const key = getKey(code, kb);
      /** Recieve start game signal */
      if (code === ' ' && ['IDLE', 'OVER'].includes(status)) {
        dispatch(recieveAppStatus('STARTED'));
        dispatch(resetScore());
        dispatch(setLevel(1));
        dispatch(setIntervalTimer(10));
        setTimeout(() => {
          dispatch(shouldStartTimer(true));
          playStart();
        }, 1000);
        return;
      }
      /** If game is not started or disallowed keys are pressed, disallow input  */
      if (['IDLE', 'OVER'].includes(status) || !allowedKeys.includes(code)) {
        return;
      }
      /** Add styles to the button pressed */
      key?.setAttribute('data-pressed', 'off');
      setTimeout(() => key?.removeAttribute('data-pressed'), 200);
      /** Set key pressed, set cahracter and set key pressed count */
      dispatch(setKey(code));
      const characterRequested = getLetter(currentWord, charIndex);
      const isCharacterCorrect = code === characterRequested;
      setIsCorrect(isCharacterCorrect);

      /** If character is correct, proceed to the next one */
      if (isCharacterCorrect) {
        dispatch(setKeyCount(keyCountValue + 1));
        dispatch(setCharacter(keyCountValue + 1));
      } else {
        playWrong();
        dispatch(decrementScore(1));
      }
    },
    [charIndex, keyCountValue, status],
  );
  useEffect(() => {
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyUp]);

  /** If the word is correct, dispatch status to root and playCorrect */
  useEffect(() => {
    const isWordTyped = keyCountValue === currentWord.length;
    if (isWordTyped && charIndex !== -1) {
      dispatch(recieveCorrect(true));
      playCorrect();
    }
  }, [keyCountValue]);

  /** Add styling on the basis of what the requested letter is */
  const shouldHighlight = (key: string) => {
    if (key === lasKeyPressed) {
      if (isCorrect) {
        return styles.isGreen;
      }
      return styles.isRed;
    }
    return '';
  };
  const onMouseDown = (event: MouseEvent) => {
    const key = (event.target as HTMLElement).dataset.char;
    const keyDownEvent = new KeyboardEvent('keydown', { key });
    document.dispatchEvent(keyDownEvent);
  };
  const onMouseUp = (event: MouseEvent) => {
    const key = (event.target as HTMLElement).dataset.char;
    const keyUpEvent = new KeyboardEvent('keyup', { key });
    document.dispatchEvent(keyUpEvent);
  };
  const gameExplaination = useConstant(
    () => `Word Race is a game designed to improve QWERTY typing rate and efficiency. 
    Words appear one by one at a rate that goes up as time progresses. 
    There's a limited "stack space" that fills up after a certain amount of words have appeared. 
    Once a player types a word correctly, that word is removed from the stack.
    The score is calculated based on how fast the player was able to clear that word, and a multiplier. 
    The multiplier increases with every word the player types correctly and resets on any mistype.
    A leveling system varies the word appearing rate, the stack space and leveling up bonus score, else the rate can go up constantly, 
    flattening out at say one word per two seconds. 
    If the stack is full, it's game over.`,
  );

  return (
    <div className={cx('container')}>
      {status === 'IDLE' ? (
        <p className="frosted-glass small-font">{gameExplaination}</p>
      ) : (
        <div className={cx(styles.keyboard)}>
          {keyList.map((row, rowIndex) => (
            <div key={`row_${rowIndex.toFixed()}`} className={cx(styles.row)}>
              {Object.values(row).map((key) => (
                <div
                  key={key}
                  className={cx(styles.letter, shouldHighlight(key))}
                  data-char={key}
                  onMouseDown={onMouseDown}
                  onMouseUp={onMouseUp}
                  role="none"
                >
                  {key}
                </div>
              ))}
            </div>
          ))}
          <div className={cx(styles.row, styles.spaceRow)}>
            {' '}
            <div
              className={cx(styles.letter, styles.space)}
              data-key="32"
              data-char=" "
            >
              &nbsp;
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Keyboard;
