import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { generateShareUrl, shortenUrl, copyToClipboard, nativeShare } from '../../utils/shareUtils';

export default function ShareButton({ inputText, selectedCiphers }) {
  const [showModal, setShowModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isShortening, setIsShortening] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  const handleShare = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text to share');
      return;
    }

    // Generate share URL (use localhost for local testing, production domain when deployed)
    const baseUrl = window.location.origin;
    const url = generateShareUrl(inputText, selectedCiphers, baseUrl);
    setShareUrl(url);
    setShortUrl('');
    setCopyStatus('');
    setShowModal(true);

    // Try native share first
    const shared = await nativeShare(
      'Gematria Calculation',
      `Check out this gematria calculation: "${inputText}"`,
      url
    );

    // If native share worked, close modal
    if (shared) {
      setShowModal(false);
    }
  };

  const handleShortenUrl = async () => {
    setIsShortening(true);
    const shortened = await shortenUrl(shareUrl);
    setShortUrl(shortened);
    setIsShortening(false);
  };

  const handleCopy = async (url) => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    } else {
      setCopyStatus('Failed to copy');
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>📤 Share</Text>
      </TouchableOpacity>

      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Share Your Calculation</Text>
            
            <Text style={styles.label}>Share Link:</Text>
            <View style={styles.urlContainer}>
              <TextInput
                style={styles.urlInput}
                value={shareUrl}
                editable={false}
                multiline
              />
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => handleCopy(shareUrl)}
              >
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>

            {!shortUrl && (
              <TouchableOpacity
                style={[styles.shortenButton, isShortening && styles.shortenButtonDisabled]}
                onPress={handleShortenUrl}
                disabled={isShortening}
              >
                <Text style={styles.shortenButtonText}>
                  {isShortening ? 'Shortening...' : '🔗 Shorten URL'}
                </Text>
              </TouchableOpacity>
            )}

            {shortUrl && (
              <>
                <Text style={styles.label}>Short Link:</Text>
                <View style={styles.urlContainer}>
                  <TextInput
                    style={styles.urlInput}
                    value={shortUrl}
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={() => handleCopy(shortUrl)}
                  >
                    <Text style={styles.copyButtonText}>Copy</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {copyStatus && (
              <Text style={styles.copyStatus}>{copyStatus}</Text>
            )}

            <Text style={styles.infoText}>
              💡 This link will open in the Gematria Calculator app if installed, otherwise in the browser.
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: '#27ae60',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 25,
    width: '100%',
    maxWidth: 600,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  urlContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  urlInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    maxHeight: 80,
  },
  copyButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  copyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  shortenButton: {
    backgroundColor: '#9b59b6',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  shortenButtonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  shortenButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  copyStatus: {
    color: '#27ae60',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 15,
    marginBottom: 10,
    lineHeight: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#95a5a6',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
