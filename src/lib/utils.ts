import sanitizeHtml from "sanitize-html";

/**
 * Read the URL in search of a honk
 * @returns {null|any}
 * @private
 */
function _extractUrlData() {
  const match = document.location.search.match(/\?honk=([^&]+)/);
  if (match) {
    return JSON.parse(atob(match[1]));
  }
  return null;
}

/**
 * Create the share URL for sending your honk
 * @param honk
 * @returns {string}
 */
export function shareUrl(honk) {
  const data = {
    sound: honk.sound,
    message: sanitizeHtml(honk.message),
  };
  const query = btoa(JSON.stringify(data));
  return document.location.href.replace(/\?.+$/, "") + `?honk=${query}`;
}

export function retrieveHonk() {
  const fromUrl = _extractUrlData();
  return fromUrl ? fromUrl : null;
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
