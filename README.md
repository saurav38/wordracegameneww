## ⚔️ Word Race 
A fun, React-Redux game to gauge how fast you type, developed by someone who potentially has stubby fingers 🖖🏻

## 👁️ Preview
Check it out here - [Word Race](https://apps.srijansrivastava.tech/WordRace/)

## ⏲️ About the Application

Word Race is a game designed to improve QWERTY typing rate and efficiency. Words appear one by one at a rate that goes up as time progresses. There's a limited "stack space" that fills up after a certain amount of words have appeared. Once a player types a word correctly, that word is removed from the stack.

The score is calculated based on how fast the player was able to clear that word, and a multiplier. The multiplier increases with every word the player types correctly and resets on any mistype. A leveling system varies the word appearing rate, the stack space and leveling up bonus score, else the rate can go up constantly, flattening out at say one word per two seconds.

If the stack is full, it's game over. 

## 🛠 Implemention Details

### Component Heirarchy

<details>
<summary>Keyboard</summary>
<p>
<br>
  1. Keyboard based on JSX, styled using CSSModules
  2. Iterates through an array to render out keys, row-wise, and sets up event listeners for them
  3. Accepts SPACEBAR to start, and then dipatches keyPressed and keyCounts if keydown and keyup events are triggered
  4. Selects characterRequested and length. If keyPressed === characterRequested, and keyCount === wordLength, then the word typed is correct!
  5. Dispatches isCorrect, which is the corresponding action to WordRaceApp
  6. If incorrect, dispatches action to decrement score
  7. Uses sound effects for different actions
</p>
</details>

<details>
<summary>WordStack</summary>
<p>
<br>
  1. Word Stack based on JSX, styled using CSSModules
  2. Iterates through an array to render out words, fetched from an API, and dispatches the app being idle
  3. Styles the letters in the current word according to whether they are meant to be pressed or not
  4. Keeps count of the current length of the word stack. If word stack exceeds the permisible limit, it dispatches an action to end the game
</p>
</details>

<details>
<summary>Timer</summary>
<p>
<br>
  1. Timer based on JSX, styled using CSSModules, internally uses the useTimer hook for keeping track of the elapsed time
  2. Accepts the shouldStart and shouldStop selectors to internally trigger the timer
  3. Accepts interval to decide what the time between words appearing on screen should be
</p>
</details>

<details>
<summary>WordRaceApp</summary>
<p>
<br>
  1. Root App.jsx which is the heart of the application
  2. Handles the OVER status and resets the score, timer and word index, as well as the character to be requested
  3. Handles the use case when the word typed is correct - handles setting the next word, resetting key pres count and character index, and the socre to increment
  4. The score is calculated on the basis of a base score, decremented by word stack length, multiplied by the the number of words typed added with the current level
  5. Handles score incremention and level progression - right now, the maximum level to reach is 3
  6. Triggers sound effects for warning the user that the stack is almost full, and also that the game is over
</p>
</details>


### 🐎 Starting the Project

Install the dependencies with `npm i` or `yarn`  
Start the project by `npm start` or `yarn start`

### 🕸️ Deployment

You can deploy easily by using [GHPages](https://www.npmjs.com/package/gh-pages) 🎉


## ⚙ Tech Stack

- React
- Redux
- CSSModules
- TypeScript
- ESLint and Prettier
- 3rd Party Libraries - Classnames, UseSound, UseConstant and UseTimer
