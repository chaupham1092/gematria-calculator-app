import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, layout } from '../utils/theme';
import LearnMoreItem from '../components/LearnMoreItem';

const AboutScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>About Gematria</Text>
          
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="information-circle-outline" size={24} color={colors.primary} style={styles.sectionIcon} />
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
              <Ionicons name="help-circle-outline" size={24} color={colors.primary} style={styles.sectionIcon} />
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
              <Ionicons name="list-outline" size={24} color={colors.primary} style={styles.sectionIcon} />
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
              <Ionicons name="link-outline" size={24} color={colors.primary} style={styles.sectionIcon} />
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
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
});

export default AboutScreen;
