import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function AboutPage() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>About Gematria</Text>
      
      <View style={styles.content}>
        <Text style={styles.heading}>What is Gematria?</Text>
        <Text style={styles.paragraph}>
          Gematria is a numerological system that assigns numerical values to letters, words, and phrases. 
          While it has roots in various ancient cultures, it is most commonly associated with Hebrew mysticism 
          and Kabbalah. The word "gematria" itself comes from the Greek word "geometria" (geometry), 
          highlighting its connection to mathematical principles.
        </Text>
        
        <Text style={styles.paragraph}>
          At its core, gematria is based on the belief that there is a meaningful relationship between numbers 
          and words. By converting letters to numbers and analyzing these numerical values, practitioners believe 
          they can uncover hidden meanings, connections, and insights within texts that might not be apparent on 
          the surface.
        </Text>

        <Text style={styles.heading}>Historical Origins</Text>
        <Text style={styles.paragraph}>
          The practice of assigning numerical values to letters dates back thousands of years and appears in 
          multiple cultures:
        </Text>
        <Text style={styles.bulletPoint}>• Hebrew Tradition: Gematria became a significant part of Jewish mysticism</Text>
        <Text style={styles.bulletPoint}>• Greek Influence: The Greeks had a similar system called isopsephy</Text>
        <Text style={styles.bulletPoint}>• Other Cultures: Similar systems existed in Babylonian, Egyptian, and Islamic traditions</Text>

        <Text style={styles.heading}>Major Gematria Ciphers</Text>
        <Text style={styles.subheading}>Hebrew Ciphers</Text>
        <Text style={styles.bulletPoint}>• Mispar Hechrachi (Absolute Value): The standard value of each Hebrew letter</Text>
        <Text style={styles.bulletPoint}>• Mispar Katan (Small Number): Reduces all values to single digits</Text>
        <Text style={styles.bulletPoint}>• Mispar Siduri (Ordinal Value): Based on position in the alphabet</Text>

        <Text style={styles.subheading}>English Ciphers</Text>
        <Text style={styles.bulletPoint}>• English Ordinal: A=1, B=2, C=3, etc.</Text>
        <Text style={styles.bulletPoint}>• Full Reduction: Reduces all letters to values 1-9</Text>
        <Text style={styles.bulletPoint}>• Reverse Ordinal: Z=1, Y=2, X=3, etc.</Text>

        <Text style={styles.heading}>Modern Relevance</Text>
        <Text style={styles.paragraph}>
          Today, gematria continues to be studied and practiced by religious scholars, numerologists, and those 
          interested in the mystical properties of numbers. Our Gematria Calculator allows you to explore these 
          ancient traditions with modern technology, calculating values across multiple cipher systems instantly.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 30,
    textAlign: 'center',
  },
  content: {
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 30,
    marginBottom: 15,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 28,
    color: '#333',
    marginBottom: 15,
    textAlign: 'justify',
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 28,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 20,
  },
});
