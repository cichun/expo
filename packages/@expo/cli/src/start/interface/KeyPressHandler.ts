import * as Log from '../../log';
import { logCmdError } from '../../utils/errors';

/** An abstract key stroke interceptor. */
export class KeyPressHandler {
  private isInterceptingKeyStrokes = false;
  private isHandlingKeyPress = false;

  constructor(public onPress: (key: string) => Promise<any>) {}

  /** Start observing interaction pause listeners. */
  createInteractionListener() {
    // Support observing prompts.
    let wasIntercepting = false;

    const listener = ({ pause }: { pause: boolean }) => {
      if (pause) {
        // Track if we were already intercepting key strokes before pausing, so we can
        // resume after pausing.
        wasIntercepting = this.isInterceptingKeyStrokes;
        this.stopInterceptingKeyStrokes();
      } else if (wasIntercepting) {
        // Only start if we were previously intercepting.
        this.startInterceptingKeyStrokes();
      }
    };

    return listener;
  }

  private handleKeypress = async (key: string) => {
    // Prevent sending another event until the previous event has finished.
    if (this.isHandlingKeyPress) {
      return;
    }
    this.isHandlingKeyPress = true;
    try {
      await this.onPress(key);
    } catch (error: any) {
      await logCmdError(error);
    } finally {
      this.isHandlingKeyPress = false;
    }
  };

  /** Start intercepting all key strokes and passing them to the input `onPress` method. */
  startInterceptingKeyStrokes() {
    if (this.isInterceptingKeyStrokes) {
      return;
    }
    this.isInterceptingKeyStrokes = true;
    const { stdin } = process;
    // TODO: This might be here because of an old Node version.
    if (!stdin.setRawMode) {
      Log.warn('Using a non-interactive terminal, keyboard commands are disabled.');
      return;
    }
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', this.handleKeypress);
  }

  /** Stop intercepting all key strokes. */
  stopInterceptingKeyStrokes() {
    if (!this.isInterceptingKeyStrokes) {
      return;
    }
    this.isInterceptingKeyStrokes = false;
    const { stdin } = process;
    stdin.removeListener('data', this.handleKeypress);
    // TODO: This might be here because of an old Node version.
    if (!stdin.setRawMode) {
      Log.warn('Using a non-interactive terminal, keyboard commands are disabled.');
      return;
    }
    stdin.setRawMode(false);
    stdin.resume();
  }
}
