import sanitizeHtml from "sanitize-html";
import { HonkData, Honk, AudioElement } from "./types";

const honkRegEx = /\?honk=([^&]+)/

/**
 * Read the URL in search of a honk.
 * @private
 */
function extractUrlData(): HonkData | null {
  const match = document.location.search.match(honkRegEx);

  if (match) {
    return JSON.parse(atob(match[1]));
  }

  return null;
}

/**
 * Create the share URL for sending your honk.
 * @param honk - Honk object to be shared.
 */
export function shareUrl(honk: Honk): string {
  const data = {
    sound: honk.sound,
    message: sanitizeHtml(honk.message),
  };

  const binary = btoa(JSON.stringify(data))
  const query = `?honk=${binary}`;

  // Replaces any current query params with the honk's.
  return document.location.href.replace(/\?.+$/, "") + query;
}

/** Reads the current URL for a honk and returns it if found. */
export function getHonk(): HonkData | null {
  const honk = extractUrlData();
  return honk ? honk : null;
}

/**
 * Plays a honk back to you.
 * @param audio Scoped audio element interface.
 */
export function playHonk(audio: AudioElement) {
  audio.element?.play();
}

export const soundLibrary = {
  "Airhorn": "airhorn.mp3",
  "Boom": "boom.mp3",
  "Bruh": "bruh.mp3",
  "Buzzer": "buzzer.mp3",
  "Cheering": "cheering.mp3",
  "Fart Music": "fart_music.mp3",
  "GrubHub (REALLY LOUD)": "grubhub_LOUD.mp3",
  "Super Secret": "rickroll.mp3",
  "This Is Sparta": "sparta.mp3",
  "Taco Bell Dong": "taco_bell.mp3",
  "We Do Not Care": "we_do_not_care.mp3",
  "Windows Error": "windows.mp3",
  "Yeet": "yeet.mp3",
};
