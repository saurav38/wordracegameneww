export interface WordStackState {
  /** Whether API data being fetched */
  isLoading: boolean;
  /** API has an error */
  hasError: boolean | string | undefined;
  /** Words grabbed from the API endpoint */
  wordStackPayload: { text: string; hash: any }[];
  /** Length of the current word stack */
  wordStackLength: number;
  /** Maximum permissible length of the word stack */
  maxWordStackLength: number;
  /** Char index requested */
  charIndex: number;
  /** Current word requested */
  currentWord: string;
  /** Word index from wordStackPayload */
  wordIndex: number;
}

/** API Data recieved */
export interface WordResponse {
  [key: string]: string;
}
