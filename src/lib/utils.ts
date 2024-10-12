import sanitizeHtml from "sanitize-html";
import { HonkData, Honk, AudioElement } from "./types";

const honkRegEx = /\?honk=([^&]+)/;

/**
 * Read the URL in search of a honk.
 * @private
 */
function extractUrlData(): HonkData | null {
  try {
    const match = document.location.search.match(honkRegEx);

    if (match) {
      return JSON.parse(atob(match[1]));
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
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

  const binary = btoa(JSON.stringify(data));
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
export function playHonk(audio: AudioElement, enabled: boolean = true) {
  if (audio && audio.element && enabled) audio.element.play();
}

export const soundLibrary = {
  Airhorn: "airhorn.mp3",
  "Bing Bing": "TRUMP_BING_BING_2.mpga",
  Boom: "boom.mp3",
  Bruh: "bruh.mp3",
  Buzzer: "buzzer.mp3",
  Cheering: "cheering.mp3",
  "Derka Derka Derka": "Derka_Derka_Derka.mpga",
  "Fart Music": "fart_music.mp3",
  "GrubHub (REALLY LOUD)": "grubhub_LOUD.mp3",
  Gonk: "almix_net_tiktoktts_en_us_001.mp3",
  "Gonking Honk": "almix_net_tiktoktts_en_us_002(2).mp3",
  "JUST DO IT": "JUST_DO_IT.mpga",
  Obamna: "TRUMP_OBAMNA.mpga",
  "Skibidi Toilet": "Skibidi_Toilet.mpga",
  "Super Secret": "rickroll.mp3",
  "Taco Bell Dong": "taco_bell.mp3",
  "This Is Sparta": "sparta.mp3",
  "Trump's Gonna Come": "TRUMP_COME.mpga",
  "We Do Not Care": "we_do_not_care.mp3",
  "Windows Error": "windows.mp3",
  Yeet: "yeet.mp3",
};
