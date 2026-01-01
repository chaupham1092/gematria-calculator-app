const base64Encode = (str) => {
  try {
    if (typeof btoa === 'function') return btoa(str);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    for (let block, charCode, idx = 0, map = chars; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
      charCode = str.charCodeAt(idx += 3 / 4);
      if (charCode > 0xFF) throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      block = block << 8 | charCode;
    }
    return output;
  } catch (e) {
    console.error('Base64 encode error:', e);
    return null;
  }
};

const base64Decode = (str) => {
  try {
    if (typeof atob === 'function') return atob(str);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    str = String(str).replace(/=+$/, '');
    if (str.length % 4 === 1) throw new Error('Invalid base64');
    for (let bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
      buffer = chars.indexOf(buffer);
    }
    return output;
  } catch (e) {
    console.error('Base64 decode error:', e);
    return null;
  }
};

/**
 * Encode calculation data to base64 URL-safe string
 */
export const encodeCalculation = (text, selectedCiphers) => {
  const data = {
    text: text,
    ciphers: Object.keys(selectedCiphers).filter(key => selectedCiphers[key])
  };

  const jsonString = JSON.stringify(data);
  const encoded = base64Encode(unescape(encodeURIComponent(jsonString)));
  if (!encoded) return '';
  // Make URL-safe
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

/**
 * Decode calculation data from base64 URL-safe string
 */
export const decodeCalculation = (encoded) => {
  try {
    if (!encoded) return null;
    // Restore base64 format
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }

    const decoded = base64Decode(base64);
    if (!decoded) return null;

    const jsonString = decodeURIComponent(escape(decoded));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding calculation:', error);
    return null;
  }
};

/**
 * Generate shareable URL for a calculation
 */
export const generateShareUrl = (text, selectedCiphers, baseUrl = 'https://gematriacalculator.xyz') => {
  const encoded = encodeCalculation(text, selectedCiphers);
  return `${baseUrl}?calc=${encoded}`;
};

/**
 * Generate deep link that opens in app if installed, otherwise web
 * iOS Universal Links format
 */
export const generateDeepLink = (text, selectedCiphers) => {
  const encoded = encodeCalculation(text, selectedCiphers);
  // Universal link that works for both app and web
  return `https://gematriacalculator.xyz?calc=${encoded}`;
};

/**
 * Shorten URL using Netlify function (production) or is.gd API (fallback)
 * Returns the original URL if shortening fails
 */
export const shortenUrl = async (longUrl) => {
  try {
    // Try Netlify function first (avoids rate limiting)
    const domain = 'https://gematriacalculator.xyz';
    const response = await fetch(`${domain}/.netlify/functions/shorten-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: longUrl }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.shortUrl) {
        return data.shortUrl;
      }
    }

    // Fallback to direct is.gd API call
    const fallbackResponse = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
    const fallbackData = await fallbackResponse.json();

    if (fallbackData.shorturl) {
      return fallbackData.shorturl;
    }

    return longUrl;
  } catch (error) {
    console.error('Error shortening URL:', error);
    return longUrl;
  }
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
};

/**
 * Share using native share API if available
 */
export const nativeShare = async (title, text, url) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
      return true;
    } catch (error) {
      // User cancelled or error occurred
      console.error('Error sharing:', error);
      return false;
    }
  }
  return false;
};
