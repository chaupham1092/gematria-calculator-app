// Research Collection Storage Utilities
// Manages saving, loading, and sharing research collections

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const STORAGE_KEY = 'gematria_research_collection';
const MAX_ENTRIES = 100; // Limit to prevent storage issues

// Platform-specific storage wrapper
const storage = {
  getItem: async (key) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    }
    return await AsyncStorage.getItem(key);
  },
  setItem: async (key, value) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },
  removeItem: async (key) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  }
};

/**
 * Research Entry Structure:
 * {
 *   id: string (timestamp-based)
 *   text: string
 *   timestamp: number
 *   note: string (optional user note)
 *   selectedCiphers: object
 *   results: array (cached results)
 *   tags: array (optional tags like "biblical", "names", etc)
 * }
 */

/**
 * Save a calculation to research collection
 */
export const saveToResearch = async (text, selectedCiphers, results, note = '', tags = []) => {
  const research = await getResearchCollection();

  // Check if we've hit the limit
  if (research.length >= MAX_ENTRIES) {
    throw new Error(`Research list is full! Maximum ${MAX_ENTRIES} entries allowed. Please delete some entries before adding more.`);
  }

  const entry = {
    id: Date.now().toString(),
    text: text.trim(),
    timestamp: Date.now(),
    note: note.trim(),
    selectedCiphers: selectedCiphers,
    results: results,
    tags: tags,
  };

  research.unshift(entry); // Add to beginning

  try {
    await storage.setItem(STORAGE_KEY, JSON.stringify(research));
  } catch (error) {
    // Handle storage quota exceeded
    if (error.name === 'QuotaExceededError') {
      throw new Error('Storage limit exceeded! Please delete some entries to free up space.');
    }
    throw error;
  }

  return entry;
};

/**
 * Get all research entries
 */
export const getResearchCollection = async () => {
  try {
    const stored = await storage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading research collection:', error);
    return [];
  }
};

/**
 * Delete a research entry
 */
export const deleteResearchEntry = async (id) => {
  const research = await getResearchCollection();
  const filtered = research.filter(entry => entry.id !== id);
  await storage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
};

/**
 * Update a research entry
 */
export const updateResearchEntry = async (id, updates) => {
  const research = await getResearchCollection();
  const index = research.findIndex(entry => entry.id === id);

  if (index !== -1) {
    research[index] = { ...research[index], ...updates };
    await storage.setItem(STORAGE_KEY, JSON.stringify(research));
    return research[index];
  }

  return null;
};

/**
 * Export research collection as JSON
 */
export const exportResearchCollection = async () => {
  const research = await getResearchCollection();
  const dataStr = JSON.stringify(research, null, 2);

  if (Platform.OS === 'web') {
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gematria-research-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  } else {
    // For mobile, return the data string for sharing
    return dataStr;
  }
};

/**
 * Import research collection from JSON
 */
export const importResearchCollection = async (jsonData) => {
  try {
    const imported = JSON.parse(jsonData);
    if (Array.isArray(imported)) {
      const existing = await getResearchCollection();
      const merged = [...imported, ...existing];
      await storage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    }
    return null;
  } catch (error) {
    console.error('Error importing research:', error);
    return null;
  }
};

// Custom Base64 encoder for environments where btoa is not available
const base64Encode = (str) => {
  try {
    if (typeof btoa === 'function') return btoa(str);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let output = '';
    for (let block, charCode, idx = 0, map = chars; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
      charCode = str.charCodeAt(idx += 3 / 4);
      if (charCode > 0xFF) throw new Error("'btoa' failed");
      block = block << 8 | charCode;
    }
    return output;
  } catch (e) {
    console.error('Base64 encode error:', e);
    return null;
  }
};

/**
 * Share entire research collection
 */
export const shareResearchCollection = (entries) => {
  // Encode multiple entries using abbreviated keys to save space
  const data = {
    y: 'c', // type: collection
    e: entries.map(entry => ({
      t: entry.text, // text
      c: Object.keys(entry.selectedCiphers).filter(key => entry.selectedCiphers[key]), // ciphers
      n: entry.note, // note
      g: entry.tags // tags
    }))
  };

  const jsonString = JSON.stringify(data);
  const encoded = base64Encode(unescape(encodeURIComponent(jsonString)));
  if (!encoded) return '';
  const urlSafe = encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');

  return urlSafe;
};

// Custom Base64 decoder for environments where atob is not available (like React Native)
const base64Decode = (str) => {
  try {
    if (typeof atob === 'function') return atob(str);

    // Simple polyfill for atob
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
 * Decode shared research collection
 */
export const decodeSharedCollection = (encoded) => {
  try {
    if (!encoded) return null;
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }

    const decoded = base64Decode(base64);
    if (!decoded) return null;

    const jsonString = decodeURIComponent(escape(decoded));
    const data = JSON.parse(jsonString);

    // Support both old (verbose) and new (abbreviated) formats
    if (data.type === 'collection' && Array.isArray(data.entries)) {
      return data.entries;
    }

    if (data.y === 'c' && Array.isArray(data.e)) {
      return data.e.map(item => ({
        text: item.t,
        ciphers: item.c,
        note: item.n,
        tags: item.g
      }));
    }

    return null;
  } catch (error) {
    console.error('Error decoding collection:', error);
    return null;
  }
};

/**
 * Import a shared collection into local storage efficiently
 */
export const importSharedCollection = async (entries) => {
  if (!entries || !Array.isArray(entries)) return 0;

  const research = await getResearchCollection();
  const existingMap = new Map();

  // Create a map for deduplication: text + sorted ciphers
  research.forEach(entry => {
    const cipherKey = Object.keys(entry.selectedCiphers).filter(k => entry.selectedCiphers[k]).sort().join('|');
    existingMap.set(`${entry.text}::${cipherKey}`, true);
  });

  const { calculateGematria } = require('./calculator');
  let importCount = 0;
  const newEntries = [];

  for (const item of entries) {
    const cipherSelection = {};
    if (item.ciphers && Array.isArray(item.ciphers)) {
      item.ciphers.forEach(k => cipherSelection[k] = true);
    }

    const cipherKey = Object.keys(cipherSelection).sort().join('|');
    const dedupKey = `${item.text}::${cipherKey}`;

    if (!existingMap.has(dedupKey)) {
      const results = calculateGematria(item.text, cipherSelection);
      const entry = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        text: item.text.trim(),
        timestamp: Date.now(),
        note: (item.note || '').trim(),
        selectedCiphers: cipherSelection,
        results: results,
        tags: item.tags || [],
      };
      newEntries.push(entry);
      existingMap.set(dedupKey, true);
      importCount++;
    }
  }

  if (newEntries.length > 0) {
    const updatedResearch = [...newEntries, ...research].slice(0, MAX_ENTRIES);
    await storage.setItem(STORAGE_KEY, JSON.stringify(updatedResearch));
  }

  return importCount;
};

/**
 * Get summary statistics for research collection
 */
export const getResearchStats = async () => {
  const research = await getResearchCollection();

  return {
    totalEntries: research.length,
    maxEntries: MAX_ENTRIES,
    percentFull: Math.round((research.length / MAX_ENTRIES) * 100),
    totalWords: research.reduce((sum, entry) => sum + entry.text.split(/\s+/).length, 0),
    uniqueCiphers: new Set(
      research.flatMap(entry => Object.keys(entry.selectedCiphers).filter(k => entry.selectedCiphers[k]))
    ).size,
    tags: [...new Set(research.flatMap(entry => entry.tags || []))],
  }
};
