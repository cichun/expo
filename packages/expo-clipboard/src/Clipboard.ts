import { EventEmitter, Subscription, UnavailabilityError, Platform } from 'expo-modules-core';

import {
  ClipboardImage,
  ContentType,
  GetImageOptions,
  GetStringOptions,
  SetStringOptions,
} from './Clipboard.types';
import ExpoClipboard from './ExpoClipboard';

const emitter = new EventEmitter(ExpoClipboard);

const onClipboardEventName = 'onClipboardChanged';

type ClipboardEvent = {
  /**
   * @deprecated Returns empty string. Use [`getStringAsync()`](#getstringasyncoptions) instead to retrieve clipboard content.
   */
  content: string;
  /**
   * An array of content types that are available on the clipboard.
   */
  contentTypes: ContentType[];
};

export { Subscription, ClipboardEvent };

/**
 * Gets the content of the user's clipboard. Please note that calling this method on web will prompt
 * the user to grant your app permission to "see text and images copied to the clipboard."
 *
 * @param options Options for the clipboard content to be retrieved.
 * @returns A promise that resolves to the content of the clipboard.
 */
export async function getStringAsync(options: GetStringOptions = {}): Promise<string> {
  if (!ExpoClipboard.getStringAsync) {
    throw new UnavailabilityError('Clipboard', 'getStringAsync');
  }
  return await ExpoClipboard.getStringAsync(options);
}

/**
 * Sets the content of the user's clipboard.
 *
 * @param text The string to save to the clipboard.
 * @param options Options for the clipboard content to be set.
 * @returns On web, this returns a promise that fulfills to a boolean value indicating whether or not
 * the string was saved to the user's clipboard. On iOS and Android, the promise always resolves to `true`.
 */
export async function setStringAsync(
  text: string,
  options: SetStringOptions = {}
): Promise<boolean> {
  if (!ExpoClipboard.setStringAsync) {
    throw new UnavailabilityError('Clipboard', 'setStringAsync');
  }
  return ExpoClipboard.setStringAsync(text, options);
}

/**
 * Sets the content of the user's clipboard.
 * @deprecated Use [`setStringAsync()`](#setstringasynctext-options) instead.
 *
 * @returns On web, this returns a boolean value indicating whether or not the string was saved to
 * the user's clipboard. On iOS and Android, nothing is returned.
 */
export function setString(text: string): void {
  if (Platform.OS === 'web') {
    // on web, we need to return legacy method,
    // because of different return type
    return ExpoClipboard.setString(text);
  } else {
    setStringAsync(text);
  }
}

/**
 * Returns whether the clipboard has text content.
 *
 * On web, this requires the user to grant your app permission to _"see text and images copied to the clipboard"_.
 *
 * @returns A promise that fulfills to `true` if clipboard has plain text content, resolves to `false` otherwise.
 */
export function hasStringAsync(): Promise<boolean> {
  if (!ExpoClipboard.hasStringAsync) {
    throw new UnavailabilityError('Clipboard', 'hasStringAsync');
  }
  return ExpoClipboard.hasStringAsync();
}

/**
 * Gets the url from the user's clipboard.
 *
 * @returns A promise that fulfills to the url in the clipboard.
 * @platform iOS
 */
export async function getUrlAsync(): Promise<string | null> {
  if (!ExpoClipboard.getUrlAsync) {
    throw new UnavailabilityError('Clipboard', 'getUrlAsync');
  }
  return await ExpoClipboard.getUrlAsync();
}

/**
 * Sets a url in the user's clipboard.
 *
 * @param url The url to save to the clipboard.
 * @platform iOS
 */
export async function setUrlAsync(url: string): Promise<void> {
  if (!ExpoClipboard.setUrlAsync) {
    throw new UnavailabilityError('Clipboard', 'setUrlAsync');
  }
  return ExpoClipboard.setUrlAsync(url);
}

/**
 * Returns whether the clipboard has a URL content.
 *
 * @returns A promise that fulfills to `true` if clipboard has URL content, resolves to `false` otherwise.
 * @platform iOS
 */
export async function hasUrlAsync(): Promise<boolean> {
  if (!ExpoClipboard.hasUrlAsync) {
    throw new UnavailabilityError('Clipboard', 'hasUrlAsync');
  }
  return await ExpoClipboard.hasUrlAsync();
}

/**
 * Gets the image from the user's clipboard and returns it in the specified format. Please note that calling
 * this method on web will prompt the user to grant your app permission to "see text and images copied to the clipboard."
 *
 * @param options A `GetImageOptions` object to specify the desired format of the image.
 * @returns If there was an image in the clipboard, the promise resolves to
 * a [`ClipboardImage`](#clipboardimage) object containing the base64 string and metadata of the image.
 * Otherwise, it resolves to `null`.
 */
export async function getImageAsync(options: GetImageOptions): Promise<ClipboardImage | null> {
  if (!ExpoClipboard.getImageAsync) {
    throw new UnavailabilityError('Clipboard', 'getImageAsync');
  }
  return await ExpoClipboard.getImageAsync(options);
}

/**
 * Sets an image in the user's clipboard.
 *
 * @param base64Image Image encoded as a base64 string, without mime type.
 */
export async function setImageAsync(base64Image: string): Promise<void> {
  if (!ExpoClipboard.setImageAsync) {
    throw new UnavailabilityError('Clipboard', 'setImageAsync');
  }
  return ExpoClipboard.setImageAsync(base64Image);
}

/**
 * Returns whether the clipboard has a image content.
 *
 * On web, this requires the user to grant your app permission to _"see text and images copied to the clipboard"_.
 *
 * @returns A promise that fulfills to `true` if clipboard has image content, resolves to `false` otherwise.
 */
export async function hasImageAsync(): Promise<boolean> {
  if (!ExpoClipboard.hasImageAsync) {
    throw new UnavailabilityError('Clipboard', 'hasImageAsync');
  }
  return ExpoClipboard.hasImageAsync();
}

/**
 * Adds a listener that will fire whenever the content of the user's clipboard changes. This method
 * is a no-op on Web.
 *
 * @param listener Callback to execute when listener is triggered. The callback is provided a
 * single argument that is an object containing information about clipboard contents.
 *
 * @example
 * ```typescript
 * Clipboard.addClipboardListener(({ contentTypes }: ClipboardEvent) => {
 *   if (contentTypes.includes(Clipboard.ContentType.PLAIN_TEXT)) {
 *     Clipboard.getStringAsync().then(content => {
 *       alert('Copy pasta! Here\'s the string that was copied: ' + content)
 *     });
 *   } else if (contentTypes.includes(Clipboard.ContentType.IMAGE)) {
 *     alert('Yay! Clipboard contains an image');
 *   }
 * });
 * ```
 */
export function addClipboardListener(listener: (event: ClipboardEvent) => void): Subscription {
  // TODO: Get rid of this wrapper once we remove deprecated `content` property (not before SDK47)
  const listenerWrapper = (event: ClipboardEvent) => {
    const wrappedEvent: ClipboardEvent = {
      ...event,
      get content(): string {
        console.warn(
          "The 'content' property of the clipboard event is deprecated. Use 'getStringAsync()' instead to get clipboard content"
        );
        return '';
      },
    };
    listener(wrappedEvent);
  };
  return emitter.addListener<ClipboardEvent>(onClipboardEventName, listenerWrapper);
}

/**
 * Removes the listener added by addClipboardListener. This method is a no-op on Web.
 *
 * @param subscription The subscription to remove (created by addClipboardListener).
 *
 * @example
 * ```typescript
 * const subscription = addClipboardListener(() => {
 *   alert('Copy pasta!');
 * });
 * removeClipboardListener(subscription);
 * ```
 */
export function removeClipboardListener(subscription: Subscription) {
  emitter.removeSubscription(subscription);
}

export * from './Clipboard.types';
