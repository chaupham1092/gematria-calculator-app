import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, layout } from '../utils/theme';
import LearnMoreItem from '../components/LearnMoreItem';
import PrivacyPolicyModal from '../components/PrivacyPolicyModal';

const AboutScreen = () => {
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create form data for Netlify (same as web version)
      const formBody = new URLSearchParams({
        'form-name': 'contact',
        ...formData
      }).toString();

      // Submit to Netlify Forms (same endpoint as web)
      const response = await fetch('https://gematriacalculator.xyz/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
      });

      if (response.ok) {
        Alert.alert(
          'Message Sent!', 
          'Thank you for your message! We\'ll get back to you soon.',
          [{ text: 'OK', onPress: () => {
            setFormData({ name: '', email: '', subject: '', message: '' });
          }}]
        );
      } else {
        Alert.alert('Error', 'Failed to send message. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>About Gematria</Text>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color={colors.primary}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>What is Gematria?</Text>
              </View>
              <Text style={styles.text}>
                Gematria is a system of assigning numerical values to letters and words.
                It has roots in various cultures including Hebrew, Greek, and Arabic, and has been
                used for mystical and religious interpretations of texts.
              </Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="help-circle-outline"
                  size={24}
                  color={colors.primary}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>How to Use this App</Text>
              </View>
              <Text style={styles.text}>
                1. Enter text in the calculator screen to see its gematria values.{'\n'}
                2. Select which ciphers you want to use in the ciphers screen.{'\n'}
                3. View detailed breakdowns by tapping on results.
              </Text>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="list-outline"
                  size={24}
                  color={colors.primary}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>About the Ciphers</Text>
              </View>

              <View style={styles.cipherInfo}>
                <Text style={styles.cipherName}>English Ordinal:</Text>
                <Text style={styles.cipherDescription}>The simplest cipher where A=1, B=2, etc.</Text>
              </View>

              <View style={styles.cipherInfo}>
                <Text style={styles.cipherName}>Full Reduction:</Text>
                <Text style={styles.cipherDescription}>Letters are reduced to single digits (1-9) in a repeating pattern.</Text>
              </View>

              <View style={styles.cipherInfo}>
                <Text style={styles.cipherName}>Reverse Ordinal:</Text>
                <Text style={styles.cipherDescription}>The alphabet is reversed, so Z=1, Y=2, etc.</Text>
              </View>

              <View style={styles.cipherInfo}>
                <Text style={styles.cipherName}>Jewish Gematria:</Text>
                <Text style={styles.cipherDescription}>Based on the Hebrew system with exponential values.</Text>
              </View>

              <View style={styles.cipherInfo}>
                <Text style={styles.cipherName}>Mathematical Ciphers:</Text>
                <Text style={styles.cipherDescription}>Include Primes, Trigonal, Squares, and Fibonacci sequences.</Text>
              </View>

              <View style={styles.cipherInfo}>
                <Text style={styles.cipherName}>Special Ciphers:</Text>
                <Text style={styles.cipherDescription}>Include Septenary, Chaldean, and Keypad systems.</Text>
              </View>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="mail-outline"
                  size={24}
                  color={colors.primary}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Contact Us</Text>
              </View>
              <Text style={styles.text}>
                Have questions, suggestions, or feedback? We'd love to hear from you!
              </Text>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Your Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(text) => setFormData({ ...formData, name: text })}
                  placeholder="Enter your name"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Email Address</Text>
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => setFormData({ ...formData, email: text })}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Subject</Text>
                <TextInput
                  style={styles.input}
                  value={formData.subject}
                  onChangeText={(text) => setFormData({ ...formData, subject: text })}
                  placeholder="Enter subject"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Your Message</Text>
                <TextInput
                  style={[styles.input, styles.textarea]}
                  value={formData.message}
                  onChangeText={(text) => setFormData({ ...formData, message: text })}
                  placeholder="Enter your message"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity
                style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                <Text style={styles.submitButtonText}>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="link-outline"
                  size={24}
                  color={colors.primary}
                  style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Learn More</Text>
              </View>

              <LearnMoreItem
                title="Wikipedia: Gematria"
                url="https://en.wikipedia.org/wiki/Gematria"
              />
              <LearnMoreItem
                title="Jewish Encyclopedia: Gematria"
                url="https://www.jewishencyclopedia.com/articles/6571-gematria"
              />
              <LearnMoreItem
                title="Encyclopedia Britannica: Gematria"
                url="https://www.britannica.com/topic/gematria"
              />
              <LearnMoreItem
                title="About this Calculator"
                url="https://gematriacalculator.xyz/pages/about"
              />
              <LearnMoreItem
                title="Gematria Blog"
                url="https://gematriacalculator.xyz/pages/blog"
              />
              <LearnMoreItem
                title="Privacy Policy"
                onPress={() => setPrivacyModalVisible(true)}
              />
              <LearnMoreItem
                title="Terms & Conditions"
                url="https://www.privacypolicies.com/live/37ea9a23-b763-496d-a552-702e87742679"
              />
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
      <PrivacyPolicyModal
        visible={privacyModalVisible}
        onClose={() => setPrivacyModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxlarge,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.medium,
    padding: spacing.md,
    marginBottom: spacing.lg,
    ...layout.shadow.small,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionIcon: {
    marginRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.large,
    fontWeight: 'bold',
    color: colors.text,
  },
  text: {
    fontSize: typography.fontSize.medium,
    color: colors.text,
    lineHeight: 22,
  },
  cipherInfo: {
    marginBottom: spacing.md,
  },
  cipherName: {
    fontSize: typography.fontSize.medium,
    fontWeight: 'bold',
    color: colors.text,
  },
  cipherDescription: {
    fontSize: typography.fontSize.medium,
    color: colors.lightText,
  },
  formGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.medium,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: layout.borderRadius.small,
    padding: spacing.md,
    fontSize: typography.fontSize.medium,
    backgroundColor: colors.white,
    color: colors.text,
  },
  textarea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: layout.borderRadius.small,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  submitButtonDisabled: {
    backgroundColor: colors.lightText,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.medium,
    fontWeight: '600',
  },
});

export default AboutScreen;
