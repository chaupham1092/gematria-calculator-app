import React from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Helmet } from 'react-helmet-async';

export default function AboutPage() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <>
      <Helmet>
        <title>About Gematria - History, Ciphers & Modern Applications | Gematria Calculator</title>
        <meta name="description" content="Learn about gematria, its historical origins in Hebrew mysticism and Kabbalah, major cipher systems, and modern applications. Explore the ancient art of numerology." />
        <meta name="keywords" content="about gematria, hebrew mysticism, kabbalah, gematria history, cipher systems, numerology, isopsephy" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gematriacalculator.xyz/about" />
        <meta property="og:title" content="About Gematria - History, Ciphers & Modern Applications" />
        <meta property="og:description" content="Learn about gematria, its historical origins in Hebrew mysticism and Kabbalah, major cipher systems, and modern applications." />
        <meta property="og:image" content="https://gematriacalculator.xyz/images/gematria-og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://gematriacalculator.xyz/about" />
        <meta property="twitter:title" content="About Gematria - History, Ciphers & Modern Applications" />
        <meta property="twitter:description" content="Learn about gematria, its historical origins in Hebrew mysticism and Kabbalah, major cipher systems, and modern applications." />
        <meta property="twitter:image" content="https://gematriacalculator.xyz/images/gematria-og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://gematriacalculator.xyz/about" />
      </Helmet>

      <ScrollView style={[styles.container, isMobile && styles.containerMobile]}>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 40,
  },
  containerMobile: {
    padding: 20,
  },
  title: {
    fontSize: 28,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 25,
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
    fontSize: 15,
    lineHeight: 25,
    color: '#333',
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 15,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
    paddingLeft: 10,
  },
});
