// Utility functions for sharing calculations

/**
 * Encode calculation data to base64 URL-safe string
 */
export const encodeCalculation = (text, selectedCiphers) => {
  const data = {
    text: text,
    ciphers: Object.keys(selectedCiphers).filter(key => selectedCiphers[key])
  };
  
  const jsonString = JSON.stringify(data);
  const base64 = btoa(unescape(encodeURIComponent(jsonString)));
  // Make URL-safe
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

/**
 * Decode calculation data from base64 URL-safe string
 */
export const decodeCalculation = (encoded) => {
  try {
    // Restore base64 format
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const jsonString = decodeURIComponent(escape(atob(base64)));
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
 * Shorten URL using is.gd API
 * Returns the original URL if shortening fails
 */
export const shortenUrl = async (longUrl) => {
  try {
    const response = await fetch(`https://is.gd/create.php?format=json&url=${encodeURIComponent(longUrl)}`);
    const data = await response.json();
    
    if (data.shorturl) {
      return data.shorturl;
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
