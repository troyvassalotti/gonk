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
    message: honk.message,
  };
  const query = btoa(JSON.stringify(data));
  return document.location.href.replace(/\?.+$/, "") + `?honk=${query}`;
}

export function retrieveHonk() {
  const fromUrl = _extractUrlData();
  const availableHonk = fromUrl ? fromUrl : null;
  return availableHonk;
}
