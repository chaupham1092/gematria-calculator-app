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

/**
 * Share entire research collection
 */
export const shareResearchCollection = (entries) => {
  // Encode multiple entries
  const data = {
    type: 'collection',
    entries: entries.map(entry => ({
      text: entry.text,
      ciphers: Object.keys(entry.selectedCiphers).filter(key => entry.selectedCiphers[key]),
      note: entry.note,
      tags: entry.tags
    }))
  };
  
  const jsonString = JSON.stringify(data);
  const base64 = btoa(unescape(encodeURIComponent(jsonString)));
  const urlSafe = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  
  return urlSafe;
};

/**
 * Decode shared research collection
 */
export const decodeSharedCollection = (encoded) => {
  try {
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const jsonString = decodeURIComponent(escape(atob(base64)));
    const data = JSON.parse(jsonString);
    
    if (data.type === 'collection' && Array.isArray(data.entries)) {
      return data.entries;
    }
    
    return null;
  } catch (error) {
    console.error('Error decoding collection:', error);
    return null;
  }
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
